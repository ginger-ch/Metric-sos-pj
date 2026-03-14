const { dummyProducts, dummyCategories } = require('../model/dummyData');

const getHomePage = (req, res) => {
  // Best seller = first 4 products
  const bestSellers = dummyProducts.slice(0, 4);

  res.render('index', {
    products: bestSellers,
    categories: dummyCategories,
  });
};

module.exports = { getHomePage };
