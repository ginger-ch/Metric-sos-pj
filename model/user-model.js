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


//user-profile
exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
  return rows[0] || null;
};

// exports.updateUser = async (id, data) => {
//   await db.query(`
//     UPDATE users SET
//       full_name = ?, username = ?, phone = ?, country_code = ?,
//       email = ?, date_of_birth = ?, address = ?
//     WHERE user_id = ?
//   `, [data.full_name, data.username, data.phone, data.country_code,
//       data.email, data.date_of_birth || null, data.address, id]);
// };

exports.updateUser = async (id, data) => {
  await db.query(`
    UPDATE users SET
      full_name = ?, username = ?,
      phone = ?, email = ?,
      date_of_birth = ?, address = ?
    WHERE user_id = ?
  `, [
    data.full_name || null,
    data.username,
    data.phone || null,
    data.email,
    data.date_of_birth || null,
    data.address || null,
    id
  ]);
};

exports.updateAvatar = async (id, profile_image) => {
  await db.query(
    'UPDATE users SET profile_image = ? WHERE user_id = ?',
    [profile_image, id]
  );
};