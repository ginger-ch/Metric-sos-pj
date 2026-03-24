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

// Categories
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