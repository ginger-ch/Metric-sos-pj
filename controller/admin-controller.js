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

exports.getProduct = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    const categories = await adminModel.getAllCategories(); 
  
    const products = await adminModel.getAllProducts(category, search);

    res.render('admin/product', {
      currentPage: 'product',
      admin: {
        name: req.session?.user?.full_name || 'Admin',
        profileImage: req.session?.user?.profile_image || '/image/default-avatar.png',
      },
      products,
      categories,
      title: 'Product Management'
    });
  } catch (error) {
    console.error("DETAILED ERROR:", error); 
    res.status(500).send('Server Error');
  }
};


exports.addProduct = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { name, category, price, detail, sizes, colors, stocks } = req.body;

    const [prodResult] = await connection.query(
      `INSERT INTO products (product_name, category_id, base_price, description) VALUES (?, ?, ?, ?)`,
      [name, category, price, detail]
    );
    const productId = prodResult.insertId;

    if (sizes && sizes.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        await connection.query(
          `INSERT INTO product_attributes (product_id, size, color, stock_qty) VALUES (?, ?, ?, ?)`,
          [productId, sizes[i], colors[i], stocks[i]]
        );
      }
    }

    await connection.commit();
    res.redirect('/admin/product');
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).send("Failed to create product");
  } finally {
    connection.release();
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productModel.deleteProduct(req.params.id);
    res.redirect('/admin/product');
  } catch (error) {
    console.error(error);
    res.redirect('/admin/product?error=delete_failed');
  }
};
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        

        await adminModel.updateProductData(productId, req.body);
        
        res.redirect('/admin/product');
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).send("Error updating product");
    }
};