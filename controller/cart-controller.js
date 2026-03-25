const cartModel = require('../model/cart-model');

exports.addToCart = async (req, res) => {
    try {
        const { productId, attributeId, quantity } = req.body;
        const userId = req.session.user ? req.session.user.id : null;

        if (!userId) {
            return res.status(401).json({ message: "Please log in first" });
        }

        await cartModel.addItemToCart(userId, productId, attributeId, quantity);
        
        res.status(200).json({ message: "Successfully added to cart!" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message || "Error adding to cart" });
    }
};