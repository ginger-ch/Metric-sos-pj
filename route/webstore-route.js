const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const allProductsController = require('../controller/allproducts-controller');
const categoryController = require('../controller/category-controller');

router.get('/', homeController.getHomePage);
router.get('/products', allProductsController.getAllProducts);
router.get('/category/:slug', categoryController.getCategoryPage);
module.exports = router;



