const express         = require('express');
const router          = express.Router();
const adminController = require('../controller/admin-controller');
const upload = require('../middleware/upload');

router.get('/dashboard', adminController.getDashboard);
router.get('/orders', adminController.getOrders);
router.get('/product', adminController.getProduct);
router.patch('/orders/:id/status', adminController.updateOrderStatus);
router.get('/categories', adminController.getCategories);
router.post('/categories', adminController.createCategory);
router.put('/categories/:id', adminController.updateCategory);
router.patch('/categories/:id/visibility', adminController.updateVisibility);
router.delete('/categories/:id', adminController.deleteCategory);
router.get('/products/:id/edit', adminController.editProductPage);
router.post('/products/:id/edit', upload.array('images'), adminController.updateProduct);
router.post('/products', upload.array('images'), adminController.addProduct);
router.delete('/products/:id', adminController.deleteProduct);



module.exports = router;