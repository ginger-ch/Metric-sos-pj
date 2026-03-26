console.log("Webstore Route Loaded!"); 

const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');
const allProductsController = require('../controller/allproducts-controller');
const categoryController = require('../controller/category-controller');
const contactController = require('../controller/contact-controller');
const searchController = require('../controller/search-controller');
const productDetailController = require('../controller/product-detail-controller');
const cartController = require('../controller/cart-controller');
const userController = require('../controller/user-controller');

router.get('/', homeController.getHomePage);
// router.get('/cart', cartController.requireLogin, cartController.getCart);
router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.requireLogin, cartController.addToCart);
router.post('/cart/update', cartController.requireLogin, cartController.updateQuantity);
router.post('/cart/remove', cartController.requireLogin, cartController.removeItem);
router.post('/cart/checkout', cartController.requireLogin, cartController.checkout);
router.get('/cart/count', async (req, res) => {
  if (!req.session.user) return res.json({ count: 0 });
  const cartModel = require('../model/cart-model');
  const count = await cartModel.getCartCount(req.session.user.user_id);
  res.json({ count });
});
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