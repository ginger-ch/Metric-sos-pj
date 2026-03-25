const db = require('../config/db');

const getProductsBySlug = async (slug, offset, limit) => {
  const [products] = await db.query(`
    SELECT p.product_id AS id,
           p.product_name AS name,
           p.base_price AS price,
           pi.image_url AS image
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    LEFT JOIN product_images pi
      ON p.product_id = pi.product_id AND pi.is_primary = 1
    WHERE c.slug = ? AND c.visibility = 'show'
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `, [slug, limit, offset]);
  return products;
};

const getTotalBySlug = async (slug) => {
  const [[{ total }]] = await db.query(`
    SELECT COUNT(*) AS total
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE c.slug = ? AND c.visibility = 'show'
  `, [slug]);
  return total;
};

const getCategoryBySlug = async (slug) => {
  const [[category]] = await db.query(`
    SELECT category_name AS name, slug
    FROM categories
    WHERE slug = ? AND visibility = 'show'
  `, [slug]);
  return category;
};

module.exports = { getProductsBySlug, getTotalBySlug, getCategoryBySlug };
