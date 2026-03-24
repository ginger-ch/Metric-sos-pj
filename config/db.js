const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "girllette"
});

module.exports = db;