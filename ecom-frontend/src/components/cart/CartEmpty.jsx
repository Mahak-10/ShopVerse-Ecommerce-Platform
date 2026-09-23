import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CartEmpty = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-slate-50">
            <div className="w-24 h-24 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
                <MdOutlineShoppingCart className="text-5xl" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Your Shopping Cart is Empty
            </h2>
            
            <p className="text-slate-500 text-sm max-w-md mb-8 leading-relaxed">
                Looks like you haven't added any items to your cart yet. Explore our latest flagship products and top deals!
            </p>

            <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
            >
                <span>Explore Catalog</span>
                <FaArrowRight className="text-xs" />
            </Link>
        </div>
    );
};

export default CartEmpty;