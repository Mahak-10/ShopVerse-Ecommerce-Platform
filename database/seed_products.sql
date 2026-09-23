-- Seed products across all 20 categories using nextval('products_seq')
DELETE FROM products;

INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id, seller_id) VALUES
-- Category 1: Electronics & Gadgets
(nextval('products_seq'), 'High-fidelity bluetooth wireless headphones with active noise cancellation and 30h battery life.', 10.0, 'headphones.jpg', 199.99, 'Wireless Noise-Canceling Headphones', 50, 179.99, 1, 2),
(nextval('products_seq'), 'Portable 360-degree bluetooth speaker with IPX7 waterproof rating.', 15.0, 'headphones.jpg', 79.99, 'Waterproof Bluetooth Speaker', 40, 67.99, 1, 2),

-- Category 2: Mobiles & Accessories
(nextval('products_seq'), '5G Smartphone with 6.7-inch AMOLED display, triple 48MP camera, and 256GB storage.', 5.0, 'smartphone.jpg', 899.99, 'Flagship 5G Smartphone 256GB', 30, 854.99, 2, 2),
(nextval('products_seq'), '20000mAh ultra-fast charging power bank with 65W Power Delivery.', 10.0, 'smartphone.jpg', 49.99, 'Fast Charging Power Bank 20000mAh', 80, 44.99, 2, 2),

-- Category 3: Computers & Laptops
(nextval('products_seq'), 'Ultra-slim 14-inch laptop with Intel i7 processor, 16GB RAM, and 512GB SSD.', 12.0, 'laptop.jpg', 999.99, 'Pro Ultra-Slim Laptop 14-Inch', 20, 879.99, 3, 2),
(nextval('products_seq'), 'RGB mechanical gaming keyboard with tactile switches and customizable backlighting.', 8.0, 'laptop.jpg', 89.99, 'Mechanical Gaming Keyboard', 60, 82.79, 3, 2),

-- Category 4: Men's Fashion
(nextval('products_seq'), 'Classic vintage style denim jacket with comfortable cotton blend fit.', 10.0, 'mens_jacket.jpg', 79.99, 'Classic Vintage Denim Jacket', 35, 71.99, 4, 2),
(nextval('products_seq'), 'Heavyweight fleece pullover hoodie with kangaroo pocket.', 15.0, 'mens_jacket.jpg', 49.99, 'Fleece Pullover Hoodie', 50, 42.49, 4, 2),

-- Category 5: Women's Fashion
(nextval('products_seq'), 'Elegant floral summer dress with lightweight breathable fabric.', 10.0, 'womens_dress.jpg', 59.99, 'Floral Summer Maxi Dress', 45, 53.99, 5, 2),
(nextval('products_seq'), 'Cozy knit cardigan sweater with open front design.', 20.0, 'womens_dress.jpg', 45.99, 'Casual Knit Cardigan Sweater', 60, 36.79, 5, 2),

-- Category 6: Footwear & Shoes
(nextval('products_seq'), 'Breathable mesh running shoes with responsive foam cushioning.', 15.0, 'running_shoes.jpg', 119.99, 'Lightweight Mesh Running Shoes', 50, 101.99, 6, 2),
(nextval('products_seq'), 'Classic low-top canvas sneakers with durable rubber sole.', 10.0, 'running_shoes.jpg', 54.99, 'Classic Canvas Low-Top Sneakers', 70, 49.49, 6, 2),

-- Category 7: Home & Kitchen
(nextval('products_seq'), '12-cup programmable drip coffee maker with thermal stainless steel carafe.', 10.0, 'coffee_maker.jpg', 69.99, 'Programmable Drip Coffee Maker', 30, 62.99, 7, 2),
(nextval('products_seq'), 'Digital XL air fryer 5.8 quart with 8 preset cooking modes.', 15.0, 'coffee_maker.jpg', 109.99, 'Digital Touchscreen Air Fryer XL', 25, 93.49, 7, 2),

-- Category 8: Furniture & Decor
(nextval('products_seq'), 'Modern LED architect desk lamp with touch dimmer and USB charging port.', 5.0, 'desk_lamp.jpg', 42.99, 'Dimmable LED Architect Desk Lamp', 50, 40.84, 8, 2),
(nextval('products_seq'), 'Ergonomic memory foam desk chair cushion for back support.', 10.0, 'desk_lamp.jpg', 34.99, 'Memory Foam Desk Chair Cushion', 65, 31.49, 8, 2),

-- Category 9: Beauty & Skincare
(nextval('products_seq'), 'Hydrating skincare bundle including facial cleanser, serum, and moisturizer.', 10.0, 'skincare.jpg', 59.99, 'Daily Hydrating Skincare Bundle', 40, 53.99, 9, 2),
(nextval('products_seq'), 'Gentle foaming daily face wash for sensitive skin.', 12.0, 'skincare.jpg', 18.99, 'Gentle Foaming Daily Face Wash', 90, 16.71, 9, 2),

-- Category 10: Personal Care & Health
(nextval('products_seq'), 'Sonic electric toothbrush with 40000 VPM motor and 4 brush heads.', 15.0, 'electric_toothbrush.jpg', 39.99, 'Sonic Rechargeable Electric Toothbrush', 60, 33.99, 10, 2),
(nextval('products_seq'), '1875W ionic blow dryer with heat settings and diffuser attachment.', 10.0, 'electric_toothbrush.jpg', 49.99, 'Professional Ionic Hair Dryer', 40, 44.99, 10, 2),

-- Category 11: Sports & Outdoor
(nextval('products_seq'), 'Insulated stainless steel 32oz water bottle keeping drinks cold for 24h.', 10.0, 'water_bottle.jpg', 24.99, 'Insulated Stainless Steel Water Bottle 32oz', 100, 22.49, 11, 2),
(nextval('products_seq'), 'Lightweight camping backpack 40L with rain cover.', 15.0, 'water_bottle.jpg', 64.99, 'Waterproof Outdoor Camping Backpack 40L', 30, 55.24, 11, 2),

-- Category 12: Fitness & Exercise
(nextval('products_seq'), 'Extra thick non-slip eco-friendly TPE yoga mat with carrying strap.', 10.0, 'yoga_mat.jpg', 32.99, 'Non-Slip Eco-Friendly Yoga Mat', 80, 29.69, 12, 2),
(nextval('products_seq'), '5-level heavy duty workout resistance bands set with handles.', 20.0, 'yoga_mat.jpg', 27.99, 'Heavy Duty Workout Resistance Bands Set', 90, 22.39, 12, 2),

-- Category 13: Books & Media
(nextval('products_seq'), 'Inspirational hardcover personal growth novel by award-winning author.', 5.0, 'book.jpg', 21.99, 'Inspirational Bestseller Hardcover Novel', 50, 20.89, 13, 2),
(nextval('products_seq'), 'Mastering Software Architecture & Web Design comprehensive guide book.', 10.0, 'book.jpg', 39.99, 'Mastering Web Development & Architecture', 40, 35.99, 13, 2),

-- Category 14: Office & Stationery
(nextval('products_seq'), 'Executive 240-page bleed-proof hardcover lined journal notebook.', 5.0, 'journal.jpg', 18.99, 'Executive Hardcover Lined Journal Notebook', 100, 18.04, 14, 2),
(nextval('products_seq'), 'Refillable fine nib luxury fountain pen with ink converter.', 10.0, 'journal.jpg', 29.99, 'Fine Nib Luxury Fountain Pen Set', 50, 26.99, 14, 2),

-- Category 15: Toys & Gaming
(nextval('products_seq'), 'Tactical family strategy board game for 2 to 5 players.', 10.0, 'board_game.jpg', 44.99, 'Tactical Strategy Family Board Game', 35, 40.49, 15, 2),
(nextval('products_seq'), '1200-piece architectural building bricks set for adults and kids.', 15.0, 'board_game.jpg', 79.99, 'Architectural Building Bricks Set 1200 Pcs', 25, 67.99, 15, 2),

-- Category 16: Baby & Kids
(nextval('products_seq'), 'Lightweight folding baby stroller with sun canopy and storage basket.', 10.0, 'running_shoes.jpg', 129.99, 'Lightweight Folding Baby Stroller', 20, 116.99, 16, 2),
(nextval('products_seq'), 'Soft plush stuffed teddy bear toy for toddlers.', 15.0, 'running_shoes.jpg', 19.99, 'Plush Stuffed Teddy Bear Toy', 75, 16.99, 16, 2),

-- Category 17: Automotive & Bikes
(nextval('products_seq'), 'Complete car detailing and washing cleaning kit 10-piece.', 10.0, 'desk_lamp.jpg', 39.99, 'Complete Car Detailing & Cleaning Kit', 45, 35.99, 17, 2),
(nextval('products_seq'), 'Digital tire pressure gauge with illuminated LCD screen.', 5.0, 'desk_lamp.jpg', 16.99, 'Digital Tire Pressure Gauge 150 PSI', 80, 16.14, 17, 2),

-- Category 18: Jewelry & Watches
(nextval('products_seq'), 'Minimalist stainless steel analog quartz watch with mesh strap.', 10.0, 'watch.jpg', 109.99, 'Minimalist Stainless Steel Quartz Watch', 30, 98.99, 18, 2),
(nextval('products_seq'), 'Sterling silver pendant necklace with gift box.', 15.0, 'watch.jpg', 69.99, 'Sterling Silver Pendant Necklace', 40, 59.49, 18, 2),

-- Category 19: Luggage & Travel Bags
(nextval('products_seq'), 'Water-resistant laptop backpack 15.6-inch with USB charging port.', 10.0, 'backpack.jpg', 49.99, 'Water-Resistant Travel Laptop Backpack', 60, 44.99, 19, 2),
(nextval('products_seq'), 'Expandable hardside spinner carry-on luggage suitcase 20-inch.', 15.0, 'backpack.jpg', 89.99, 'Hardside Spinner Carry-On Luggage 20-Inch', 25, 76.49, 19, 2),

-- Category 20: Groceries & Gourmet
(nextval('products_seq'), 'Organic dark roast whole bean coffee 2lb bag.', 5.0, 'gourmet_coffee.jpg', 24.99, 'Organic Whole Bean Dark Roast Coffee 2lb', 100, 23.74, 20, 2),
(nextval('products_seq'), 'Artisanal dark chocolate bars gift box 6-pack.', 10.0, 'gourmet_coffee.jpg', 29.99, 'Artisanal Dark Chocolate Bars Box 6-Pack', 50, 26.99, 20, 2);
