const express         = require('express');
const router          = express.Router();
const adminController = require('../controller/admin-controller');

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
}

router.get('/dashboard', isAdmin, adminController.getDashboard);
router.get('/orders', isAdmin, adminController.getOrders);
router.get('/categories', isAdmin, adminController.getCategories);
router.get('/sales-history',  isAdmin, adminController.getSalesHistory);
router.patch('/orders/:id/status', isAdmin, adminController.updateOrderStatus);

router.get('/dashboard', adminController.getDashboard);
router.get('/orders', adminController.getOrders);
router.patch('/orders/:id/status', adminController.updateOrderStatus);
router.get('/categories', adminController.getCategories);

router.post('/categories', adminController.createCategory);
router.put('/categories/:id', adminController.updateCategory);
router.patch('/categories/:id/visibility', adminController.updateVisibility);
router.delete('/categories/:id', adminController.deleteCategory);

module.exports = router;