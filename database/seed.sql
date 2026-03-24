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