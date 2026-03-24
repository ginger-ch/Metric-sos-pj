const db = require('../config/db');

exports.findByUsername = async (username) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?', [username]
  );
  return rows[0] || null;
};

exports.createUser = async (username, email, password_hash, full_name) => {
  await db.query(
    'INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
    [username, email, password_hash, full_name || '']
  );
};