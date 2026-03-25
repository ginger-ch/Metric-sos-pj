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

    res.render('admin/order', {
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

exports.getCategories = async (req, res) => {
  try {
    const { filter = '', search = '' } = req.query;
    const categories = await adminModel.getAllCategories(filter, search);

    res.render('admin/categories', {
      currentPage: 'categories',
      admin: {
        name: req.session?.user?.full_name || 'Admin',
        profileImage: req.session?.user?.profile_image || '/image/default-avatar.png',
      },
      categories,
      selectedFilter: filter,  
      search,                  
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { category_name, visibility } = req.body;
    const slug = category_name.toLowerCase().replace(/\s+/g, '-');
    await adminModel.createCategory(category_name, slug, visibility);

    console.log("INSERT SUCCESS");

    res.redirect('/admin/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { visibility } = req.body;
    await adminModel.updateCategoryVisibility(id, visibility);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await adminModel.deleteCategory(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, visibility } = req.body;
    const slug = category_name.toLowerCase().replace(/\s+/g, '-');
    await adminModel.updateCategory(id, category_name, slug, visibility);
    res.redirect('/admin/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
 

exports.getSalesHistory = async (req, res) => {
  try {
    const now = new Date();
    
    const selectedDailyMonth = req.query.daily_month || (now.getMonth() + 1);
    const selectedDailyYear  = req.query.daily_year  || now.getFullYear();
    const selectedMonthlyYear = req.query.monthly_year || now.getFullYear();

    const topProducts = await adminModel.getTopProducts(5);
    const dailyRows = await adminModel.getDailySales(selectedDailyMonth, selectedDailyYear);
    const monthlyRows = await adminModel.getMonthlySales(selectedMonthlyYear);

    // Render page with ALL the data the navbar and page need
    res.render('admin/sales-history', {
      currentPage: 'sales-history', // Matches the check in your navbar.ejs
      admin: {
        name: req.session?.user?.full_name || 'Admin',
        profileImage: req.session?.user?.profile_image || '/image/default-avatar.png',
        role: 'Admin'
      },
      topProducts,
      dailyData: { dates: dailyRows },
      monthlyData: { months: monthlyRows },
      selectedDailyMonth,
      selectedDailyYear,
      selectedMonthlyYear,
      currentYear: now.getFullYear()
    });

  } catch (error) {
    console.error("Error fetching sales history:", error);
    res.status(500).send("Internal Server Error");
  }
};
 