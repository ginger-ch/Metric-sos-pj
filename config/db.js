// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "db",
//   user: "root",
//   password: "password",
//   database: "girllette"
// });

// module.exports = db;

// ขอลองแบบ pool นะเตง
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host:     process.env.DB_HOST     || 'db',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME     || 'girllette',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;