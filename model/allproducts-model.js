const db = require('../config/db');

const getProducts = async (offset, limit) => {
  const [products] = await db.query(`
    SELECT p.product_id AS id,
           p.product_name AS name,
           p.base_price AS price,
           pi.image_url AS image
    FROM products p
    LEFT JOIN product_images pi
      ON p.product_id = pi.product_id AND pi.is_primary = 1
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `, [limit, offset]);
  return products;
};

const getTotalCount = async () => {
  const [[{ total }]] = await db.query(`
    SELECT COUNT(*) AS total FROM products
  `);
  return total;
};

module.exports = { getProducts, getTotalCount };