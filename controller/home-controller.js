const { dummyProducts, dummyCategories } = require('../model/dummyData');


const getHomePage = async (req, res) => {
  try {
    const products = await homeModel.getBestSellers();
    const categories = await homeModel.getCategories();
    const newestImage = await homeModel.getNewestProductImage();
    res.render('index', { products, categories, newestImage });
  } catch (err) {
    console.error('Home page error:', err);
    res.status(500).send('Server error');
  }
};

module.exports = { getHomePage };

