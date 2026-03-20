const db = require('../config/db');

const PRODUCTS_PER_PAGE = 15;

// GET /products — All products with pagination
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * PRODUCTS_PER_PAGE;

    // Get products for current page
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
    `, [PRODUCTS_PER_PAGE, offset]);

    // Get total count for pagination
    const [[{ total }]] = await db.query(`
      SELECT COUNT(*) AS total FROM products
    `);

    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

    res.render('all-products', {
      products,
      currentPage: page,
      totalPages,
    });

  } catch (err) {
    console.error('All products error:', err);
    res.status(500).send('Server error');
  }
};

module.exports = { getAllProducts };
