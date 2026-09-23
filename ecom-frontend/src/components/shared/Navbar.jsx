import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore, FaCompass, FaPhoneAlt, FaInfoCircle, FaBoxOpen } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);
    
    // Hide main storefront navbar inside Admin Console / Seller Portal
    if (path.startsWith("/admin")) {
        return null;
    }

    const totalCartItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 h-[76px] flex items-center justify-between">
                
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/25 group-hover:scale-105 transition-transform duration-300">
                        <FaStore className="text-xl" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                            Shop<span className="text-indigo-600">Verse</span>
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase -mt-1">
                            Premium Shopping
                        </span>
                    </div>
                </Link>

                {/* Desktop & Mobile Navigation Links */}
                <nav className={`flex sm:gap-6 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[76px] ${
                    navbarOpen ? "h-auto py-6 px-6 bg-white border-b border-slate-200 shadow-lg" : "h-0 overflow-hidden sm:h-auto sm:overflow-visible"
                } transition-all duration-300 sm:w-auto w-full sm:flex-row flex-col`}>
                    
                    <Link 
                        to="/" 
                        onClick={() => setNavbarOpen(false)}
                        className={`flex items-center gap-2.5 text-base font-extrabold transition-all duration-200 py-2 px-3.5 rounded-xl ${
                            path === "/" 
                                ? "text-indigo-600 bg-indigo-50/80 border border-indigo-100/80 shadow-2xs" 
                                : "text-slate-800 hover:text-indigo-600 hover:bg-slate-50"
                        }`}
                    >
                        <FaCompass className="text-sm" />
                        <span>Home</span>
                    </Link>

                    <Link 
                        to="/products" 
                        onClick={() => setNavbarOpen(false)}
                        className={`flex items-center gap-2.5 text-base font-extrabold transition-all duration-200 py-2 px-3.5 rounded-xl ${
                            path === "/products" 
                                ? "text-indigo-600 bg-indigo-50/80 border border-indigo-100/80 shadow-2xs" 
                                : "text-slate-800 hover:text-indigo-600 hover:bg-slate-50"
                        }`}
                    >
                        <FaBoxOpen className="text-sm" />
                        <span>Catalog</span>
                    </Link>

                    <Link 
                        to="/about" 
                        onClick={() => setNavbarOpen(false)}
                        className={`flex items-center gap-2.5 text-base font-extrabold transition-all duration-200 py-2 px-3.5 rounded-xl ${
                            path === "/about" 
                                ? "text-indigo-600 bg-indigo-50/80 border border-indigo-100/80 shadow-2xs" 
                                : "text-slate-800 hover:text-indigo-600 hover:bg-slate-50"
                        }`}
                    >
                        <FaInfoCircle className="text-sm" />
                        <span>About</span>
                    </Link>

                    <Link 
                        to="/contact" 
                        onClick={() => setNavbarOpen(false)}
                        className={`flex items-center gap-2.5 text-base font-extrabold transition-all duration-200 py-2 px-3.5 rounded-xl ${
                            path === "/contact" 
                                ? "text-indigo-600 bg-indigo-50/80 border border-indigo-100/80 shadow-2xs" 
                                : "text-slate-800 hover:text-indigo-600 hover:bg-slate-50"
                        }`}
                    >
                        <FaPhoneAlt className="text-sm" />
                        <span>Contact</span>
                    </Link>

                    {/* Cart Icon Link */}
                    <Link 
                        to="/cart" 
                        onClick={() => setNavbarOpen(false)}
                        className={`flex items-center gap-2.5 text-base font-extrabold transition-all duration-200 py-2 px-3.5 rounded-xl relative ${
                            path === "/cart" 
                                ? "text-indigo-600 bg-indigo-50/80 border border-indigo-100/80 shadow-2xs" 
                                : "text-slate-800 hover:text-indigo-600 hover:bg-slate-50"
                        }`}
                    >
                        <Badge
                            badgeContent={totalCartItems}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: '#ef4444',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                }
                            }}
                        >
                            <FaShoppingCart className="text-xl" />
                        </Badge>
                        <span className="ml-1">Cart</span>
                    </Link>

                    {/* Auth Action */}
                    {(user && user.id) ? (
                        <div className="pt-2 sm:pt-0">
                            <UserMenu />
                        </div>
                    ) : (
                        <Link 
                            to="/login"
                            onClick={() => setNavbarOpen(false)}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-md shadow-indigo-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <FaSignInAlt />
                            <span>Sign In</span>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="sm:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 focus:outline-none"
                    aria-label="Toggle Navigation Menu"
                >
                    {navbarOpen ? <RxCross2 className="text-2xl" /> : <IoIosMenu className="text-2xl" />}
                </button>

            </div>
        </header>
    );
};

export default Navbar;