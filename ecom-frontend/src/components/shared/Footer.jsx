import { FaStore, FaHeart, FaShieldAlt, FaCcVisa, FaCcMastercard, FaCcStripe, FaCcPaypal, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();

    // Hide main storefront footer inside Admin Console / Seller Portal
    if (location.pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-20 pt-16 pb-8 text-slate-400">
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 space-y-12">
                
                {/* Main Footer Links & Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    
                    {/* Brand Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                                <FaStore className="text-xl" />
                            </div>
                            <span className="text-2xl font-extrabold text-white tracking-tight">
                                Shop<span className="text-indigo-400">Verse</span>
                            </span>
                        </Link>
                        
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Your destination for premium electronics, fashion, and everyday essentials. Delivered fast, backed by official warranty and 24/7 dedicated support.
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors">
                                <FaGithub />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home Overview</Link></li>
                            <li><Link to="/products" className="hover:text-indigo-400 transition-colors">All Products</Link></li>
                            <li><Link to="/cart" className="hover:text-indigo-400 transition-colors">View Cart</Link></li>
                            <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About ShopVerse</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Customer Contact</Link></li>
                        </ul>
                    </div>

                    {/* Account Links */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Account & Help</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/profile" className="hover:text-indigo-400 transition-colors">User Profile</Link></li>
                            <li><Link to="/orders" className="hover:text-indigo-400 transition-colors">Order History</Link></li>
                            <li><Link to="/profile/addresses" className="hover:text-indigo-400 transition-colors">Saved Addresses</Link></li>
                            <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Account Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Trust & Payments */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Buyer Protection</h4>
                        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                                <FaShieldAlt className="text-sm" />
                                <span>SSL Encrypted Checkout</span>
                            </div>
                            <p className="text-xs text-slate-400">
                                100% money back guarantee on non-delivered or damaged items.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Payment Badges */}
                <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <p className="flex items-center gap-1">
                        © {new Date().getFullYear()} ShopVerse E-Commerce Inc. Crafted with <FaHeart className="text-red-500" /> for shoppers worldwide.
                    </p>

                    <div className="flex items-center gap-4 text-2xl text-slate-400">
                        <FaCcVisa className="hover:text-white transition-colors" />
                        <FaCcMastercard className="hover:text-white transition-colors" />
                        <FaCcStripe className="hover:text-white transition-colors" />
                        <FaCcPaypal className="hover:text-white transition-colors" />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
