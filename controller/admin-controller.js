const db = require('../config/db');

exports.getDashboard = async (req, res) => {
  try {

    // Categories
    const [categories] = await db.query(`
      SELECT c.category_id, c.category_name AS name,
             JSON_ARRAYAGG(p.product_name) AS products
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.category_id
      WHERE c.visibility = 'show'
      GROUP BY c.category_id
    `);

    console.log('RAW categories:', JSON.stringify(categories[0]));

    // parse products JSON string
    categories.forEach(cat => {
      if (Array.isArray(cat.products)) {
        cat.products = cat.products.filter(p => p !== null);
      } else {
        cat.products = [];
      }
    });

    // Total counts
    const [[{ totalCategory }]] = await db.query(
      'SELECT COUNT(*) AS totalCategory FROM categories WHERE visibility = "show"'
    );
    const [[{ totalProduct }]] = await db.query(
      'SELECT COUNT(*) AS totalProduct FROM products'
    );

    // Earnings (month)
    const [[{ totalMonth }]] = await db.query(`
      SELECT COALESCE(SUM(total_amount), 0) AS totalMonth
      FROM orders
      WHERE status = 'completed'
        AND MONTH(order_date) = MONTH(CURDATE())
        AND YEAR(order_date)  = YEAR(CURDATE())
    `);

    // Earnings (week)
    const [[{ totalWeek }]] = await db.query(`
      SELECT COALESCE(SUM(total_amount), 0) AS totalWeek
      FROM orders
      WHERE status = 'completed'
        AND order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    `);

    // Item sold
    const [itemSold] = await db.query(`
      SELECT p.product_name AS name, SUM(oi.quantity) AS qty
      FROM order_items oi
      JOIN products p ON p.product_id = oi.product_id
      GROUP BY oi.product_id
      ORDER BY qty DESC
      LIMIT 8
    `);

    // Popular items (top 3)
    const popularItems = itemSold.slice(0, 3).map((item, i) => ({
      rank: ['1st', '2nd', '3rd'][i],
      name: item.name,
      orders: item.qty,
    }));

    // Recent orders
    const [recentOrders] = await db.query(`
      SELECT o.order_number AS number,
             DATE_FORMAT(o.order_date, '%d-%m-%y') AS date,
             u.username AS customer
      FROM orders o
      LEFT JOIN users u ON u.user_id = o.user_id
      ORDER BY o.order_date DESC
      LIMIT 5
    `);

    // Notifications (out of stock)
    const [outOfStock] = await db.query(`
      SELECT p.product_name AS name
      FROM product_attributes pa
      JOIN products p ON p.product_id = pa.product_id
      GROUP BY p.product_id
      HAVING SUM(pa.stock_qty) = 0
      LIMIT 5
    `);

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
    res.render('admin/orders', {
      currentPage: 'orders',
      admin: {
        name: req.session?.user?.full_name || 'Admin',
        profileImage: req.session?.user?.profile_image || '/image/default-avatar.png',
      },
      orders: [],
      totalPages: 1,
      currentPageNum: 1,
      selectedMonth: '',
      selectedStatus: '',
      search: '',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};