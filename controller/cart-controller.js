const cartModel = require('../model/cart-model');

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    req.session.returnTo = req.originalUrl;
    req.session.save(() => {        
      return res.redirect('/login');
    });
    return;
  }
  next();
};

const getCart = async (req, res) => {
  console.log("=== Current Session Data ===");
  console.log(req.session); 
  console.log("============================");
  try {
    // 1. เช็คก่อนว่ามี Session ไหม ถ้าไม่มีให้เด้งไปหน้า Login หรือส่งค่าว่าง
    if (!req.session.user) {
      console.log("Session Expired or Not Logged In");
      return res.redirect('/login'); 
      // หรือถ้าอยากให้ดูตะกร้าเปล่าๆ ได้: return res.render('cart', { items: [], total: 0 });
    }

    const userId = req.session.user.user_id;
    const items = await cartModel.getCartItems(userId);
    const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    res.render('cart', { items, total });
  } catch (err) {
    console.error('Cart Controller Error:', err);
    res.status(500).send("Internal Server Error");
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    const { product_id, attribute_id, quantity, productId, attributeId } = req.body;
    const pid = product_id || productId;
    const aid = attribute_id || attributeId;
    await cartModel.addItem(userId, pid, aid, parseInt(quantity) || 1);
    res.redirect('/cart');
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).send('Server error');
  }
};

const updateQuantity = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    const { cart_item_id, quantity } = req.body;

    if (parseInt(quantity) < 1) {
      await cartModel.removeItem(cart_item_id, userId);
    } else {
      await cartModel.updateQuantity(cart_item_id, userId, parseInt(quantity));
    }
    res.redirect('/cart');
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).send('Server error');
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    const { cart_item_id } = req.body;

    await cartModel.removeItem(cart_item_id, userId);
    res.redirect('/cart');
  } catch (err) {
    console.error('Remove item error:', err);
    res.status(500).send('Server error');
  }
};

const checkout = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    const items = await cartModel.getCartItems(userId);
    
    if (items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    // const shippingAddress = req.body.shippingAddress || 'Not specified';

    await cartModel.createOrder(userId, items, total);
    await cartModel.clearCart(userId);

    res.json({ success: true });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ success: false });
  }
};

module.exports = { 
  requireLogin, 
  getCart, 
  addToCart, 
  updateQuantity, 
  removeItem, 
  checkout 
};