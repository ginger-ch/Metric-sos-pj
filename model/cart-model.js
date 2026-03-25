const db = require('../config/db');

const getCartItems = async (userId) => {
  const [rows] = await db.query(`
    SELECT 
      ci.cart_item_id,
      ci.quantity,
      ci.attribute_id,
      p.product_id,
      p.product_name AS name,
      p.base_price AS price,
      pa.size,
      pa.color,
      pi.image_url AS image
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.product_id
    LEFT JOIN product_attributes pa ON ci.attribute_id = pa.attribute_id
    LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
    WHERE ci.user_id = ?
    ORDER BY ci.added_at DESC
  `, [userId]);
  return rows;
};

const addItem = async (userId, productId, attribute_id, quantity) => {
  const [existing] = await db.query(`
    SELECT cart_item_id, quantity FROM cart_items
    WHERE user_id = ? AND product_id = ? AND attribute_id = ?
  `, [userId, productId, attribute_id]);

  if (existing.length > 0) {
    await db.query(`
      UPDATE cart_items SET quantity = quantity + ?
      WHERE cart_item_id = ?
    `, [quantity, existing[0].cart_item_id]);
  } else {
    await db.query(`
      INSERT INTO cart_items (user_id, product_id, attribute_id, quantity)
      VALUES (?, ?, ?, ?)
    `, [userId, productId, attribute_id, quantity]);
  }
};

const updateQuantity = async (cart_item_id, userId, quantity) => {
  await db.query(`
    UPDATE cart_items SET quantity = ?
    WHERE cart_item_id = ? AND user_id = ?
  `, [quantity, cart_item_id, userId]);
};

const removeItem = async (cart_item_id, userId) => {
  await db.query(`
    DELETE FROM cart_items
    WHERE cart_item_id = ? AND user_id = ?
  `, [cart_item_id, userId]);
};

const clearCart = async (userId) => {
  await db.query(`
    DELETE FROM cart_items WHERE user_id = ?
  `, [userId]);
};

const getCartCount = async (userId) => {
  const [[{ count }]] = await db.query(`
    SELECT COALESCE(SUM(quantity), 0) AS count
    FROM cart_items WHERE user_id = ?
  `, [userId]);
  return count;
};

const createOrder = async (userId, items, total) => {
  const orderNumber = '#' + Date.now().toString().slice(-6);

  const [result] = await db.query(`
    INSERT INTO orders (order_number, user_id, shipping_address, total_amount, status)
    VALUES (?, ?, 'Not specified', ?, 'pending')
  `, [orderNumber, userId, total]);

  const orderId = result.insertId;

  for (const item of items) {
    await db.query(`
      INSERT INTO order_items (order_id, product_id, attribute_id, quantity, unit_price)
      VALUES (?, ?, ?, ?, ?)
    `, [orderId, item.product_id, item.attribute_id, item.quantity, item.price]);
  }

  return orderId;
};

module.exports = { 
  getCartItems, 
  addItem, 
  updateQuantity, 
  removeItem, 
  clearCart, 
  getCartCount,
  createOrder
};

