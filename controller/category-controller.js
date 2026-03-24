const categoryModel = require('../model/category-model');

const PRODUCTS_PER_PAGE = 15;

const getCategoryPage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * PRODUCTS_PER_PAGE;

    const category = await categoryModel.getCategoryBySlug(slug);
    if (!category) {
      return res.status(404).send('Category not found');
    }

    const products = await categoryModel.getProductsBySlug(slug, offset, PRODUCTS_PER_PAGE);
    const total = await categoryModel.getTotalBySlug(slug);
    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

    res.render('category', {
      categoryName: category.name,
      products,
      currentPage: page,
      totalPages,
    });

  } catch (err) {
    console.error('Category page error:', err);
    res.status(500).send('Server error');
  }
};

module.exports = { getCategoryPage };
