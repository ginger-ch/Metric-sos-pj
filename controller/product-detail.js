const detailModel = require('../model/product-detail-model');

const getProduct = async (req, res )=> {
  try {
    const productId = parseInt(req.params.id, 10);
 
    if (isNaN(productId)) {
      return res.status(400).render('error', { message: 'Invalid product ID.' });
    }
 
   const product = await detailModel.getProduct(productId);
 
    if (!product) {
      return res.status(404).render('error', { message: 'Product not found.' });
    }

 
    res.render('product-detail', {
      product,
      user: req.session?.user || null,   // set by your auth middleware
    });
 
  } catch (err) {
    console.error('Product page error:', err);
    res.status(500).render('error', { message: 'Something went wrong.' });
  }
}
