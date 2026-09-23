const fs = require('fs');
const path = require('path');

// Curated Unsplash HD product images per item
const categoryImagePools = {
    1: [ // Electronics & Gadgets
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90",
        "https://images.unsplash.com/photo-1598331668826-20cecc596b86",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        "https://images.unsplash.com/photo-1622445268465-843d63d197db",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944"
    ],
    2: [ // Mobiles & Accessories
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0",
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505",
        "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa",
        "https://images.unsplash.com/photo-1609692814858-f7cd2f0afd1b",
        "https://images.unsplash.com/photo-1541877944-ac82a091518a",
        "https://images.unsplash.com/photo-1585060544812-6b45742d762f",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
        "https://images.unsplash.com/photo-1574944985070-8f30c4397e3c"
    ],
    3: [ // Computers & Laptops
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
        "https://images.unsplash.com/photo-1547082299-de196ea013d6",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
        "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"
    ],
    4: [ // Men's Fashion
        "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        "https://images.unsplash.com/photo-1617137968427-85924c800a22",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e",
        "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f"
    ],
    5: [ // Women's Fashion
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae",
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        "https://images.unsplash.com/photo-1475180098004-ca77a66827be"
    ],
    6: [ // Footwear & Shoes
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2",
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
        "https://images.unsplash.com/photo-1539185441755-769473a23570",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f",
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b",
        "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9"
    ],
    7: [ // Home & Kitchen
        "https://images.unsplash.com/photo-1517668808822-9e428824603b",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
        "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
        "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
        "https://images.unsplash.com/photo-1585515320310-259814833e62",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f",
        "https://images.unsplash.com/photo-1567016432779-094069958ea5",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92"
    ],
    8: [ // Furniture & Decor
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f",
        "https://images.unsplash.com/photo-1540518614846-7ede433c517a",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
    ],
    9: [ // Beauty & Skincare
        "https://images.unsplash.com/photo-1556228720-195a672e8a03",
        "https://images.unsplash.com/photo-1608248597262-83823932cf0b",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
        "https://images.unsplash.com/photo-1512290900673-7002b54173b4",
        "https://images.unsplash.com/photo-1567928269937-ae146e45b428",
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19",
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b"
    ],
    10: [ // Personal Care & Health
        "https://images.unsplash.com/photo-1559591937-e68fb3305e40",
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
        "https://images.unsplash.com/photo-1584017911766-d451b3d0e843",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        "https://images.unsplash.com/photo-1512290900673-7002b54173b4",
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982",
        "https://images.unsplash.com/photo-1583947581924-860bda6a26df"
    ],
    11: [ // Sports & Outdoor
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
        "https://images.unsplash.com/photo-1510312305653-8ed496efae75",
        "https://images.unsplash.com/photo-1530549387789-4c1017266635",
        "https://images.unsplash.com/photo-1517649763962-0c623266010b",
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
        "https://images.unsplash.com/photo-1519315901367-f34ff9154487",
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
    ],
    12: [ // Fitness & Exercise
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a",
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
        "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff",
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155",
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc"
    ],
    13: [ // Books & Media
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
        "https://images.unsplash.com/photo-1532012197267-da84d127e765",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73"
    ],
    14: [ // Office & Stationery
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd",
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634",
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338",
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
        "https://images.unsplash.com/photo-1517842645767-c639042777db",
        "https://images.unsplash.com/photo-1568871391149-419b4ddd5146",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
        "https://images.unsplash.com/photo-1520072959219-c595dc870360",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
    ],
    15: [ // Toys & Gaming
        "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09",
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
        "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd",
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f",
        "https://images.unsplash.com/photo-1558060370-d644479cb6f7",
        "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        "https://images.unsplash.com/photo-1592840062661-a5a7f78e30bf"
    ],
    16: [ // Baby & Kids
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
        "https://images.unsplash.com/photo-1519689680058-324335c77eba",
        "https://images.unsplash.com/photo-1543332164-6e82f355badc",
        "https://images.unsplash.com/photo-1584839627923-d58736c4d576",
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86"
    ],
    17: [ // Automotive & Bikes
        "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f",
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
        "https://images.unsplash.com/photo-1508974239320-0a029497e820",
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
        "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
    ],
    18: [ // Jewelry & Watches
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
        "https://images.unsplash.com/photo-1611591475179-4206014e7a68",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9",
        "https://images.unsplash.com/photo-1539185441755-769473a23570"
    ],
    19: [ // Luggage & Travel Bags
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        "https://images.unsplash.com/photo-1565026057447-ba90a3d07d67",
        "https://images.unsplash.com/photo-1544816155-12df9643f363",
        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
        "https://images.unsplash.com/photo-1577733966973-d680bffd2e80",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
        "https://images.unsplash.com/photo-1509762774944-e4b647913d5b",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        "https://images.unsplash.com/photo-1547949003-9792a18a2601",
        "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7"
    ],
    20: [ // Groceries & Gourmet
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
        "https://images.unsplash.com/photo-1471943311424-646960669fbc",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
        "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0",
        "https://images.unsplash.com/photo-1509358211425-24d08435f478",
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af"
    ]
};

const categories = [
    { id: 1, name: "Electronics & Gadgets", basePrice: 150, items: ["Wireless Noise-Canceling Headphones", "Bluetooth Portable Speaker", "4K Ultra HD Action Camera", "Smart Home Voice Assistant", "Noise-Isolating Earbuds", "High-Fidelity Audio Amplifier", "USB Condenser Microphone", "Streaming Capture Card", "Wireless Charging Pad", "Over-Ear Studio Headphones"] },
    { id: 2, name: "Mobiles & Accessories", basePrice: 400, items: ["Flagship 5G Smartphone 256GB", "Compact Smartphone 128GB", "20000mAh Fast Power Bank", "MagSafe Wireless Charger Stand", "Shockproof Armor Phone Case", "Tempered Glass Screen Protector", "Braided USB-C Fast Cable", "Magnetic Car Phone Mount", "Foldable Desktop Phone Stand", "Dual Port Wall Charger 65W"] },
    { id: 3, name: "Computers & Laptops", basePrice: 800, items: ["Ultra-Slim 14-Inch Laptop", "Gaming Laptop 15.6-Inch 144Hz", "RGB Mechanical Keyboard", "Ergonomic Wireless Mouse", "27-Inch 4K IPS Monitor", "USB-C Multiport Hub", "External SSD 1TB Portable", "HD Web Camera with Mic", "Adjustable Laptop Cooling Pad", "Ergonomic Vertical Mouse"] },
    { id: 4, name: "Men's Fashion", basePrice: 60, items: ["Classic Vintage Denim Jacket", "Fleece Pullover Hoodie", "Slim-Fit Casual Button-Down Shirt", "Chino Stretch Trousers", "Heavyweight Cotton Crewneck T-Shirt", "Leather Biker Jacket", "Windproof Outdoor Parka", "Tailored Wool Blend Blazer", "Thermal Winter Sweatshirt", "Ribbed Knit Beanie Hat"] },
    { id: 5, name: "Women's Fashion", basePrice: 65, items: ["Floral Summer Maxi Dress", "Casual Open-Front Cardigan", "High-Waisted Stretch Leggings", "Classic Trench Coat", "Satin V-Neck Blouse", "A-Line Evening Cocktail Dress", "Ribbed Knit Sweater", "Denim Jacket with Shearling Collar", "Wide-Leg Linen Pants", "Plaid Wool Overcoat"] },
    { id: 6, name: "Footwear & Shoes", basePrice: 90, items: ["Lightweight Mesh Running Shoes", "Classic Low-Top Canvas Sneakers", "Leather Formal Oxford Shoes", "Trail Running Hiking Boots", "Slip-On Memory Foam Loafers", "Chunky Athletic Trainers", "Waterproof Outdoor Hiking Shoes", "Comfortable House Slippers", "Casual High-Top Sneakers", "Cushioned Walking Shoes"] },
    { id: 7, name: "Home & Kitchen", basePrice: 80, items: ["Programmable Drip Coffee Maker", "Digital Air Fryer XL 5.8 Qt", "1200W High-Speed Countertop Blender", "Stainless Steel Electric Kettle", "Nonstick Cookware Set 10-Pcs", "Robot Vacuum Cleaner with Wi-Fi", "Cast Iron Dutch Oven 6 Qt", "Touchless Sensor Trash Can", "Food Dehydrator & Jerky Maker", "Digital Kitchen Scale"] },
    { id: 8, name: "Furniture & Decor", basePrice: 50, items: ["Dimmable LED Architect Desk Lamp", "Memory Foam Seat Cushion", "Ergonomic Mesh Office Chair", "Floating Wall Shelves Set", "Minimalist Modern End Table", "Adjustable Standing Desk Converter", "Velvet Accent Throw Pillow Set", "Bohemian Woven Area Rug", "Full-Length Standing Mirror", "Soft Warm Fleece Blanket"] },
    { id: 9, name: "Beauty & Skincare", basePrice: 35, items: ["Daily Hydrating Skincare Set", "Gentle Foaming Daily Face Wash", "Vitamin C Brightening Serum", "Hyaluronic Acid Moisture Cream", "Purifying Clay Facial Mask", "SPF 50 Sunscreen Lotion", "Exfoliating Scrub Cleanser", "Hydrating Eye Serum", "Nourishing Night Face Oil", "Soothing Aloe Vera Gel"] },
    { id: 10, name: "Personal Care & Health", basePrice: 45, items: ["Sonic Rechargeable Electric Toothbrush", "Professional 1875W Ionic Hair Dryer", "Cordless Water Dental Flosser", "Electric Hair & Beard Trimmer", "Infrared Forehead Thermometer", "Deep Tissue Muscle Massage Gun", "Adjustable Posture Corrector", "Electric Heating Pad for Back", "Finger Pulse Oximeter", "Foot Massager Spa with Heat"] },
    { id: 11, name: "Sports & Outdoor", basePrice: 30, items: ["Insulated Stainless Water Bottle 32oz", "Waterproof Camping Backpack 40L", "Lightweight 2-Person Camping Tent", "Compact Sleeping Bag 3-Season", "Trekking Poles Aluminum Pair", "LED Rechargeable Headlamp", "Portable Outdoor Hammock", "Foldable Camping Chair", "Insulated Cooler Bag 24-Can", "Bike Helmet with Rear Light"] },
    { id: 12, name: "Fitness & Exercise", basePrice: 35, items: ["Non-Slip Eco-Friendly Yoga Mat", "Heavy Duty Resistance Bands Set", "Adjustable Dumbbell Set 50lbs", "Speed Jump Rope with Ball Bearings", "High-Density Foam Roller", "Ab Roller Wheel with Knee Pad", "Kettlebell Weight 20lbs", "Grip Strength Trainer", "Pull-Up Bar Doorway Trainer", "Weighted Exercise Vest 12lbs"] },
    { id: 13, name: "Books & Media", basePrice: 22, items: ["Inspirational Bestseller Hardcover Novel", "Mastering Web Development & Architecture", "The Art of Financial Freedom Hardcover", "Mindfulness & Daily Productivity Journal", "History of World Civilizations Book", "Data Science & AI Principles", "Creative Writing Mastery Guide", "Classic Fiction Anthology Collection", "Psychology of Human Behavior", "Cookbook 100 Healthy Recipes"] },
    { id: 14, name: "Office & Stationery", basePrice: 20, items: ["Executive Hardcover Lined Journal", "Fine Nib Luxury Fountain Pen Set", "Bamboo Desktop Storage Organizer", "Dual-Tip Brush Art Markers 36-Pack", "Ergonomic Gel Wrist Rest Pad", "Heavy Duty Stapler with Staples", "Weekly Planner Notepad Desk Pad", "Document Organizer Expanding File", "Desk Cable Management Clips", "Metal Mesh Desk Accessories Set"] },
    { id: 15, name: "Toys & Gaming", basePrice: 40, items: ["Tactical Strategy Family Board Game", "Architectural Building Bricks Set 1200 Pcs", "High-Speed RC Monster Truck 1:16", "1000-Piece Landscape Jigsaw Puzzle", "Collectible Superhero Action Figure", "Wooden Chess & Checkers Set", "Remote Control Quadcopter Drone", "Interactive Robot Toy for Kids", "Magnetic Tiles Building Set", "Classic Card Game Party Pack"] },
    { id: 16, name: "Baby & Kids", basePrice: 50, items: ["Lightweight Folding Baby Stroller", "Plush Soft Stuffed Teddy Bear Toy", "Ergonomic Baby Carrier Ergonomic", "Infant Convertible Car Seat", "Baby Sound Machine & Night Light", "Silicone Suction Baby Plate Set", "Soft Cotton Baby Blankets 3-Pack", "Wooden Activity Cube Toy", "Baby Bath Tub Support Seat", "Kids Digital Camera Toy"] },
    { id: 17, name: "Automotive & Bikes", basePrice: 35, items: ["Complete Car Detailing & Cleaning Kit", "Digital Tire Pressure Gauge 150 PSI", "12V Car Vacuum Cleaner Portable", "Car Dashboard Phone Mount", "Bluetooth FM Transmitter Car Adapter", "Emergency Car Jump Starter 2000A", "High-Vis Cycling Helmet", "Heavy Duty Bike Lock Cable", "Car Trunk Organizer Collapsible", "Microfiber Towels Pack of 12"] },
    { id: 18, name: "Jewelry & Watches", basePrice: 85, items: ["Minimalist Stainless Steel Quartz Watch", "Sterling Silver Pendant Necklace", "Classic Leather Strap Analog Watch", "Crystal Drop Earrings Pair", "Titanium Men's Band Ring", "Gold Plated Cuff Bracelet", "Vintage Automatic Mechanical Watch", "Pearl Stud Earrings 8mm", "Stainless Steel Mesh Watch Strap", "Jewelry Travel Organizer Case"] },
    { id: 19, name: "Luggage & Travel Bags", basePrice: 55, items: ["Water-Resistant Travel Laptop Backpack", "Hardside Spinner Carry-On Luggage 20\"", "Expandable Travel Duffel Bag", "TSA Approved Travel Compression Cubes", "Leather Passort Holder Cover", "Ergonomic Neck Memory Foam Pillow", "Hanging Toiletry Bag Organizer", "Underseat Rolling Suitcase", "Anti-Theft Travel Backpack", "Foldable Lightweight Daypack"] },
    { id: 20, name: "Groceries & Gourmet", basePrice: 25, items: ["Organic Whole Bean Dark Roast Coffee 2lb", "Artisanal Dark Chocolate Bars Box 6-Pack", "Extra Virgin Cold Pressed Olive Oil 1L", "Raw Organic Wildflower Honey 16oz", "Gourmet Whole Leaf Green Tea Tin", "Premium Assorted Roasted Nuts 32oz", "Organic Grade A Maple Syrup 32oz", "Matcha Green Tea Powder Organic", "Imported Italian Balsamic Vinegar", "Gourmet Spice Rack Set 12 Jars"] }
];

let sql = `-- Seed 600 products with unique HD Unsplash photos\nDELETE FROM products;\n\nINSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id, seller_id) VALUES\n`;

const rows = [];

categories.forEach(cat => {
    const pool = categoryImagePools[cat.id];
    for (let i = 1; i <= 30; i++) {
        const itemIndex = (i - 1) % cat.items.length;
        const itemTemplate = cat.items[itemIndex];
        const name = i <= cat.items.length ? itemTemplate : `${itemTemplate} (Edition ${Math.ceil(i / cat.items.length)})`;
        const desc = `Premium quality ${name.toLowerCase()} featuring sleek design, top-tier materials, and exceptional durability for modern everyday use.`;
        
        const priceVariation = ((i * 11) % 45) - 15;
        const price = Math.round((cat.basePrice + priceVariation) * 100) / 100;
        const discounts = [0, 5, 10, 15, 20];
        const discount = discounts[i % discounts.length];
        const specialPrice = Math.round((price - (price * discount / 100.0)) * 100) / 100;
        const quantity = 20 + ((i * 7) % 80);

        // Pick distinct Unsplash photo URL per item + variation
        const baseUnsplashUrl = pool[(i - 1) % pool.length];
        const imageUrl = `${baseUnsplashUrl}?w=600&auto=format&fit=crop&q=80`;

        const escapedName = name.replace(/'/g, "''");
        const escapedDesc = desc.replace(/'/g, "''");

        rows.push(`(nextval('products_seq'), '${escapedDesc}', ${discount}.0, '${imageUrl}', ${price}, '${escapedName}', ${quantity}, ${specialPrice}, ${cat.id}, 2)`);
    }
});

sql += rows.join(',\n') + ';\n';

fs.writeFileSync(path.join(__dirname, 'seed_600_products_unsplash.sql'), sql, 'utf8');
console.log(`Generated seed_600_products_unsplash.sql with ${rows.length} products having unique Unsplash photo URLs!`);
