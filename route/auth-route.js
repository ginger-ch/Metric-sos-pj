const express    = require('express');
const router     = express.Router();
const controller = require('../controller/auth-controller');
// const basketController = require('../controller/basket-controller');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);
<<<<<<< feature/login
// router.post('/basket/add', basketController.addToCart);
=======

router.post('/cart/add', cartController.addToCart);
>>>>>>> dev

router.post('/logout', controller.logout);

module.exports = router;
