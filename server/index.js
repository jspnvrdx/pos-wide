const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 8000
// * middleware
app.use(express.json())
app.use(cors())


// Register and login routes
app.use('/auth', require('./routes/jwtAuth'))

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})