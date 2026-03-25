
const express    = require('express');
const router     = express.Router();
const controller = require('../controller/auth-controller');
const cartController = require('../controller/cart-controller');

router.get('/login', (req, res) => {
  res.render('auth/login', {
    error: req.flash('error')[0] || null,
    success: null,
    formData: {}
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    res.redirect('/');
  } else {
    req.flash('error', 'Incorrect username or password.');
    res.redirect('/login');
  }
});

router.post('/cart/add', cartController.addToCart);

router.post('/logout', controller.logout);

module.exports = router;
