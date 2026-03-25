SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE product_attributes;
TRUNCATE TABLE product_images;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO users (full_name, username, email, password_hash, role)
VALUES ('Admin', 'admin', 'admin@girllette.com', 'admin1234', 'admin');

INSERT INTO categories (category_name, slug, visibility)
VALUES
('TOP', 'top', 'show'),
('BOTTOM', 'bottom', 'show'),
('DRESS', 'dress', 'show'),
('OUTERWEAR', 'outerwear', 'show'),
('PAJAMAS', 'pajamas', 'show'),
('ACCESSORY', 'accessory', 'hidden'),
('BAG', 'bag', 'show'),
('SOCKS', 'socks', 'hidden');

INSERT INTO products (category_id, product_name, description, base_price)
VALUES
-- top
(1, 'Pastel Yellow Puff Sleeve Top', 'Cute puff sleeve top in soft yellow with a relaxed cropped fit', 490),
(1, 'Blue Ruffle Sleeveless Blouse', 'Breezy sleeveless blouse in light blue with ruffle trim shoulders', 450),
(1, 'Pink Tiered Babydoll Top', 'Feminine babydoll top in soft pink with layered tiered hem', 550),
(1, 'Red Pleated Sleeveless Top', 'Sleeveless top in deep red with delicate pleated front detail', 490),
(1, 'Plaid Lace Collar Blouse', 'Loose plaid blouse with lace peter pan collar in beige tones', 520),
(1, 'Ivory Polka Dot Bow Blouse', 'Soft ivory blouse with small polka dot print and front bow tie', 490),
(1, 'Baby Blue Ruffle Tie Babydoll Top', 'Soft baby blue babydoll top with ruffle neckline and front tie detail', 490),
(1, 'Cream Floral Peter Pan Collar Blouse', 'Puff sleeve blouse in cream with ditsy floral print, peter pan lace collar and eyelet hem', 520),
(1, 'White Ribbon Bow Blouse', 'Crisp white short-sleeve blouse with black ribbon bow neckline', 520),
(1, 'Cream Tie-Neck Chiffon Blouse', 'Flowy cream chiffon blouse with self-tie bow at neckline', 550),
(1, 'Grey Stripe Sleeveless Shirt', 'Relaxed sleeveless collared shirt in grey stripe with front tie', 490),
(1, 'Pink Cuban Collar Short Sleeve Shirt', 'Casual short-sleeve shirt in soft pink with Cuban collar detail', 520),

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
(2, 'Brown Tiered Ruffle Asymmetric Mini Skirt', 'Dramatic tiered ruffle mini skirt in brown with floral corsage accent and asymmetric trailing hem', 790),

-- dress
(3, 'White Ruffle Midi Dress', 'Soft white midi dress with mock neck, tiered ruffle hem, and relaxed babydoll silhouette', 790),
(3, 'Navy Denim Pinafore Dress', 'Sleeveless navy denim pinafore dress with front button detail, contrast stitching, and side pockets', 890),
(3, 'Blue Plaid Sailor Collar Dress', 'Charming blue plaid dress with white lace-trimmed sailor collar and gathered waist', 850),
(3, 'Navy Plaid Peter Pan Collar Mini Dress', 'Fitted navy plaid mini dress with white peter pan collar, puff sleeves, and pleated mesh hem', 820),
(3, 'Plaid Double-Breasted Swing Dress', 'Vintage-style plaid dress with dark peter pan collar and double-breasted button front', 790),
(3, 'Pink Houndstooth Peter Pan Collar Mini Dress', 'Fitted pink houndstooth mini dress with lace peter pan collar and black ribbon bow', 750),
(3, 'Yellow Lace Hem Maxi Dress', 'Dreamy yellow maxi dress with square neck, gingham waist tie, puff sleeves, and lace-trimmed hem', 990),
(3, 'Ivory Blue Floral Spaghetti Strap Maxi Dress', 'Flowy ivory maxi dress with blue floral print, ruffle bust, and ribbon lace-up detail', 950),
(3, 'Ivory Cherry Embroidery Spaghetti Strap Maxi Dress', 'Romantic ivory maxi dress with all-over cherry embroidery and smocked waist', 990),
(3, 'Baby Blue Knit Slip Maxi Dress', 'Soft baby blue knit slip dress with white ruffle trim hem, layered over a white long-sleeve inner', 880),
(3, 'Red Gingham Pinafore Tie-Waist Dress', 'Sweet red gingham pinafore dress with bow tie waist and A-line silhouette', 790),
(3, 'Lace Collar Puff Sleeve Two-Piece Set', 'Matching set of lace-collar puff sleeve top and smocked waist midi skirt', 1090),
(3, 'Plaid Woolen Pinafore Midi Dress', 'Classic sleeveless plaid woolen pinafore midi dress with double-breasted button detail', 950),
(3, 'Ivory Wildflower Print Tiered Maxi Dress', 'Airy ivory maxi dress with colorful wildflower print, lace peter pan collar, and tie sleeves', 890),
 
 -- outerwear
(4, 'Pink Cable Knit Cardigan', 'Cozy oversized cable knit cardigan in soft pink with wood button front', 790),
(4, 'Oversized Zip-Up Hoodie', 'Relaxed fit zip-up hoodie with front kangaroo pocket and drawstring hood', 690),
(4, 'Plaid Flannel Overshirt', 'Soft plaid flannel shirt jacket with classic collar and button front', 620),
(4, 'Pink Varsity Jacket', 'Cute pink varsity jacket with cream sleeves, striped trim, and patch detail', 990),
(4, 'Oversized PU Leather Jacket', 'Edgy oversized faux leather jacket with lapel collar and zip front', 1090),
(4, 'Padded Puffer Bomber Jacket', 'Soft padded puffer bomber jacket in grey-blue with zip pockets and fleece-lined collar', 950),
(4, 'Blue Checkerboard Knit Cardigan', 'Oversized blue and white checkerboard knit cardigan with cute character details and front pockets', 850),
(4, 'Lace Tie-Front Shrug Cardigan', 'Delicate sheer lace shrug with ruffle trim and front tie closure', 590),
(4, 'Crochet Star Crop Sweater', 'Handmade-style open-knit crochet crop sweater with star motif and contrast stripe sleeves', 750),
(4, 'Colorblock Stripe Knit Sweater', 'Retro colorblock stripe knit sweater with V-neck lace-up detail in green, brown, and grey tones', 790),
(4, 'Black Bow Racing Leather Jacket', 'Statement black PU leather racing jacket with pink bow appliqués, contrast stripes, and zip pockets', 1290),
(4, 'Beige Corduroy Collar Drawstring Jacket', 'Casual oversized jacket in beige with corduroy collar, snap buttons, and side drawstring tie', 890),
 
 -- pajamas
(5, 'Yellow Gingham Tomato Embroidery Pajama Set', 'Short sleeve pajama set in yellow gingham with cute tomato embroidery and red buttons', 590),
(5, 'Ruffle Bow Cami Pajama Set', 'Sleeveless cami top and shorts set with ruffle hem and bow detail', 550),
(5, 'Cute Bear Print Tee Pajama Set', 'Relaxed short sleeve tee and shorts set with adorable bear character print', 490),
(5, 'Strawberry Print Cami Pajama Set', 'Delicate spaghetti strap crop top and shorts in white strawberry print', 520),
(5, 'Pastel Plaid Button Pajama Set', 'Classic button-up short sleeve shirt and shorts in soft pastel plaid', 550),
(5, 'Gingham Embroidery Long Pants Pajama Set', 'Button-up shirt and wide-leg long pants set in gingham with cute character embroidery', 620),
(5, 'Cherry Print Ruffle Nightgown', 'Flowy spaghetti strap nightgown with cherry print and ruffle hem', 520),
(5, 'Cherry Print Slip Nightgown', 'Loose-fit slip nightgown in white with allover cherry print and ruffle bottom', 490),
(5, 'Lace Collar Gingham Nightgown', 'Short puff sleeve nightgown with lace eyelet collar and bow in gingham check', 590),
(5, 'Gingham Lace Ruffle Cami Set', 'Cami top and shorts set with lace trim straps and ruffle hem in pink gingham', 550),
(5, 'Flannel Bear Cherry Long Sleeve Set', 'Warm flannel long sleeve top and pants set with bear and cherry allover print', 690),
(5, 'Letter Print Tee & Gingham Pants Set', 'Oversized letter print tee paired with wide-leg gingham check pants', 620);
 

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
-- top7
(7, '/image/products/top/top7_1.jpg', 1, 1),
(7, '/image/products/top/top7_2.jpg', 0, 2),
-- top8
(8, '/image/products/top/top8_1.jpg', 1, 1),
(8, '/image/products/top/top8_2.jpg', 0, 2),
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
(12, '/image/products/top/top12_3.jpg', 0, 3),
 
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
(24, '/image/products/bottom/bottom12_3.jpg', 0, 3),
 
-- dress
-- dress1
(25, '/image/products/dress/dress1_1.jpg', 1, 1),
(25, '/image/products/dress/dress1_2.jpg', 0, 2),
-- dress2
(26, '/image/products/dress/dress2_1.jpg', 1, 1),
(26, '/image/products/dress/dress2_2.jpg', 0, 2),
(26, '/image/products/dress/dress2_3.jpg', 0, 3),
-- dress3
(27, '/image/products/dress/dress3_1.jpg', 1, 1),
(27, '/image/products/dress/dress3_2.jpg', 0, 2),
(27, '/image/products/dress/dress3_3.jpg', 0, 3),
-- dress4
(28, '/image/products/dress/dress4_1.jpg', 1, 1),
(28, '/image/products/dress/dress4_2.jpg', 0, 2),
-- dress5
(29, '/image/products/dress/dress5_1.jpg', 1, 1),
(29, '/image/products/dress/dress5_2.jpg', 0, 2),
-- dress6
(30, '/image/products/dress/dress6_1.jpg', 1, 1),
(30, '/image/products/dress/dress6_2.jpg', 0, 2),
(30, '/image/products/dress/dress6_3.jpg', 0, 3),
-- dress7
(31, '/image/products/dress/dress7_1.jpg', 1, 1),
(31, '/image/products/dress/dress7_2.jpg', 0, 2),
(31, '/image/products/dress/dress7_3.jpg', 0, 3),
-- dress8a (blue floral)
(32, '/image/products/dress/dress8_1.jpg', 1, 1),
(32, '/image/products/dress/dress8_2.jpg', 0, 2),
-- dress8b (cherry embroidery)
(33, '/image/products/dress/dress8_3.jpg', 1, 1),
(33, '/image/products/dress/dress8_4.jpg', 0, 2),
-- dress9
(34, '/image/products/dress/dress9_1.jpg', 1, 1),
(34, '/image/products/dress/dress9_2.jpg', 0, 2),
-- dress10
(35, '/image/products/dress/dress10_1.jpg', 1, 1),
(35, '/image/products/dress/dress10_2.jpg', 0, 2),
-- dress11
(36, '/image/products/dress/dress11_1.jpg', 1, 1),
(36, '/image/products/dress/dress11_2.jpg', 0, 2),
(36, '/image/products/dress/dress11_3.jpg', 0, 3),
(36, '/image/products/dress/dress11_4.jpg', 0, 4),
-- dress12
(37, '/image/products/dress/dress12_1.jpg', 1, 1),
(37, '/image/products/dress/dress12_2.jpg', 0, 2),
(37, '/image/products/dress/dress12_3.jpg', 0, 3),
(37, '/image/products/dress/dress12_4.jpg', 0, 4),
-- dress13
(38, '/image/products/dress/dress13_1.jpg', 1, 1),
(38, '/image/products/dress/dress13_2.jpg', 0, 2),
(38, '/image/products/dress/dress13_3.jpg', 0, 3),

-- outer
-- outerwear1
(39, '/image/products/outerwear/outerwear1_1.jpg', 1, 1),
(39, '/image/products/outerwear/outerwear1_2.jpg', 0, 2),
-- outerwear2
(40, '/image/products/outerwear/outerwear2_1.jpg', 1, 1),
(40, '/image/products/outerwear/outerwear2_2.jpg', 0, 2),
-- outerwear3
(41, '/image/products/outerwear/outerwear3_1.jpg', 1, 1),
(41, '/image/products/outerwear/outerwear3_2.jpg', 0, 2),
-- outerwear4
(42, '/image/products/outerwear/outerwear4_1.jpg', 1, 1),
(42, '/image/products/outerwear/outerwear4_2.jpg', 0, 2),
(42, '/image/products/outerwear/outerwear4_3.jpg', 0, 3),
-- outerwear5
(43, '/image/products/outerwear/outerwear5_1.jpg', 1, 1),
(43, '/image/products/outerwear/outerwear5_2.jpg', 0, 2),
-- outerwear6
(44, '/image/products/outerwear/outerwear6_1.jpg', 1, 1),
(44, '/image/products/outerwear/outerwear6_2.jpg', 0, 2),
(44, '/image/products/outerwear/outerwear6_3.jpg', 0, 3),
-- outerwear7
(45, '/image/products/outerwear/outerwear7_1.jpg', 1, 1),
(45, '/image/products/outerwear/outerwear7_2.jpg', 0, 2),
-- outerwear8
(46, '/image/products/outerwear/outerwear8_1.jpg', 1, 1),
(46, '/image/products/outerwear/outerwear8_2.jpg', 0, 2),
-- outerwear9
(47, '/image/products/outerwear/outerwear9_1.jpg', 1, 1),
(47, '/image/products/outerwear/outerwear9_2.jpg', 0, 2),
(47, '/image/products/outerwear/outerwear9_3.jpg', 0, 3),
-- outerwear10
(48, '/image/products/outerwear/outerwear10_1.jpg', 1, 1),
(48, '/image/products/outerwear/outerwear10_2.jpg', 0, 2),
(48, '/image/products/outerwear/outerwear10_3.jpg', 0, 3),
(48, '/image/products/outerwear/outerwear10_4.jpg', 0, 4),
-- outerwear11
(49, '/image/products/outerwear/outerwear11_1.jpg', 1, 1),
(49, '/image/products/outerwear/outerwear11_2.jpg', 0, 2),
(49, '/image/products/outerwear/outerwear11_3.jpg', 0, 3),
(49, '/image/products/outerwear/outerwear11_4.jpg', 0, 4),
(49, '/image/products/outerwear/outerwear11_5.jpg', 0, 5),
-- outerwear12
(50, '/image/products/outerwear/outerwear12_1.jpg', 1, 1),

-- pajamas
-- pajamas1
(51, '/image/products/pajamas/pajamas1_1.jpg', 1, 1),
(51, '/image/products/pajamas/pajamas1_2.jpg', 0, 2),
-- pajamas2
(52, '/image/products/pajamas/pajamas2_1.jpg', 1, 1),
(52, '/image/products/pajamas/pajamas2_2.jpg', 0, 2),
(52, '/image/products/pajamas/pajamas2_3.jpg', 0, 3),
-- pajamas3
(53, '/image/products/pajamas/pajamas3_1.jpg', 1, 1),
(53, '/image/products/pajamas/pajamas3_2.jpg', 0, 2),
-- pajamas4
(54, '/image/products/pajamas/pajamas4_1.jpg', 1, 1),
(54, '/image/products/pajamas/pajamas4_2.jpg', 0, 2),
-- pajamas5
(55, '/image/products/pajamas/pajamas5_1.jpg', 1, 1),
(55, '/image/products/pajamas/pajamas5_2.jpg', 0, 2),
(55, '/image/products/pajamas/pajamas5_3.jpg', 0, 3),
-- pajamas6
(56, '/image/products/pajamas/pajamas6_1.jpg', 1, 1),
(56, '/image/products/pajamas/pajamas6_2.jpg', 0, 2),
-- pajamas7
(57, '/image/products/pajamas/pajamas7_1.jpg', 1, 1),
(57, '/image/products/pajamas/pajamas7_2.jpg', 0, 2),
-- pajamas8
(58, '/image/products/pajamas/pajamas8_1.jpg', 1, 1),
(58, '/image/products/pajamas/pajamas8_2.jpg', 0, 2),
-- pajamas9
(59, '/image/products/pajamas/pajamas9_1.jpg', 1, 1),
(59, '/image/products/pajamas/pajamas9_2.jpg', 0, 2),
-- pajamas10
(60, '/image/products/pajamas/pajamas10_1.jpg', 1, 1),
(60, '/image/products/pajamas/pajamas10_2.jpg', 0, 2),
-- pajamas11
(61, '/image/products/pajamas/pajamas11_1.jpg', 1, 1),
(61, '/image/products/pajamas/pajamas11_2.jpg', 0, 2),
-- pajamas12
(62, '/image/products/pajamas/pajamas12_1.jpg', 1, 1),
(62, '/image/products/pajamas/pajamas12_2.jpg', 0, 2);
 
 
 

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
-- top7
(7, 'S', 'blue', 10),
(7, 'M', 'blue', 12),
(7, 'L', 'blue', 8),
-- top8 
(8, 'S', 'cream', 10),
(8, 'M', 'cream', 12),
(8, 'L', 'cream', 8),
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
(12, 'L', 'pink', 8),
 
-- bottom
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
(24, 'L', 'brown', 7),
 
-- dress
-- dress1
(25, 'S', 'white', 10),
(25, 'M', 'white', 12),
(25, 'L', 'white', 8),
 
-- dress2
(26, 'S', 'navy',  9),
(26, 'M', 'navy',  11),
(26, 'L', 'navy',  7),
 
-- dress3
(27, 'S', 'blue',  10),
(27, 'M', 'blue',  12),
(27, 'L', 'blue',  8),
 
-- dress4
(28, 'S', 'navy',  10),
(28, 'M', 'navy',  12),
(28, 'L', 'navy',  8),
 
-- dress5
(29, 'S', 'red',   10),
(29, 'M', 'red',   12),
(29, 'L', 'red',   8),
(29, 'S', 'beige', 9),
(29, 'M', 'beige', 11),
(29, 'L', 'beige', 7),
 
-- dress6
(30, 'S', 'pink',  10),
(30, 'M', 'pink',  12),
(30, 'L', 'pink',  8),
 
-- dress7
(31, 'S', 'yellow', 10),
(31, 'M', 'yellow', 12),
(31, 'L', 'yellow', 8),
 
-- dress8a
(32, 'S', 'ivory', 9),
(32, 'M', 'ivory', 11),
(32, 'L', 'ivory', 7),
 
-- dress8b
(33, 'S', 'ivory', 9),
(33, 'M', 'ivory', 11),
(33, 'L', 'ivory', 7),
 
-- dress9
(34, 'S', 'blue',  10),
(34, 'M', 'blue',  12),
(34, 'L', 'blue',  8),
 
-- dress10
(35, 'S', 'red',   10),
(35, 'M', 'red',   12),
(35, 'L', 'red',   8),
 
-- dress11 
(36, 'S', 'blue',      10),
(36, 'M', 'blue',      12),
(36, 'L', 'blue',      8),
(36, 'S', 'multicolor', 9),
(36, 'M', 'multicolor', 11),
(36, 'L', 'multicolor', 7),
 
-- dress12 
(37, 'S', 'grey',  9),
(37, 'M', 'grey',  11),
(37, 'L', 'grey',  7),
(37, 'S', 'navy',  9),
(37, 'M', 'navy',  10),
(37, 'L', 'navy',  6),
 
-- dress13
(38, 'S', 'ivory', 10),
(38, 'M', 'ivory', 12),
(38, 'L', 'ivory', 8),

-- outerwear1
(39, 'S', 'pink',  10),
(39, 'M', 'pink',  12),
(39, 'L', 'pink',  8),
 
-- outerwear2
(40, 'S', 'pink',  10),
(40, 'M', 'pink',  12),
(40, 'L', 'pink',  8),
(40, 'S', 'blue',  9),
(40, 'M', 'blue',  11),
(40, 'L', 'blue',  7),
 
-- outerwear3 
(41, 'S', 'pink',  9),
(41, 'M', 'pink',  11),
(41, 'L', 'pink',  7),
(41, 'S', 'navy',  9),
(41, 'M', 'navy',  11),
(41, 'L', 'navy',  7),
 
-- outerwear4
(42, 'S', 'pink',  9),
(42, 'M', 'pink',  11),
(42, 'L', 'pink',  7),
 
-- outerwear5
(43, 'S', 'black', 9),
(43, 'M', 'black', 11),
(43, 'L', 'black', 7),
(43, 'S', 'brown', 8),
(43, 'M', 'brown', 10),
(43, 'L', 'brown', 6),
 
-- outerwear6
(44, 'S', 'blue',  9),
(44, 'M', 'blue',  11),
(44, 'L', 'blue',  7),
 
-- outerwear7
(45, 'S', 'blue',  10),
(45, 'M', 'blue',  12),
(45, 'L', 'blue',  8),
 
-- outerwear8 
(46, 'S', 'black', 9),
(46, 'M', 'black', 11),
(46, 'L', 'black', 7),
(46, 'S', 'cream', 8),
(46, 'M', 'cream', 10),
(46, 'L', 'cream', 6),
 
-- outerwear9
(47, 'S', 'green', 8),
(47, 'M', 'green', 10),
(47, 'L', 'green', 6),
(47, 'S', 'red',   8),
(47, 'M', 'red',   10),
(47, 'L', 'red',   6),
 
-- outerwear10 
(48, 'S', 'multicolor', 9),
(48, 'M', 'multicolor', 11),
(48, 'L', 'multicolor', 7),
 
-- outerwear11 
(49, 'S', 'black', 8),
(49, 'M', 'black', 10),
(49, 'L', 'black', 6),
 
-- outerwear12 
(50, 'S', 'beige', 9),
(50, 'M', 'beige', 11),
(50, 'L', 'beige', 7),

-- pajamas
-- pajamas1
(51, 'S', 'yellow', 10),
(51, 'M', 'yellow', 12),
(51, 'L', 'yellow', 8),
-- pajamas2
(52, 'S', 'cream', 9),
(52, 'M', 'cream', 11),
(52, 'L', 'cream', 6),
(52, 'S', 'grey', 8),
(52, 'M', 'grey', 10),
(52, 'L', 'grey', 5),
-- pajamas3
(53, 'S', 'cream', 10),
(53, 'M', 'cream', 12),
(53, 'L', 'cream', 7),
-- pajamas4
(54, 'S', 'white', 10),
(54, 'M', 'white', 12),
(54, 'L', 'white', 8),
-- pajamas5
(55, 'S', 'pink', 8),
(55, 'M', 'pink', 10),
(55, 'L', 'pink', 6),
(55, 'S', 'green', 8),
(55, 'M', 'green', 9),
(55, 'L', 'green', 5),
(55, 'S', 'purple', 7),
(55, 'M', 'purple', 9),
(55, 'L', 'purple', 5),
-- pajamas6:
(56, 'S', 'purple', 9),
(56, 'M', 'purple', 11),
(56, 'L', 'purple', 6),
(56, 'S', 'pink', 9),
(56, 'M', 'pink', 10),
(56, 'L', 'pink', 5),
-- pajamas7
(57, 'S', 'pink', 9),
(57, 'M', 'pink', 11),
(57, 'L', 'pink', 6),
(57, 'S', 'cream', 8),
(57, 'M', 'cream', 10),
(57, 'L', 'cream', 5),
-- pajamas8
(58, 'S', 'white', 10),
(58, 'M', 'white', 12),
(58, 'L', 'white', 7),
-- pajamas9
(59, 'S', 'pink', 9),
(59, 'M', 'pink', 11),
(59, 'L', 'pink', 6),
(59, 'S', 'blue', 8),
(59, 'M', 'blue', 10),
(59, 'L', 'blue', 5),
-- pajamas10
(60, 'S', 'pink', 10),
(60, 'M', 'pink', 12),
(60, 'L', 'pink', 7),
-- pajamas11
(61, 'S', 'cream', 9),
(61, 'M', 'cream', 11),
(61, 'L', 'cream', 6),
-- pajamas12
(62, 'S', 'red', 9),
(62, 'M', 'red', 11),
(62, 'L', 'red', 6),
(62, 'S', 'blue', 8),
(62, 'M', 'blue', 10),
(62, 'L', 'blue', 5);
 
 

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
(8, 3, 8, 1, 590.00),
(9, 1, 1, 1, 490.00),  -- Order #M001
(10, 2, 4, 1, 450.00), -- Order #M002
(11, 3, 7, 1, 550.00), -- Order #M003
(12, 4, 10, 1, 490.00),-- Order #M004
(13, 5, 13, 1, 520.00),-- Order #M005
(14, 6, 16, 1, 490.00),-- Order #M006
(15, 7, 19, 1, 490.00);-- Order #M007

INSERT INTO order_items (order_id, product_id, attribute_id, quantity, unit_price)
VALUES
((SELECT order_id FROM orders WHERE order_number = '#0001'), 1, 1, 1, 300.00),
((SELECT order_id FROM orders WHERE order_number = '#0002'), 2, 4, 1, 450.00),
((SELECT order_id FROM orders WHERE order_number = '#0003'), 3, 7, 1, 590.00),
((SELECT order_id FROM orders WHERE order_number = '#0004'), 4, 10, 1, 590.00),
((SELECT order_id FROM orders WHERE order_number = '#0005'), 5, 13, 1, 500.00);

-- 1. Create New Completed Orders for 2026
INSERT INTO orders (order_number, user_id, shipping_address, total_amount, status, order_date)
VALUES
('#2026-001', 1, 'Bangkok, TH', 1200.00, 'completed', '2026-03-05 10:00:00'),
('#2026-002', 1, 'Chiang Mai, TH', 850.00,  'completed', '2026-03-12 14:30:00'),
('#2026-003', 1, 'Phuket, TH', 2100.00, 'completed', '2026-03-20 09:15:00'),
('#2026-004', 1, 'Chonburi, TH', 450.00,  'completed', '2026-03-25 16:00:00');

-- 2. Link these new orders to products in order_items
INSERT INTO order_items (order_id, product_id, attribute_id, quantity, unit_price)
VALUES
((SELECT order_id FROM orders WHERE order_number = '#2026-001'), 49, 133, 1, 1200.00),
((SELECT order_id FROM orders WHERE order_number = '#2026-002'), 39, 103, 1, 850.00),
((SELECT order_id FROM orders WHERE order_number = '#2026-003'), 1, 1, 2, 1050.00),
((SELECT order_id FROM orders WHERE order_number = '#2026-004'), 13, 37, 1, 450.00);