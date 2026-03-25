const homeModel = require('../model/home-model');

const getHomePage = async (req, res) => {
  try {
    const products = await homeModel.getBestSellers();
    const categories = await homeModel.getCategories();

    res.render('index', { products, categories });

  } catch (err) {
    console.error('Home page error:', err);
    res.status(500).send('Server error');
  }
};

module.exports = { getHomePage };