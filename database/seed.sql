INSERT INTO categories (category_name, slug, visibility)
VALUES
('TOP', 'top', 'show'),
('BOTTOM', 'bottom', 'show'),
('DRESS', 'dress', 'show'),
('OUTERWEAR', 'outerwear', 'show'),
('PAJAMAS', 'pajamas', 'show');

INSERT INTO products (category_id, product_name, description, base_price)
VALUES
(1, 'Basic Cotton T-Shirt', 'Comfortable everyday cotton t-shirt', 300),
(1, 'Oversized Graphic Tee', 'Loose fit t-shirt with printed graphic design', 450),
(1, 'Slim Fit Polo Shirt', 'Casual slim-fit polo shirt for everyday wear', 590),
(1, 'Ribbed Tank Top', 'Stretchable ribbed tank top for casual styling', 590),
(1, 'Cropped Knit Top', 'Trendy cropped knit top suitable for summer outfits', 500);

INSERT INTO product_images (product_id, image_url, is_primary, sort_order)
VALUES
-- Product 1
(1, '/image/products/top/top1_1.jpg', 1, 1),
(1, '/image/products/top/top1_2.jpg', 0, 2),
(1, '/image/products/top/top1_3.jpg', 0, 3),

-- Product 2
(2, '/image/products/top/top2_1.jpg', 1, 1),
(2, '/image/products/top/top2_2.jpg', 0, 2),

-- Product 3
(3, '/image/products/top/top3_1.jpg', 1, 1),
(3, '/image/products/top/top3_2.jpg', 0, 2),

-- Product 4
(4, '/image/products/top/top4_1.jpg', 1, 1),
(4, '/image/products/top/top4_2.jpg', 0, 2),

-- Product 5
(5, '/image/products/top/top5_1.jpg', 1, 1),
(5, '/image/products/top/top5_2.jpg', 0, 2);

INSERT INTO product_attributes (product_id, size, color, stock_qty)
VALUES
-- Product 1
(1, 'S', 'white', 10),
(1, 'M', 'white', 15),
(1, 'L', 'white', 8),

-- Product 2
(2, 'S', 'black', 12),
(2, 'M', 'black', 10),
(2, 'L', 'black', 7),

-- Product 3
(3, 'S', 'pink', 9),
(3, 'M', 'pink', 14),
(3, 'L', 'pink', 6),

-- Product 4
(4, 'S', 'beige', 10),
(4, 'M', 'beige', 11),
(4, 'L', 'beige', 5),

-- Product 5
(5, 'S', 'blue', 13),
(5, 'M', 'blue', 9),
(5, 'L', 'blue', 4);

-- seed orders
INSERT INTO orders (order_number, user_id, shipping_address, total_amount, status, order_date)
VALUES
('#0001', NULL, '123 Test St', 300.00, 'pending',   '2025-01-20'),
('#0002', NULL, '123 Test St', 450.00, 'pending',   '2025-01-20'),
('#0003', NULL, '123 Test St', 590.00, 'processing','2025-02-10'),
('#0004', NULL, '123 Test St', 590.00, 'shipped',   '2025-02-15'),
('#0005', NULL, '123 Test St', 500.00, 'completed', '2025-03-01'),
('#0006', NULL, '123 Test St', 300.00, 'pending',   '2025-03-05'),
('#0007', NULL, '123 Test St', 450.00, 'cancelled', '2025-03-10'),
('#0008', NULL, '123 Test St', 590.00, 'pending',   '2025-04-01');

-- seed order_items (เชื่อม order กับ product)
INSERT INTO order_items (order_id, product_id, attribute_id, quantity, unit_price)
VALUES
(1, 1, 1, 1, 300.00),
(2, 2, 4, 1, 450.00),
(3, 3, 7, 1, 590.00),
(4, 4, 10, 1, 590.00),
(5, 5, 13, 1, 500.00),
(6, 1, 2, 1, 300.00),
(7, 2, 5, 1, 450.00),
(8, 3, 8, 1, 590.00);

