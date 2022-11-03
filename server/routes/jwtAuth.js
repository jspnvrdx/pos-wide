const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const validinfo = require('../middleware/validinfo')

router.post('/register', validinfo, async (req, res) => {
  try {
    const { username, password, firstName, lastName, questionId } = req.body

    const user = await pool.query('SELECT * FROM owner_acc WHERE username = $1', [username])

    // check if user exist
    if (user.rows.length !== 0) {
      return res.status(401).send('User already exist!')
    }

    // encrypting user's password
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)

    const bcryptPassword = await bcrypt.hash(password, salt)

    // enter user info in database
    const newUser = await pool.query(
      'INSERT INTO owner_acc (username, password, first_name, last_name, question_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [username, bcryptPassword, firstName, lastName, questionId]
    )

    // res.json(newUser)

    // generate token
    const token = jwtGenerator(newUser.rows[0].username)

    res.json({ token })

  } catch (error) {
    console.error(error.message)
    res.status(500).json("Server Error")
  }
})

// * login route
router.post('/login', validinfo, async (req, res) => {
  try {
    // destructure req.body()
    const { username, password } = req.body

    const user = await pool.query('SELECT * FROM owner_acc WHERE username = $1', [username])

    if (user.rows.length === 0) {
      return res.status(401).json('Incorrect USERNAME and PASSWORD')
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password)

    console.log(validPassword);

    if (!validPassword) {
      return res.status(401).json('Incorrect USERNAME and PASSWORD')
    }

    const token = jwtGenerator(user.rows[0].username)

    res.json({ token })

  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error')
  }
})

// 

module.exports = router