const db = require('../config/db');

exports.addItemToCart = async (userId, productId, attributeId, quantity) => {
    const [stockRows] = await db.execute(
        'SELECT stock_quantity FROM product_attributes WHERE attribute_id = ?',
        [attributeId]
    );

    if (stockRows.length === 0 || stockRows[0].stock_quantity < quantity) {
        throw new Error('Insufficient stock');
    }

    const sql = `
        INSERT INTO cart_items (user_id, product_id, attribute_id, quantity)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
    
    return await db.execute(sql, [userId, productId, attributeId, quantity]);
};