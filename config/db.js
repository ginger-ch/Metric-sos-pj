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

