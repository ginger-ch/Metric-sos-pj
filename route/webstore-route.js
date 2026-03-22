const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const allProductsController = require('../controller/allproducts-controller');

router.get('/', homeController.getHomePage);
router.get('/products', allProductsController.getAllProducts);
module.exports = router;



