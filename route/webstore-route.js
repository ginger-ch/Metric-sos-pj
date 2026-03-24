const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const allProductsController = require('../controller/allproducts-controller');
const categoryController = require('../controller/category-controller');
const contactController = require('../controller/contact-controller');
const searchController = require('../controller/search-controller');

router.get('/', homeController.getHomePage);
router.get('/products', allProductsController.getAllProducts);
router.get('/category/:slug', categoryController.getCategoryPage);
router.get('/contact', contactController.getContact);
router.post('/subscribe', contactController.subscribe);
router.get('/search', searchController.getSearch);

module.exports = router;