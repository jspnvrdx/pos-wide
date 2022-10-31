const pg = require('pg')

const pool = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '0907',
  database: 'pos-wide'
})

export default pool