const adminModel = require('../model/admin-model');

exports.getDashboard = async (req, res) => {
  try {
    const categories = await adminModel.getCategories();

    categories.forEach(cat => {
      if (Array.isArray(cat.products)) {
        cat.products = cat.products.filter(p => p !== null);
      } else {
        cat.products = [];
      }
    });

    const totalCategory  = await adminModel.getTotalCategory();
    const totalProduct   = await adminModel.getTotalProduct();
    const totalMonth     = await adminModel.getTotalMonth();
    const totalWeek      = await adminModel.getTotalWeek();
    const itemSold       = await adminModel.getItemSold();
    const recentOrders   = await adminModel.getRecentOrders();
    const outOfStock     = await adminModel.getOutOfStock();

    const popularItems = itemSold.slice(0, 3).map((item, i) => ({
      rank: ['1st', '2nd', '3rd'][i],
      name: item.name,
      orders: item.qty,
    }));

    const notifications = outOfStock.map(p => ({
      type: 'stock',
      message: `${p.name} out of stock!`,
      body: 'Please restock this item.',
    }));

    res.render('admin/dashboard', {
      currentPage: 'dashboard',
      admin: {
        name: req.session?.user?.full_name || 'Admin',
        role: 'Admin',
        profileImage: req.session?.user?.profile_image || '/image/default-avatar.png',
      },
      notifications,
      earnings: {
        totalMonth: totalMonth >= 1000
          ? (totalMonth / 1000).toFixed(0) + 'K'
          : totalMonth,
        totalWeek,
      },
      itemSold,
      popularItems,
      recentOrders,
      categories,
      totalCategory,
      totalProduct,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { search = '', month = '', status = '', page = 1 } = req.query;
    const limit = 8;
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];

    if (search) {
      conditions.push(`(o.order_number LIKE ? OR p.product_name LIKE ?)`);
      params.push(`%${search}%`, `%${search}%`);
    }
    if (month) {
      conditions.push(`MONTH(o.order_date) = ?`);
      params.push(month);
    }
    if (status) {
      conditions.push(`o.status = ?`);
      params.push(status);
    }

    const orders = await adminModel.getOrders(conditions, params, limit, offset);
    const total  = await adminModel.getTotalOrders(conditions, params);

    res.render('admin/orders', {
      currentPage: 'orders',
      admin: {
        name: req.session?.user?.full_name || 'Admin',
        profileImage: req.session?.user?.profile_image || '/image/default-avatar.png',
      },
      orders,
      totalPages: Math.ceil(total / limit),
      currentPageNum: parseInt(page),
      selectedMonth: month,
      selectedStatus: status,
      search,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await adminModel.updateOrderStatus(id, status);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};