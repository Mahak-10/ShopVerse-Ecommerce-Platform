import { useState } from "react";
import { MdArrowBack, MdShoppingCart, MdOutlineVerifiedUser, MdLocalShipping, MdLock } from "react-icons/md";
import { FaTag, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";

const Cart = () => {
    const { cart } = useSelector((state) => state.carts);
    const [couponCode, setCouponCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(0);

    const calculatedSubtotal = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice || cur?.price || 0) * Number(cur?.quantity || 1), 0
    ) || 0;

    const discountAmount = (calculatedSubtotal * appliedDiscount) / 100;
    const grandTotal = Math.max(0, calculatedSubtotal - discountAmount);

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;

        if (couponCode.trim().toUpperCase() === "SHOP10" || couponCode.trim().toUpperCase() === "WELCOME10") {
            setAppliedDiscount(10);
            toast.success("Coupon applied! 10% discount added.");
        } else if (couponCode.trim().toUpperCase() === "SAVE20") {
            setAppliedDiscount(20);
            toast.success("Super deal! 20% discount applied.");
        } else {
            toast.error("Invalid coupon code. Try 'SHOP10' or 'SAVE20'");
        }
    };

    if (!cart || cart.length === 0) return <CartEmpty />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <MdShoppingCart className="text-indigo-600" />
                        <span>Shopping Cart</span>
                        <span className="text-base font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                            {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                        </span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Review your selected products before proceeding to secure checkout.</p>
                </div>

                <Link 
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    <MdArrowBack />
                    <span>Continue Shopping</span>
                </Link>
            </div>

            {/* Split 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Cart Items List (70%) */}
                <div className="lg:col-span-8 space-y-4">
                    {cart.map((item, i) => (
                        <ItemContent key={item.productId || i} {...item} />
                    ))}
                </div>

                {/* Right Column: Order Summary Side Card (30%) */}
                <div className="lg:col-span-4 space-y-6">
                    
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl space-y-6 sticky top-6">
                        <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
                            Order Summary
                        </h2>

                        {/* Promo Code Form */}
                        <form onSubmit={handleApplyCoupon} className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                Have a Promo Code?
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <FaTag className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                                    <input 
                                        type="text"
                                        placeholder="e.g. SHOP10"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                                >
                                    Apply
                                </button>
                            </div>
                            {appliedDiscount > 0 && (
                                <p className="text-xs text-emerald-600 font-bold">
                                    ✓ {appliedDiscount}% Discount Active
                                </p>
                            )}
                        </form>

                        {/* Price Breakdown */}
                        <div className="space-y-3 text-sm border-t border-slate-100 pt-4">
                            <div className="flex justify-between text-slate-600">
                                <span>Items Subtotal</span>
                                <span className="font-bold text-slate-900">{formatPrice(calculatedSubtotal)}</span>
                            </div>

                            {appliedDiscount > 0 && (
                                <div className="flex justify-between text-emerald-600 font-bold">
                                    <span>Discount ({appliedDiscount}%)</span>
                                    <span>-{formatPrice(discountAmount)}</span>
                                </div>
                            )}

                            <div className="flex justify-between text-slate-600">
                                <span>Estimated Shipping</span>
                                <span className="text-emerald-600 font-bold uppercase">Free Express</span>
                            </div>

                            <div className="flex justify-between text-slate-600">
                                <span>Estimated Taxes & GST</span>
                                <span className="text-slate-400 font-medium">Included</span>
                            </div>

                            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-lg font-extrabold text-slate-900">
                                <span>Total Amount</span>
                                <span className="text-indigo-600 text-2xl">{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        {/* Proceed to Checkout CTA */}
                        <Link to="/checkout" className="block w-full">
                            <button
                                className="w-full py-4 px-6 rounded-xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Proceed to Checkout</span>
                                <FaArrowRight className="text-xs" />
                            </button>
                        </Link>

                        {/* Security Trust Badges */}
                        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                            <div className="flex items-center gap-2">
                                <MdLock className="text-indigo-600 text-base" />
                                <span>256-Bit SSL Encrypted Checkout</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdOutlineVerifiedUser className="text-emerald-600 text-base" />
                                <span>100% Buyer Protection & Easy Returns</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdLocalShipping className="text-purple-600 text-base" />
                                <span>Dispatched within 24 Hours</span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;