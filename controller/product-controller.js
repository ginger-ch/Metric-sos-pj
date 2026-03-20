const productModel = require('../model/allproducts-model');

const PRODUCTS_PER_PAGE = 15;

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * PRODUCTS_PER_PAGE;

    const products = await productModel.getProducts(offset, PRODUCTS_PER_PAGE);
    const total = await productModel.getTotalCount();
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