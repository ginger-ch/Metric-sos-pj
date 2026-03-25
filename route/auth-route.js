const express    = require('express');
const router     = express.Router();
const controller = require('../controller/auth-controller');
const cartController = require('../controller/cart-controller');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);
router.post('/cart/add', cartController.addToCart);

module.exports = router;
