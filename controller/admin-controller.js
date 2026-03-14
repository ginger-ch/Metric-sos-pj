const User    = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order   = require('../models/Order');

exports.getDashboard = async (req, res) => {
  try {
    res.render('admin/dashboard', {
      currentPage: 'dashboard',
      admin: req.session.user, 
      notifications: [],
      earnings: { totalMonth: '0K', totalWeek: 0 },
      itemSold: [],
      popularItems: [],
      recentOrders: [],
      categories: [],
      totalCategory: 0,
      totalProduct: 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};