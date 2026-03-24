const db = require('../config/db');


const getProduct = async (id) => {

  // ── 1. Core product row + category name
  const [productRows] = await db.query(
    `SELECT
       p.product_id,
       p.product_name,
       p.description,
       p.base_price,
       p.created_at,
       c.category_name
     FROM products p
     LEFT JOIN categories c
       ON p.category_id = c.category_id
     WHERE p.product_id = ?`,
    [id]
  );

  if (!productRows || productRows.length === 0) return null;

  const product = productRows[0];

  // ── 2. Images (sorted: primary first, then by sort_order)
  const [imageRows] = await db.query(
    `SELECT
       image_id,
       image_url,
       is_primary,
       sort_order
     FROM product_images
     WHERE product_id = ?
     ORDER BY is_primary DESC, sort_order ASC`,
    [id]
  );

  product.images = imageRows || [];

  // ── 3. Attributes (size / color / stock)
  const [attrRows] = await db.query(
    `SELECT
       attribute_id,
       size,
       color,
       stock_qty
     FROM product_attributes
     WHERE product_id = ?
     ORDER BY attribute_id ASC`,
    [id]
  );

  product.attributes = attrRows || [];

  return product;
};

module.exports = { getProduct };