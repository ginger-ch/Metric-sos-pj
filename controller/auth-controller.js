const userModel = require('../model/user-model');

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
    const user = await userModel.findByUsername(username);

    if (!user) {
      req.flash('error', 'Incorrect username or password.');
      return res.redirect('/login');
    }

    const match = password === user.password_hash;
    if (!match) {
      req.flash('error', 'Incorrect username or password.');
      return res.redirect('/login');
    }

    req.session.user = user;

    if (user.role === 'admin') {
      return res.redirect('/admin');
    }
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
  const { username, email, password, full_name } = req.body;
  const errors = {};

  if (!username) errors.username = 'Username is required';
  if (!email)    errors.email    = 'Email is required';
  if (!password) errors.password = 'Password is required';

  if (Object.keys(errors).length > 0) {
    return res.render('auth/register', { errors, formData: req.body });
  }

  try {
    const password_hash = password;
    await userModel.createUser(username, email, password_hash, full_name);

    req.flash('success', 'Account created!');
    res.redirect('/login');
  } catch (err) {
    console.error(err); 
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) errors.username = 'Username already taken';
      if (err.message.includes('email'))    errors.email    = 'Email already in use';
    } else {
      errors.general = 'Something went wrong. Please try again.';
    }
    res.render('auth/register', { errors, formData: req.body });
  }
};