import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle, FaTruck, FaShieldAlt, FaUndo, FaHeadset, FaFire, FaArrowRight, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 space-y-16 py-4">
            
            {/* Hero Banner Section */}
            <HeroBanner />

            {/* Trust Badges / Commercial Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white p-5 rounded-2xl flex items-center gap-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xl shrink-0">
                        <FaTruck />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">Free Express Shipping</h4>
                        <p className="text-slate-500 text-xs mt-0.5">On orders over $50</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl flex items-center gap-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-xl shrink-0">
                        <FaShieldAlt />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">100% Secure Checkout</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Stripe & COD Protection</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl flex items-center gap-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-xl shrink-0">
                        <FaUndo />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">30 Days Return</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Hassle-free guarantee</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl flex items-center gap-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 text-xl shrink-0">
                        <FaHeadset />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">24/7 Support</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Dedicated customer team</p>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                            <FaFire className="text-red-500" />
                            <span>Trending Collection</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Featured <span className="text-indigo-600">Products</span>
                        </h2>
                    </div>
                    
                    <Link 
                        to="/products"
                        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors group"
                    >
                        <span>Explore Full Catalog</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isLoading ? (
                    <Loader />
                ) : errorMessage ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-3">
                        <FaExclamationTriangle className="text-amber-500 text-4xl" />
                        <span className="text-slate-700 text-base font-medium">{errorMessage}</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {products && products.slice(0, 8).map((item, i) => (
                            <ProductCard key={item.productId || i} {...item} />
                        ))}
                    </div>
                )}
            </section>

            {/* Commercial Promotion Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 p-8 sm:p-12 text-white shadow-xl">
                <div className="max-w-2xl space-y-4 relative z-10">
                    <span className="bg-white/20 backdrop-blur-md text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        Special Offer
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                        Upgrade Your Electronics & Tech <br />
                        <span className="text-indigo-300">With Flash Discounts</span>
                    </h3>
                    <p className="text-slate-200 text-sm leading-relaxed">
                        Enjoy exclusive savings across premium headphones, smartwatches, wireless speakers, and computer accessories. Offer valid while stocks last!
                    </p>
                    <div className="pt-2">
                        <Link 
                            to="/products"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-indigo-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg hover:scale-105"
                        >
                            <span>Browse Deals</span>
                            <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs text-center space-y-6 max-w-4xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-2xl mx-auto">
                    <FaEnvelope />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Subscribe to Our Newsletter
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                        Get instant updates on new product launches, secret flash sales, and exclusive promo codes delivered straight to your inbox.
                    </p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Enter your email address..."
                        className="glass-input flex-grow px-4 py-3 rounded-xl text-sm focus:outline-none"
                    />
                    <button 
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all shrink-0"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Home;