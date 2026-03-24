const searchModel = require('../model/search-model');

exports.getSearch = async (req, res) => {
  const { q = '', page = 1 } = req.query;
  const limit = 8;
  const offset = (parseInt(page) - 1) * limit;

  try {
    const products = await searchModel.searchProducts(q, limit, offset);
    const totalResults = await searchModel.countSearchProducts(q);
    const totalPages = Math.ceil(totalResults / limit);

    res.render('search', {
      query: q,
      products,
      totalResults,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};