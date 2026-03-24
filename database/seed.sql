INSERT INTO categories (category_name, slug, visibility)
VALUES
('TOP', 'top', 'show'),
('BOTTOM', 'bottom', 'show'),
('DRESS', 'dress', 'show'),
('OUTERWEAR', 'outerwear', 'show'),
('PAJAMAS', 'pajamas', 'show'),
('ACCESSORY', 'accessory', 'hide'),
('BAG', 'bag', 'show'),
('SOCKS', 'socks', 'hide');

INSERT INTO products (category_id, product_name, description, base_price)
VALUES
-- top
(1, 'Pastel Yellow Puff Sleeve Top', 'Cute puff sleeve top in soft yellow with a relaxed cropped fit', 490),
(1, 'Blue Ruffle Sleeveless Blouse', 'Breezy sleeveless blouse in light blue with ruffle trim shoulders', 450),
(1, 'Pink Tiered Babydoll Top', 'Feminine babydoll top in soft pink with layered tiered hem', 550),
(1, 'Red Pleated Sleeveless Top', 'Sleeveless top in deep red with delicate pleated front detail', 490),
(1, 'Plaid Lace Collar Blouse', 'Loose plaid blouse with lace peter pan collar in beige tones', 520),
(1, 'Ivory Polka Dot Bow Blouse', 'Soft ivory blouse with small polka dot print and front bow tie', 490),
-- top7(เกิดความผิดพลาดเล็กน้อย รูปยังไม่มี โปรดอัปเดตภายหลังนะจ้ะ)
(1, 'TBD Top 7', 'Product details to be updated', 490),
-- top8(เกิดความผิดพลาดเล็กน้อย รูปยังไม่มี โปรดอัปเดตภายหลังนะจ้ะ)
(1, 'TBD Top 8', 'Product details to be updated', 490),
(1, 'White Ribbon Bow Blouse', 'Crisp white short-sleeve blouse with black ribbon bow neckline', 520),
(1, 'Cream Tie-Neck Chiffon Blouse', 'Flowy cream chiffon blouse with self-tie bow at neckline', 550),
(1, 'Grey Stripe Sleeveless Shirt', 'Relaxed sleeveless collared shirt in grey stripe with front tie', 490),
(1, 'Pink Cuban Collar Short Sleeve Shirt', 'Casual short-sleeve shirt in soft pink with Cuban collar detail', 520);
-- bottom
(2, 'White Lace Bow Mini Skirt', 'Cute mini skirt in white with black bow details, button trim, and delicate lace hem', 590),
(2, 'Soft Tiered Maxi Skirt', 'Flowy tiered maxi skirt with elastic waist, available in pink, blue, and white', 690),
(2, 'Dark Navy Gingham Wide-Leg Jeans', 'Dark navy wide-leg jeans with contrasting gingham bow tie detail and cuffed hem', 890),
(2, 'Denim Heart Patch Overall Skirt', 'Pleated denim overall skirt with cute heart patch pocket accent', 750),
(2, 'Pink Gingham Tiered Maxi Skirt', 'Breezy tiered maxi skirt in pink gingham print with drawstring waist', 650),
(2, 'Ivory Polka Dot Midi Skirt', 'Classic A-line midi skirt in ivory with allover polka dot print', 620),
(2, 'Khaki Straight Maxi Skirt', 'Sleek high-waist straight-cut maxi skirt in warm khaki', 680),
(2, 'Bow Print Wide-Leg Pants', 'Relaxed wide-leg pants in ivory with all-over bow print and lace ruffle waistband', 720),
(2, 'Apple Embroidered Pleated Mini Skirt', 'Rust-toned pleated mini skirt with charming apple embroidery and contrast stitch hem', 650),
(2, 'Plaid Ruffle Wrap Belt Skirt', 'Layered plaid ruffle skirt that wraps and ties at the waist, worn over jeans or pants', 580),
(2, 'Lace Corset Panel Mini Skirt', 'Elegant white mini skirt with lace panel corset details, tiny bows, and ruffle hem', 690),
(2, 'Brown Tiered Ruffle Asymmetric Mini Skirt', 'Dramatic tiered ruffle mini skirt in brown with floral corsage accent and asymmetric trailing hem', 790);
 
-- drss
(3, 'Floral Summer Dress', 'Light floral dress perfect for summer days', 690),
(3, 'Minimal Slip Dress', 'Simple and elegant slip dress', 720),
(3, 'Korean Style Midi Dress', 'Soft tone midi dress with Korean style', 850),
(3, 'Casual T-Shirt Dress', 'Loose fit t-shirt dress for daily wear', 590),
(3, 'Bodycon Mini Dress', 'Slim fit bodycon dress for night outings', 780),
(3, 'Pleated Long Dress', 'Elegant long dress with pleated design', 920),
(3, 'Off-Shoulder Dress', 'Trendy off-shoulder feminine dress', 860),
(3, 'Linen Shirt Dress', 'Breathable linen dress with shirt style', 800),
(3, 'Layered Ruffle Dress', 'Cute layered dress with ruffle details', 880),
(3, 'Vintage Style Dress', 'Classic vintage-inspired dress', 950),
(3, 'Satin Evening Dress', 'Smooth satin dress for formal events', 1100),
(3, 'Cute Mini Dress', 'Short dress for casual and cute outfits', 640);

INSERT INTO product_images (product_id, image_url, is_primary, sort_order)
VALUES
-- top1
(1, '/image/products/top/top1_1.jpg', 1, 1),
(1, '/image/products/top/top1_2.jpg', 0, 2),
(1, '/image/products/top/top1_3.jpg', 0, 3),
-- top2
(2, '/image/products/top/top2_1.jpg', 1, 1),
(2, '/image/products/top/top2_2.jpg', 0, 2),
-- top3
(3, '/image/products/top/top3_1.jpg', 1, 1),
(3, '/image/products/top/top3_2.jpg', 0, 2),
-- top4
(4, '/image/products/top/top4_1.jpg', 1, 1),
(4, '/image/products/top/top4_2.jpg', 0, 2),
-- top5
(5, '/image/products/top/top5_1.jpg', 1, 1),
(5, '/image/products/top/top5_2.jpg', 0, 2),
-- top6
(6, '/image/products/top/top6_1.jpg', 1, 1),
(6, '/image/products/top/top6_2.jpg', 0, 1),
(6, '/image/products/top/top6_3.jpg', 0, 1),
-- top7 (เดะมาอัปเดตจ้ะ)
(7, '/image/products/top/top7_1.jpg', 1, 1),
-- top8 (เดะมาอัปเดตจ้ะ)
(8, '/image/products/top/top8_1.jpg', 1, 1),
-- top9
(9, '/image/products/top/top9_1.jpg', 1, 1),
(9, '/image/products/top/top9_2.jpg', 0, 2),
-- top10
(10, '/image/products/top/top10_1.jpg', 1, 1),
(10, '/image/products/top/top10_2.jpg', 0, 2),
-- top11
(11, '/image/products/top/top11_1.jpg', 1, 1),
(11, '/image/products/top/top11_2.jpg', 0, 2),
-- top12
(12, '/image/products/top/top12_1.jpg', 1, 1),
(12, '/image/products/top/top12_2.jpg', 0, 2),
(12, '/image/products/top/top12_3.jpg', 0, 3);
 
-- bottom
-- bottom1
(13, '/image/products/bottom/bottom1_1.jpg', 1, 1),
(13, '/image/products/bottom/bottom1_2.jpg', 0, 2),
(13, '/image/products/bottom/bottom1_3.jpg', 0, 3),
(13, '/image/products/bottom/bottom1_4.jpg', 0, 4),
-- bottom2
(14, '/image/products/bottom/bottom2_1.png', 1, 1),
(14, '/image/products/bottom/bottom2_2.jpg', 0, 2),
(14, '/image/products/bottom/bottom2_3.jpg', 0, 3),
-- bottom3
(15, '/image/products/bottom/bottom3_1.jpg', 1, 1),
-- bottom4
(16, '/image/products/bottom/bottom4_1.jpg', 1, 1),
-- bottom5
(17, '/image/products/bottom/bottom5_1.jpg', 1, 1),
-- bottom6
(18, '/image/products/bottom/bottom6_1.jpg', 1, 1),
(18, '/image/products/bottom/bottom6_2.jpg', 0, 2),
-- bottom7
(19, '/image/products/bottom/bottom7_1.jpg', 1, 1),
-- bottom8
(20, '/image/products/bottom/bottom8_1.jpg', 1, 1),
(20, '/image/products/bottom/bottom8_2.jpg', 0, 2),
(20, '/image/products/bottom/bottom8_3.jpg', 0, 3),
-- bottom9
(21, '/image/products/bottom/bottom9_1.jpg', 1, 1),
(21, '/image/products/bottom/bottom9_2.jpg', 0, 2),
-- bottom10
(22, '/image/products/bottom/bottom10_1.jpg', 1, 1),
(22, '/image/products/bottom/bottom10_2.jpg', 0, 2),
(22, '/image/products/bottom/bottom10_3.jpg', 0, 3),
-- bottom11
(23, '/image/products/bottom/bottom11_1.jpg', 1, 1),
(23, '/image/products/bottom/bottom11_2.jpg', 0, 2),
(23, '/image/products/bottom/bottom11_3.jpg', 0, 3),
-- bottom12
(24, '/image/products/bottom/bottom12_1.jpg', 1, 1),
(24, '/image/products/bottom/bottom12_2.jpg', 0, 2),
(24, '/image/products/bottom/bottom12_3.jpg', 0, 3);
 
-- dress
(25, '/image/products/dress/dress1_1.jpg', 1, 1),
(25, '/image/products/dress/dress1_2.jpg', 0, 2),

(26, '/image/products/dress/dress2_1.jpg', 1, 1),

(27, '/image/products/dress/dress3_1.jpg', 1, 1),
(27, '/image/products/dress/dress3_2.jpg', 0, 2),

(28, '/image/products/dress/dress4_1.jpg', 1, 1),

(29, '/image/products/dress/dress5_1.jpg', 1, 1),
(29, '/image/products/dress/dress5_2.jpg', 0, 2),

(30, '/image/products/dress/dress6_1.jpg', 1, 1),

(31, '/image/products/dress/dress7_1.jpg', 1, 1),
(31, '/image/products/dress/dress7_2.jpg', 0, 2),

(32, '/image/products/dress/dress8_1.jpg', 1, 1),

(33, '/image/products/dress/dress9_1.jpg', 1, 1),
(33, '/image/products/dress/dress9_2.jpg', 0, 2),

(34, '/image/products/dress/dress10_1.jpg', 1, 1),

(35, '/image/products/dress/dress11_1.jpg', 1, 1),
(35, '/image/products/dress/dress11_2.jpg', 0, 2),

(36, '/image/products/dress/dress12_1.jpg', 1, 1);

INSERT INTO product_attributes (product_id, size, color, stock_qty)
VALUES
-- top
-- top1
(1, 'S', 'yellow', 10),
(1, 'M', 'yellow', 12),
(1, 'L', 'yellow', 8),
-- top2
(2, 'S', 'blue', 10),
(2, 'M', 'blue', 12),
(2, 'L', 'blue', 8),
-- top3
(3, 'S', 'pink', 10),
(3, 'M', 'pink', 12),
(3, 'L', 'pink', 8),
-- top4
(4, 'S', 'red', 10),
(4, 'M', 'red', 12),
(4, 'L', 'red', 8),
-- top5
(5, 'S', 'yellow', 10),
(5, 'M', 'yellow', 12),
(5, 'L', 'yellow', 8),
-- top6
(6, 'S', 'cream', 10),
(6, 'M', 'cream', 12),
(6, 'L', 'cream', 8),
-- top7 เดะไปหามางับ
(7, 'S', 'TBD', 0),
(7, 'M', 'TBD', 0),
(7, 'L', 'TBD', 0),
-- top8 เดะไปหามางับ
(8, 'S', 'TBD', 0),
(8, 'M', 'TBD', 0),
(8, 'L', 'TBD', 0),
-- top9
(9, 'S', 'white', 9),
(9, 'M', 'white', 10),
(9, 'L', 'white', 5),
(9, 'S', 'pink', 8),
(9, 'M', 'pink', 9),
(9, 'L', 'pink', 4),
-- top10
(10, 'S', 'cream', 10),
(10, 'M', 'cream', 11),
(10, 'L', 'cream', 6),
(10, 'S', 'blue', 9),
(10, 'M', 'blue', 10),
(10, 'L', 'blue', 5),
-- top11: grey
(11, 'S', 'grey', 10),
(11, 'M', 'grey', 12),
(11, 'L', 'grey', 8),
-- top12: pink
(12, 'S', 'pink', 10),
(12, 'M', 'pink', 12),
(12, 'L', 'pink', 8);
 
--bottom
-- bottom1
(13, 'S', 'white', 10),
(13, 'M', 'white', 12),
(13, 'L', 'white', 8),
 
-- bottom2
(14, 'S', 'pink',  10),
(14, 'M', 'pink',  12),
(14, 'L', 'pink',  8),
(14, 'S', 'blue',  9),
(14, 'M', 'blue',  11),
(14, 'L', 'blue',  7),
(14, 'S', 'white', 9),
(14, 'M', 'white', 10),
(14, 'L', 'white', 6),
 
-- bottom3
(15, 'S', 'navy',  8),
(15, 'M', 'navy',  10),
(15, 'L', 'navy',  6),
 
-- bottom4
(16, 'S', 'blue',  10),
(16, 'M', 'blue',  12),
(16, 'L', 'blue',  8),
 
-- bottom5
(17, 'S', 'pink',  10),
(17, 'M', 'pink',  12),
(17, 'L', 'pink',  8),
 
-- bottom6
(18, 'S', 'ivory', 10),
(18, 'M', 'ivory', 12),
(18, 'L', 'ivory', 8),
 
-- bottom7
(19, 'S', 'khaki', 10),
(19, 'M', 'khaki', 12),
(19, 'L', 'khaki', 8),
 
-- bottom8
(20, 'S', 'ivory', 10),
(20, 'M', 'ivory', 12),
(20, 'L', 'ivory', 8),
 
-- bottom9
(21, 'S', 'rust',  10),
(21, 'M', 'rust',  12),
(21, 'L', 'rust',  8),
 
-- bottom10
(22, 'S', 'black', 9),
(22, 'M', 'black', 11),
(22, 'L', 'black', 7),
(22, 'S', 'green', 8),
(22, 'M', 'green', 10),
(22, 'L', 'green', 6),
(22, 'S', 'red',   8),
(22, 'M', 'red',   9),
(22, 'L', 'red',   5),
 
-- bottom11
(23, 'S', 'white', 10),
(23, 'M', 'white', 12),
(23, 'L', 'white', 8),
 
-- bottom12
(24, 'S', 'brown', 9),
(24, 'M', 'brown', 11),
(24, 'L', 'brown', 7);
 
-- dress
-- Product 25
(25, 'S', 'floral', 8),
(25, 'M', 'floral', 10),
(25, 'L', 'floral', 5),

-- Product 26
(26, 'S', 'beige', 7),
(26, 'M', 'beige', 9),
(26, 'L', 'beige', 4),

-- Product 27
(27, 'S', 'cream', 9),
(27, 'M', 'cream', 11),
(27, 'L', 'cream', 6),

-- Product 28
(28, 'S', 'white', 10),
(28, 'M', 'white', 12),
(28, 'L', 'white', 6),

-- Product 29
(29, 'S', 'black', 8),
(29, 'M', 'black', 10),
(29, 'L', 'black', 5),

-- Product 30
(30, 'S', 'pink', 7),
(30, 'M', 'pink', 9),
(30, 'L', 'pink', 4),

-- Product 31
(31, 'S', 'red', 6),
(31, 'M', 'red', 8),
(31, 'L', 'red', 4),

-- Product 32
(32, 'S', 'brown', 9),
(32, 'M', 'brown', 10),
(32, 'L', 'brown', 5),

-- Product 33
(33, 'S', 'lavender', 8),
(33, 'M', 'lavender', 9),
(33, 'L', 'lavender', 5),

-- Product 34
(34, 'S', 'green', 7),
(34, 'M', 'green', 8),
(34, 'L', 'green', 4),

-- Product 35
(35, 'S', 'black', 6),
(35, 'M', 'black', 7),
(35, 'L', 'black', 3),

-- Product 36
(36, 'S', 'white', 10),
(36, 'M', 'white', 11),
(36, 'L', 'white', 6);

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