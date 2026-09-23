const fs = require('fs');
const path = require('path');

const categories = [
    { id: 1, name: "Electronics & Gadgets", img: "headphones.jpg", basePrice: 150, items: ["Wireless Noise-Canceling Headphones", "Bluetooth Portable Speaker", "4K Ultra HD Action Camera", "Smart Home Voice Assistant", "Noise-Isolating Earbuds", "High-Fidelity Audio Amplifier", "USB Condenser Microphone", "Streaming Capture Card", "Wireless Charging Pad", "Over-Ear Studio Headphones"] },
    { id: 2, name: "Mobiles & Accessories", img: "smartphone.jpg", basePrice: 400, items: ["Flagship 5G Smartphone 256GB", "Compact Smartphone 128GB", "20000mAh Fast Power Bank", "MagSafe Wireless Charger Stand", "Shockproof Armor Phone Case", "Tempered Glass Screen Protector", "Braided USB-C Fast Cable", "Magnetic Car Phone Mount", "Foldable Desktop Phone Stand", "Dual Port Wall Charger 65W"] },
    { id: 3, name: "Computers & Laptops", img: "laptop.jpg", basePrice: 800, items: ["Ultra-Slim 14-Inch Laptop", "Gaming Laptop 15.6-Inch 144Hz", "RGB Mechanical Keyboard", "Ergonomic Wireless Mouse", "27-Inch 4K IPS Monitor", "USB-C Multiport Hub", "External SSD 1TB Portable", "HD Web Camera with Mic", "Adjustable Laptop Cooling Pad", "Ergonomic Vertical Mouse"] },
    { id: 4, name: "Men's Fashion", img: "mens_jacket.jpg", basePrice: 60, items: ["Classic Vintage Denim Jacket", "Fleece Pullover Hoodie", "Slim-Fit Casual Button-Down Shirt", "Chino Stretch Trousers", "Heavyweight Cotton Crewneck T-Shirt", "Leather Biker Jacket", "Windproof Outdoor Parka", "Tailored Wool Blend Blazer", "Thermal Winter Sweatshirt", "Ribbed Knit Beanie Hat"] },
    { id: 5, name: "Women's Fashion", img: "womens_dress.jpg", basePrice: 65, items: ["Floral Summer Maxi Dress", "Casual Open-Front Cardigan", "High-Waisted Stretch Leggings", "Classic Trench Coat", "Satin V-Neck Blouse", "A-Line Evening Cocktail Dress", "Ribbed Knit Sweater", "Denim Jacket with Shearling Collar", "Wide-Leg Linen Pants", "Plaid Wool Overcoat"] },
    { id: 6, name: "Footwear & Shoes", img: "running_shoes.jpg", basePrice: 90, items: ["Lightweight Mesh Running Shoes", "Classic Low-Top Canvas Sneakers", "Leather Formal Oxford Shoes", "Trail Running Hiking Boots", "Slip-On Memory Foam Loafers", "Chunky Athletic Trainers", "Waterproof Outdoor Hiking Shoes", "Comfortable House Slippers", "Casual High-Top Sneakers", "Cushioned Walking Shoes"] },
    { id: 7, name: "Home & Kitchen", img: "coffee_maker.jpg", basePrice: 80, items: ["Programmable Drip Coffee Maker", "Digital Air Fryer XL 5.8 Qt", "1200W High-Speed Countertop Blender", "Stainless Steel Electric Kettle", "Nonstick Cookware Set 10-Pcs", "Robot Vacuum Cleaner with Wi-Fi", "Cast Iron Dutch Oven 6 Qt", "Touchless Sensor Trash Can", "Food Dehydrator & Jerky Maker", "Digital Kitchen Scale"] },
    { id: 8, name: "Furniture & Decor", img: "desk_lamp.jpg", basePrice: 50, items: ["Dimmable LED Architect Desk Lamp", "Memory Foam Seat Cushion", "Ergonomic Mesh Office Chair", "Floating Wall Shelves Set", "Minimalist Modern End Table", "Adjustable Standing Desk Converter", "Velvet Accent Throw Pillow Set", "Bohemian Woven Area Rug", "Full-Length Standing Mirror", "Soft Warm Fleece Blanket"] },
    { id: 9, name: "Beauty & Skincare", img: "skincare.jpg", basePrice: 35, items: ["Daily Hydrating Skincare Set", "Gentle Foaming Daily Face Wash", "Vitamin C Brightening Serum", "Hyaluronic Acid Moisture Cream", "Purifying Clay Facial Mask", "SPF 50 Sunscreen Lotion", "Exfoliating Scrub Cleanser", "Hydrating Eye Serum", "Nourishing Night Face Oil", "Soothing Aloe Vera Gel"] },
    { id: 10, name: "Personal Care & Health", img: "electric_toothbrush.jpg", basePrice: 45, items: ["Sonic Rechargeable Electric Toothbrush", "Professional 1875W Ionic Hair Dryer", "Cordless Water Dental Flosser", "Electric Hair & Beard Trimmer", "Infrared Forehead Thermometer", "Deep Tissue Muscle Massage Gun", "Adjustable Posture Corrector", "Electric Heating Pad for Back", "Finger Pulse Oximeter", "Foot Massager Spa with Heat"] },
    { id: 11, name: "Sports & Outdoor", img: "water_bottle.jpg", basePrice: 30, items: ["Insulated Stainless Water Bottle 32oz", "Waterproof Camping Backpack 40L", "Lightweight 2-Person Camping Tent", "Compact Sleeping Bag 3-Season", "Trekking Poles Aluminum Pair", "LED Rechargeable Headlamp", "Portable Outdoor Hammock", "Foldable Camping Chair", "Insulated Cooler Bag 24-Can", "Bike Helmet with Rear Light"] },
    { id: 12, name: "Fitness & Exercise", img: "yoga_mat.jpg", basePrice: 35, items: ["Non-Slip Eco-Friendly Yoga Mat", "Heavy Duty Resistance Bands Set", "Adjustable Dumbbell Set 50lbs", "Speed Jump Rope with Ball Bearings", "High-Density Foam Roller", "Ab Roller Wheel with Knee Pad", "Kettlebell Weight 20lbs", "Grip Strength Trainer", "Pull-Up Bar Doorway Trainer", "Weighted Exercise Vest 12lbs"] },
    { id: 13, name: "Books & Media", img: "book.jpg", basePrice: 22, items: ["Inspirational Bestseller Hardcover Novel", "Mastering Web Development & Architecture", "The Art of Financial Freedom Hardcover", "Mindfulness & Daily Productivity Journal", "History of World Civilizations Book", "Data Science & AI Principles", "Creative Writing Mastery Guide", "Classic Fiction Anthology Collection", "Psychology of Human Behavior", "Cookbook 100 Healthy Recipes"] },
    { id: 14, name: "Office & Stationery", img: "journal.jpg", basePrice: 20, items: ["Executive Hardcover Lined Journal", "Fine Nib Luxury Fountain Pen Set", "Bamboo Desktop Storage Organizer", "Dual-Tip Brush Art Markers 36-Pack", "Ergonomic Gel Wrist Rest Pad", "Heavy Duty Stapler with Staples", "Weekly Planner Notepad Desk Pad", "Document Organizer Expanding File", "Desk Cable Management Clips", "Metal Mesh Desk Accessories Set"] },
    { id: 15, name: "Toys & Gaming", img: "board_game.jpg", basePrice: 40, items: ["Tactical Strategy Family Board Game", "Architectural Building Bricks Set 1200 Pcs", "High-Speed RC Monster Truck 1:16", "1000-Piece Landscape Jigsaw Puzzle", "Collectible Superhero Action Figure", "Wooden Chess & Checkers Set", "Remote Control Quadcopter Drone", "Interactive Robot Toy for Kids", "Magnetic Tiles Building Set", "Classic Card Game Party Pack"] },
    { id: 16, name: "Baby & Kids", img: "running_shoes.jpg", basePrice: 50, items: ["Lightweight Folding Baby Stroller", "Plush Soft Stuffed Teddy Bear Toy", "Ergonomic Baby Carrier Ergonomic", "Infant Convertible Car Seat", "Baby Sound Machine & Night Light", "Silicone Suction Baby Plate Set", "Soft Cotton Baby Blankets 3-Pack", "Wooden Activity Cube Toy", "Baby Bath Tub Support Seat", "Kids Digital Camera Toy"] },
    { id: 17, name: "Automotive & Bikes", img: "car_wash.jpg", basePrice: 35, items: ["Complete Car Detailing & Cleaning Kit", "Digital Tire Pressure Gauge 150 PSI", "12V Car Vacuum Cleaner Portable", "Car Dashboard Phone Mount", "Bluetooth FM Transmitter Car Adapter", "Emergency Car Jump Starter 2000A", "High-Vis Cycling Helmet", "Heavy Duty Bike Lock Cable", "Car Trunk Organizer Collapsible", "Microfiber Towels Pack of 12"] },
    { id: 18, name: "Jewelry & Watches", img: "watch.jpg", basePrice: 85, items: ["Minimalist Stainless Steel Quartz Watch", "Sterling Silver Pendant Necklace", "Classic Leather Strap Analog Watch", "Crystal Drop Earrings Pair", "Titanium Men's Band Ring", "Gold Plated Cuff Bracelet", "Vintage Automatic Mechanical Watch", "Pearl Stud Earrings 8mm", "Stainless Steel Mesh Watch Strap", "Jewelry Travel Organizer Case"] },
    { id: 19, name: "Luggage & Travel Bags", img: "backpack.jpg", basePrice: 55, items: ["Water-Resistant Travel Laptop Backpack", "Hardside Spinner Carry-On Luggage 20\"", "Expandable Travel Duffel Bag", "TSA Approved Travel Compression Cubes", "Leather Passort Holder Cover", "Ergonomic Neck Memory Foam Pillow", "Hanging Toiletry Bag Organizer", "Underseat Rolling Suitcase", "Anti-Theft Travel Backpack", "Foldable Lightweight Daypack"] },
    { id: 20, name: "Groceries & Gourmet", img: "gourmet_coffee.jpg", basePrice: 25, items: ["Organic Whole Bean Dark Roast Coffee 2lb", "Artisanal Dark Chocolate Bars Box 6-Pack", "Extra Virgin Cold Pressed Olive Oil 1L", "Raw Organic Wildflower Honey 16oz", "Gourmet Whole Leaf Green Tea Tin", "Premium Assorted Roasted Nuts 32oz", "Organic Grade A Maple Syrup 32oz", "Matcha Green Tea Powder Organic", "Imported Italian Balsamic Vinegar", "Gourmet Spice Rack Set 12 Jars"] }
];

let sql = `-- Seed 600 products (30 products for each of the 20 categories)\nDELETE FROM products;\n\nINSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id, seller_id) VALUES\n`;

const rows = [];

categories.forEach(cat => {
    for (let i = 1; i <= 30; i++) {
        const itemTemplate = cat.items[(i - 1) % cat.items.length];
        const name = i <= cat.items.length ? itemTemplate : `${itemTemplate} (Model ${Math.ceil(i / cat.items.length)})`;
        const desc = `High quality premium ${name.toLowerCase()} designed for maximum performance, reliability, and everyday style. Perfect choice for home, office, and travel.`;
        
        // Vary prices realistically
        const priceVariation = ((i * 7) % 50) - 20; // -20 to +30
        const rawPrice = Math.max(12.99, (cat.basePrice + priceVariation));
        const price = Math.round(rawPrice * 100) / 100;
        
        const discounts = [0, 5, 10, 12, 15, 20];
        const discount = discounts[i % discounts.length];
        
        const specialPrice = Math.round((price - (price * discount / 100.0)) * 100) / 100;
        const quantity = 15 + ((i * 13) % 85); // 15 to 100 stock
        const image = cat.img;

        // Escape single quotes for SQL
        const escapedName = name.replace(/'/g, "''");
        const escapedDesc = desc.replace(/'/g, "''");

        rows.push(`(nextval('products_seq'), '${escapedDesc}', ${discount}.0, '${image}', ${price}, '${escapedName}', ${quantity}, ${specialPrice}, ${cat.id}, 2)`);
    }
});

sql += rows.join(',\n') + ';\n';

fs.writeFileSync(path.join(__dirname, 'seed_600_products.sql'), sql, 'utf8');
console.log(`Generated seed_600_products.sql with ${rows.length} products!`);
