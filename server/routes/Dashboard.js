const pool = require("../db");
const authorization = require("../middleware/authorization");
const router = require("express").Router();

router.get("/", authorization, async (req, res) => {
  try {
    // req username from payload
    // res.json(req.username)

    const user = await pool.query(
      "SELECT username FROM owner_acc WHERE username = $1",
      [req.username]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.send(401).json();
  }
});

module.exports = router;
