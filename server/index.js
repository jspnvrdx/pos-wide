const express = require('express')
const app = express()

// import Pool from './db'

app.get('/', (req, res) => {
  
})

app.get('/data', (req, res) => {
  const data = {
    firstname: 'John',
    lastname: 'Doe'
  }
  res.json(data)
})

app.get('/secret', (req, res) =>{
  res.status(403).end()
})

app.get('*', (req, res) => {
  res.status(404).send('Sorry We cann\'t find the specified page :(')
})


const PORT = 8000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
})