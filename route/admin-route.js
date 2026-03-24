const express         = require('express');
const router          = express.Router();
const adminController = require('../controller/admin-controller');

router.get('/dashboard', adminController.getDashboard);
router.get('/orders', adminController.getOrders);
router.patch('/orders/:id/status', adminController.updateOrderStatus);
router.get('/categories', adminController.getCategories);
// router.post('/categories', adminController.createCategory);
// router.put('/categories/:id', adminController.updateCategory);
// router.patch('/categories/:id/visibility', adminController.updateVisibility);
// router.delete('/categories/:id', adminController.deleteCategory);

module.exports = router;