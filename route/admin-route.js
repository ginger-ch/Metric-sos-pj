const express         = require('express');
const router          = express.Router();
const adminController = require('../controller/admin-controller');

router.get('/dashboard', adminController.getDashboard);

module.exports = router;