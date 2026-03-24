const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const allProductsController = require('../controller/allproducts-controller');
const contactController = require('../controller/contact-controller');

router.get('/', homeController.getHomePage);
router.get('/products', allProductsController.getAllProducts);
router.get('/contact', contactController.getContact);
router.post('/subscribe', contactController.subscribe);
router.get('/basket', (req, res) => {
  res.render('basket');
});

module.exports = router;



