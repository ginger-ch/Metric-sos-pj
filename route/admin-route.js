const express         = require('express');
const router          = express.Router();
const adminController = require('../controller/admin-controller');

router.get('/dashboard', adminController.getDashboard);
router.get('/orders', adminController.getOrders);
router.patch('/orders/:id/status', adminController.updateOrderStatus);

module.exports = router;