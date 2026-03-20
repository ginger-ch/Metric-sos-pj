const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const productController = require('../controller/product-controller');

router.get('/', homeController.getHomePage);
router.get('/products', productController.getAllProducts);

module.exports = router;