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

exports.getRegister = (req, res) => {
  res.render('auth/register', {
    errors: {},
    formData: {}
  });
};

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = {};

  if (!username) errors.username = 'Username is required';
  if (!email)    errors.email    = 'Email is required';
  if (!password) errors.password = 'Password is required';

  if (Object.keys(errors).length > 0) {
    return res.render('auth/register', { errors, formData: req.body });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, password_hash]
    );
    req.flash('success', 'Account created!');
    res.redirect('/login');
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) errors.username = 'Username already taken';
      if (err.message.includes('email'))    errors.email    = 'Email already in use';
    }
    res.render('auth/register', { errors, formData: req.body });
  }
};
