
import mysql from 'mysql'

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '19990221li',
  database: 'management_system_db'
})

export default db