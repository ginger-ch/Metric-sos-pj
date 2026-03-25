const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const allProductsController = require('../controller/allproducts-controller');
const categoryController = require('../controller/category-controller');
const contactController = require('../controller/contact-controller');
const searchController = require('../controller/search-controller');
const productDetailController = require('../controller/product-detail-controller');
const userController = require('../controller/user-controller');


router.get('/', homeController.getHomePage);
router.get('/products', allProductsController.getAllProducts);
router.get('/category/:slug', categoryController.getCategoryPage);
router.get('/contact', contactController.getContact);
router.post('/subscribe', contactController.subscribe);
router.get('/search', searchController.getSearch);
router.get('/product/:id', productDetailController.getProduct);
router.get('/profile', userController.getProfile);
router.post('/profile/edit', userController.updateProfile);
router.post('/profile/avatar', userController.upload.single('avatar'), userController.updateAvatar);

module.exports = router;