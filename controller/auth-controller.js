const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    error: req.flash('error')[0] || null,
    success: null,
    formData: {}
  });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ?', [username]
    );

    if (rows.length === 0) {
      req.flash('error', 'Incorrect username or password.');
      return res.redirect('/login');
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      req.flash('error', 'Incorrect username or password.');
      return res.redirect('/login');
    }

    req.session.user = user;
    res.redirect('/');

  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong.');
    res.redirect('/login');
  }
};