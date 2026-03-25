const db = require('../config/db');

exports.searchProducts = async (q, limit, offset) => {
  const [products] = await db.query(`
    SELECT p.product_id AS id,
           p.product_name AS name,
           p.base_price AS price,
           pi.image_url AS image
    FROM products p
    LEFT JOIN product_images pi
      ON p.product_id = pi.product_id AND pi.is_primary = 1
    WHERE p.product_name LIKE ?
    LIMIT ? OFFSET ?
  `, [`%${q}%`, limit, offset]);
  return products;
};

exports.countSearchProducts = async (q) => {
  const [[{ total }]] = await db.query(`
    SELECT COUNT(*) AS total
    FROM products
    WHERE product_name LIKE ?
  `, [`%${q}%`]);
  return total;
};