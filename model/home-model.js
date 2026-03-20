const db = require('../config/db');

const getBestSellers = async () => {
  const [products] = await db.query(`
    SELECT p.product_id AS id,
           p.product_name AS name,
           p.base_price AS price,
           pi.image_url AS image
    FROM products p
    LEFT JOIN product_images pi
      ON p.product_id = pi.product_id AND pi.is_primary = 1
    ORDER BY p.created_at DESC
    LIMIT 4
  `);
  return products;
};

const getCategories = async () => {
  const [categories] = await db.query(`
    SELECT category_id AS id,
           category_name AS name,
           slug
    FROM categories
    WHERE visibility = 'show'
    ORDER BY category_name ASC
  `);
  return categories;
};

module.exports = { getBestSellers, getCategories };