const db = require('../config/db');

// Dashboard
exports.getCategories = async () => {
  const [categories] = await db.query(`
    SELECT c.category_id, c.category_name AS name,
           JSON_ARRAYAGG(p.product_name) AS products
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.category_id
    WHERE c.visibility = 'show'
    GROUP BY c.category_id
    ORDER BY c.category_name ASC
  `);
  return categories;
};

exports.getTotalCategory = async () => {
  const [[{ totalCategory }]] = await db.query(
    'SELECT COUNT(*) AS totalCategory FROM categories WHERE visibility = "show"'
  );
  return totalCategory;
};

exports.getTotalProduct = async () => {
  const [[{ totalProduct }]] = await db.query(
    'SELECT COUNT(*) AS totalProduct FROM products'
  );
  return totalProduct;
};

exports.getTotalMonth = async () => {
  const [[{ totalMonth }]] = await db.query(`
    SELECT COALESCE(SUM(total_amount), 0) AS totalMonth
    FROM orders
    WHERE status = 'completed'
      AND MONTH(order_date) = MONTH(CURDATE())
      AND YEAR(order_date)  = YEAR(CURDATE())
  `);
  return totalMonth;
};

exports.getTotalWeek = async () => {
  const [[{ totalWeek }]] = await db.query(`
    SELECT COALESCE(SUM(total_amount), 0) AS totalWeek
    FROM orders
    WHERE status = 'completed'
      AND order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
  `);
  return totalWeek;
};

exports.getItemSold = async () => {
  const [itemSold] = await db.query(`
    SELECT p.product_name AS name, SUM(oi.quantity) AS qty
    FROM order_items oi
    JOIN products p ON p.product_id = oi.product_id
    GROUP BY oi.product_id
    ORDER BY qty DESC
    LIMIT 8
  `);
  return itemSold;
};

exports.getRecentOrders = async () => {
  const [recentOrders] = await db.query(`
    SELECT o.order_number AS number,
           DATE_FORMAT(o.order_date, '%d-%m-%y') AS date,
           u.username AS customer
    FROM orders o
    LEFT JOIN users u ON u.user_id = o.user_id
    ORDER BY o.order_date DESC
    LIMIT 5
  `);
  return recentOrders;
};

exports.getOutOfStock = async () => {
  const [outOfStock] = await db.query(`
    SELECT p.product_name AS name
    FROM product_attributes pa
    JOIN products p ON p.product_id = pa.product_id
    GROUP BY p.product_id
    HAVING SUM(pa.stock_qty) = 0
    LIMIT 5
  `);
  return outOfStock;
};

// Orders
exports.getOrders = async (conditions, params, limit, offset) => {
  const whereClause = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const [orders] = await db.query(`
    SELECT
      o.order_id,
      o.order_number,
      DATE_FORMAT(o.order_date, '%d-%m-%y') AS order_date,
      ANY_VALUE(p.product_name) AS order_name,
      u.username AS customer,
      o.status
    FROM orders o
    LEFT JOIN users u ON u.user_id = o.user_id
    LEFT JOIN order_items oi ON oi.order_id = o.order_id
    LEFT JOIN products p ON p.product_id = oi.product_id
    ${whereClause}
    GROUP BY o.order_id, o.order_number, o.order_date, u.username, o.status
    ORDER BY o.order_date DESC
    LIMIT ? OFFSET ?
  `, [...params, limit, offset]);
  return orders;
};

exports.getTotalOrders = async (conditions, params) => {
  const whereClause = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const [[{ total }]] = await db.query(`
    SELECT COUNT(DISTINCT o.order_id) AS total
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.order_id
    LEFT JOIN products p ON p.product_id = oi.product_id
    ${whereClause}
  `, params);
  return total;
};

exports.updateOrderStatus = async (id, status) => {
  await db.query(
    `UPDATE orders SET status = ? WHERE order_id = ?`,
    [status, id]
  );
};

exports.getAllCategories = async (filter = '', search = '') => {
  const conditions = [];
  const params = [];

  if (filter)  { conditions.push(`c.visibility = ?`);          params.push(filter); }
  if (search)  { conditions.push(`c.category_name LIKE ?`);    params.push(`%${search}%`); }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  const [categories] = await db.query(`
    SELECT c.category_id, c.category_name, c.slug, c.visibility,
           COUNT(p.product_id) AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.category_id
    ${where}
    GROUP BY c.category_id
    ORDER BY c.category_name ASC
  `, params);
  return categories;
};

exports.createCategory = async (name, slug, visibility) => {
  await db.query(
    `INSERT INTO categories (category_name, slug, visibility) VALUES (?, ?, ?)`,
    [name, slug, visibility]
  );
};

exports.updateCategoryVisibility = async (id, visibility) => {
  await db.query(
    `UPDATE categories SET visibility = ? WHERE category_id = ?`,
    [visibility, id]
  );
};

exports.deleteCategory = async (id) => {
  await db.query(`DELETE FROM categories WHERE category_id = ?`, [id]);
};

exports.updateCategory = async (id, name, slug, visibility) => {
  await db.query(
    `UPDATE categories SET category_name = ?, slug = ?, visibility = ? WHERE category_id = ?`,
    [name, slug, visibility, id]
  );
};

exports.getAllProducts = async (categoryId = null, search = '') => {
  let query = `
    SELECT 
      p.product_id AS _id, 
      p.product_name AS name, 
      p.description AS detail, 
      p.base_price AS price,
      ANY_VALUE(c.category_name) AS category_name,
      ANY_VALUE(pi.image_url) AS main_image,
      SUM(pa.stock_qty) AS total_stock, -- <--- Your new SUM logic here
      GROUP_CONCAT(DISTINCT pa.size) AS sizes,
      GROUP_CONCAT(DISTINCT pa.color) AS colors
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.category_id
    LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
    LEFT JOIN product_attributes pa ON p.product_id = pa.product_id
  `;

  const conditions = [];
  const params = [];

  if (categoryId) {
    conditions.push(`p.category_id = ?`);
    params.push(categoryId);
  }
  if (search) {
    conditions.push(`p.product_name LIKE ?`);
    params.push(`%${search}%`);
  }

  if (conditions.length > 0) query += ` WHERE ` + conditions.join(' AND ');

  query += ` GROUP BY p.product_id ORDER BY p.product_name DESC`;

  const [products] = await db.query(query, params);

  for (let product of products) {

  const [attrs] = await db.query(
    `SELECT size, color, stock_qty 
     FROM product_attributes 
     WHERE product_id = ?`,
    [product._id]
  );

  product.attributes = attrs;

 
  product.sizes = typeof product.sizes === 'string'
    ? product.sizes.split(',')
    : [];


  product.category = {
    name: product.category_name
  };


  product.images = product.main_image
    ? [product.main_image]
    : [];
}




  return products;
}
  
  


exports.createFullProduct = async (data) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO products (category_id, product_name, description, base_price)
       VALUES (?, ?, ?, ?)`,
      [
  data.category,
  data.name,
  data.detail,
  Number(data.price) || 0
]
    );

    const productId = result.insertId;

  
    if (data.files) {
      for (let file of data.files) {
        const imagePath = file.path.replace('public', '');

        await connection.query(
          `INSERT INTO product_images (product_id, image_url, is_primary)
           VALUES (?, ?, 1)`,
          [productId, imagePath]
        );
      }
    }


    const sizes = Array.isArray(data.sizes) ? data.sizes : [data.sizes];
    const colors = Array.isArray(data.colors) ? data.colors : [data.colors];
    const stocks = Array.isArray(data.stocks) ? data.stocks : [data.stocks];

    for (let i = 0; i < sizes.length; i++) {
      if (!sizes[i] && !colors[i]) continue;

      await connection.query(
        `INSERT INTO product_attributes (product_id, size, color, stock_qty)
         VALUES (?, ?, ?, ?)`,
        [productId, sizes[i], colors[i], Number(stocks[i]) || 0]
      );
    }

    await connection.commit();
    return productId;

  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

exports.deleteProduct = async (id) => {
  await db.query(`DELETE FROM products WHERE product_id = ?`, [id]);
};

exports.updateProductData = async (productId, data) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Safety check to ensure data actually arrived
        if (!data || !data.name) {
            throw new Error("Form data was not received correctly. Check Multer middleware.");
        }

        // 1. Update main table
        await connection.query(
            `UPDATE products SET product_name=?, category_id=?, base_price=?, description=? WHERE product_id=?`,
            [data.name, data.category, data.price, data.detail, productId]
        );

        // 2. Refresh attributes
        await connection.query(`DELETE FROM product_attributes WHERE product_id=?`, [productId]);
        
        if (data.sizes) {
            // Force inputs into arrays (Multer makes them strings if there's only one)
            const sizes = Array.isArray(data.sizes) ? data.sizes : [data.sizes];
            const colors = Array.isArray(data.colors) ? data.colors : [data.colors];
            const stocks = Array.isArray(data.stocks) ? data.stocks : [data.stocks];

            for (let i = 0; i < sizes.length; i++) {
                // Skip rows that are totally empty
                if (!sizes[i] && !colors[i]) continue;

                await connection.query(
                    `INSERT INTO product_attributes (product_id, size, color, stock_qty) VALUES (?, ?, ?, ?)`,
                    [productId, sizes[i], colors[i], Number(stocks[i]) || 0]
                );
            }
        }

        await connection.commit();
        return true;
    } catch (err) {
        await connection.rollback();
        throw err; 
    } finally {
        connection.release();
    }
};

exports.getProductAttributes = async (productId) => {
  const [rows] = await db.query(
    `SELECT size, color, stock_qty 
     FROM product_attributes 
     WHERE product_id = ?`,
    [productId]
  );
  return rows;
};

// Sales History
exports.getTopProducts = async (limit = 5) => {
  const [products] = await db.query(`
    SELECT 
      p.product_name, 
      pi.image_url, 
      COUNT(oi.item_id) AS total_orders
    FROM products p
    LEFT JOIN order_items oi ON p.product_id = oi.product_id
    LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
    GROUP BY p.product_id, p.product_name, pi.image_url
    ORDER BY total_orders DESC
    LIMIT ?
  `, [limit]);
  return products;
};
exports.getDailySales = async (month, year) => {
  const [daily] = await db.query(`
    SELECT 
      DATE_FORMAT(o.order_date, '%d %b') AS label,
      SUM(oi.quantity) AS total_qty,
      SUM(o.total_amount) AS total_sales
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE MONTH(o.order_date) = ? 
      AND YEAR(o.order_date) = ?
      AND o.status = 'completed'
    GROUP BY label, DATE(o.order_date)
    ORDER BY DATE(o.order_date) ASC
  `, [month, year]);
  return daily;
};

exports.getMonthlySales = async (year) => {
  const [monthly] = await db.query(`
    SELECT 
      DATE_FORMAT(o.order_date, '%b') AS label,
      SUM(oi.quantity) AS total_qty,
      SUM(o.total_amount) AS total_sales
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE YEAR(o.order_date) = ?
      AND TRIM(LOWER(o.status)) = 'completed'
    GROUP BY label, MONTH(o.order_date)
    ORDER BY MONTH(o.order_date) ASC
  `, [year]);
  return monthly;

};