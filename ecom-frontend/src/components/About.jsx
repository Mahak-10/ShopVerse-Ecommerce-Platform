import { FaCheckCircle, FaGlobe, FaRocket, FaShieldAlt, FaUsers, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductCard from "./shared/ProductCard";

const featuredProducts = [
    {
        productId: "about-p1",
        productName: "iPhone 15 Pro Max Titanium",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
        description: "Forged in aerospace-grade titanium with A17 Pro chip and revolutionary camera system.",
        specialPrice: 1199,
        price: 1299,
        discount: 8,
        quantity: 50
    },
    {
        productId: "about-p2",
        productName: "Sony WH-1000XM5 Wireless",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
        description: "Industry-leading noise canceling headphones with dual processors and 8 microphones.",
        specialPrice: 349,
        price: 399,
        discount: 12,
        quantity: 35
    },
    {
        productId: "about-p3",
        productName: "MacBook Pro 16\" M3 Max",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
        description: "Mind-blowing M3 Max performance, Liquid Retina XDR display, up to 22 hours battery life.",
        specialPrice: 2399,
        price: 2499,
        discount: 4,
        quantity: 20
    },
    {
        productId: "about-p4",
        productName: "Apple Watch Ultra 2",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
        description: "The ultimate sports and adventure watch with 3000-nit display and dual-frequency GPS.",
        specialPrice: 749,
        price: 799,
        discount: 6,
        quantity: 40
    }
];

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-16">
            
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-8 sm:p-14 text-white shadow-xl">
                <div className="max-w-3xl space-y-4 relative z-10">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                        <FaRocket />
                        <span>About ShopVerse India</span>
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                        Redefining Commercial E-Commerce <br />
                        <span className="text-indigo-400">With Next-Gen Experience</span>
                    </h1>
                    <p className="text-slate-200 text-base leading-relaxed">
                        At ShopVerse India, we believe shopping should be effortless, inspiring, and completely secure. Headquartered in Gurugram with operations across 500+ Indian cities, our platform connects shoppers with top-tier electronics, fashion, and tech accessories backed by express shipping and GST invoice support.
                    </p>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <h3 className="text-3xl font-extrabold text-indigo-600">500K+</h3>
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Indian Shoppers</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <h3 className="text-3xl font-extrabold text-indigo-600">28+</h3>
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">States & UTs Covered</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <h3 className="text-3xl font-extrabold text-emerald-600">99.9%</h3>
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">On-Time Shipping</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <h3 className="text-3xl font-extrabold text-purple-600">24/7</h3>
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Pan-India Support</p>
                </div>
            </div>

            {/* Brand Story & HQ Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-2">
                        <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">Our Standards & Quality</span>
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            100% Authentic Brand Warranties & GST Invoicing
                        </h2>
                    </div>

                    <p className="text-slate-600 text-base leading-relaxed">
                        We partner directly with official brand distributors across India to provide genuine products with official manufacturer warranties, seamless returns, and GST credit invoicing for business orders.
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">100% Certified Authentic</h4>
                                <p className="text-slate-500 text-xs">Direct brand warranties and certified serial verification.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Express Shipping Across India</h4>
                                <p className="text-slate-500 text-xs">Fulfillment centers in Gurugram, Mumbai, Bengaluru & Kolkata.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">UPI, NetBanking & COD Payments</h4>
                                <p className="text-slate-500 text-xs">Secure payments via Razorpay, UPI, Cards, and Cash on Delivery.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6">
                    <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                        <img 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80" 
                            alt="ShopVerse India HQ Cyber City" 
                            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8 text-white">
                            <div>
                                <h4 className="text-xl font-bold">ShopVerse India Corporate Hub</h4>
                                <p className="text-xs text-slate-300">Cyber City, Gurugram, Haryana</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flagship Featured Products */}
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
                    <div>
                        <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">Top Selling Tech</span>
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            Our Flagship <span className="text-indigo-600">Collection</span>
                        </h2>
                    </div>
                    <Link to="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
                        View Entire Catalog →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((item) => (
                        <ProductCard key={item.productId} {...item} />
                    ))}
                </div>
            </div>

            {/* Corporate Indian Address Info */}
            <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg">
                            <FaMapMarkerAlt />
                        </div>
                        <h4 className="font-bold text-lg text-white">India Corporate Headquarters</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            ShopVerse Technologies India Pvt. Ltd.<br />
                            Building 7, Cyber City, DLF Phase 2<br />
                            Sector 24, Gurugram, Haryana 122002, India
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg">
                            <FaEnvelope />
                        </div>
                        <h4 className="font-bold text-lg text-white">Official Email Help</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Customer Care: support@shopverse.in<br />
                            GST & Corporate Orders: b2b@shopverse.in<br />
                            Press & Media: press@shopverse.in
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-400 text-lg">
                            <FaPhone />
                        </div>
                        <h4 className="font-bold text-lg text-white">Indian Helplines</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Toll-Free (India): 1800-123-4567<br />
                            Landline: +91 (080) 4567-8900<br />
                            Mon - Sun: 9:00 AM - 9:00 PM IST
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default About;