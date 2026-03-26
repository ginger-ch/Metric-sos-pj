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
    WHERE p.is_deleted = 0  /* <--- Only show active best sellers */
    ORDER BY p.created_at DESC
    LIMIT 4
  `, []);
  return products;
};

const getCategories = async () => {
  const [categories] = await db.query(`
    SELECT 
      c.category_id AS id,
      c.category_name AS name,
      c.slug,
      (
        SELECT pi.image_url 
        FROM products p
        JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
        WHERE p.category_id = c.category_id 
          AND p.is_deleted = 0  /* <--- Don't use images from deleted products */
        LIMIT 1
      ) AS image
    FROM categories c
    WHERE c.visibility = 'show'
    ORDER BY c.category_name ASC
  `);
  return categories;
};

const getNewestProductImage = async () => {
  const [[result]] = await db.query(`
    SELECT pi.image_url AS image
    FROM products p
    JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
    WHERE p.is_deleted = 0  /* <--- Ensure the hero image is an active product */
    ORDER BY p.created_at DESC
    LIMIT 1
  `);
  return result?.image || null;
};

module.exports = { getBestSellers, getCategories, getNewestProductImage };