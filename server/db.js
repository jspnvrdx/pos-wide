const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '0907',
  database: 'pos-wide'
})

module.exports = pool