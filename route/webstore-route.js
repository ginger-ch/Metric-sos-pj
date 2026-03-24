const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const allProductsController = require('../controller/allproducts-controller');
const contactController = require('../controller/contact-controller');
const productDetailController = require('../controller/product-detail-controller');


router.get('/', homeController.getHomePage);
router.get('/products', allProductsController.getAllProducts);
router.get('/contact', contactController.getContact);
router.post('/subscribe', contactController.subscribe);
router.get('/product/:id', productDetailController)

module.exports = router;



