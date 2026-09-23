import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { FaPlus, FaMinus, FaTruck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    stockQuantity,
  }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const unitPrice = Number(specialPrice || price || 0);

    const handleQtyIncrease = () => {
        const itemPayload = { image, productName, description, specialPrice, price, productId, quantity, stockQuantity };
        dispatch(increaseCartQuantity(
            itemPayload,
            toast,
            currentQuantity,
            setCurrentQuantity
        ));
    };

    const handleQtyDecrease = () => {
        const itemPayload = { image, productName, description, specialPrice, price, productId, quantity };
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(itemPayload, newQuantity));
        } else {
            removeItemFromCart();
        }
    };

    const removeItemFromCart = () => {
        dispatch(removeFromCart({ image, productName, description, specialPrice, price, productId, quantity }, toast));
    };

    const imageUrl = image 
        ? (image.startsWith('http') ? image : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/${image}`)
        : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/default.png`;
    
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Left: Product Thumbnail & Name Info */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={productName}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/headphones.jpg`;
                        }}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                <div className="space-y-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                        {productName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                        <FaTruck className="text-[10px]" />
                        <span>In Stock • Ready to Ship</span>
                    </div>
                    <div className="text-slate-500 text-xs font-semibold sm:hidden">
                        Unit Price: <span className="text-slate-900 font-bold">{formatPrice(unitPrice)}</span>
                    </div>
                </div>
            </div>

            {/* Right Controls: Unit Price, Stepper, Total & Remove */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                
                {/* Desktop Unit Price */}
                <div className="hidden sm:block text-right">
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Price</span>
                    <span className="text-sm font-extrabold text-slate-900">{formatPrice(unitPrice)}</span>
                </div>

                {/* Inline Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-2xs">
                    <button
                        onClick={handleQtyDecrease}
                        className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors focus:outline-none cursor-pointer"
                        title="Decrease quantity"
                    >
                        <FaMinus className="text-[10px]" />
                    </button>
                    <span className="px-3 text-xs font-extrabold text-slate-900 select-none">
                        {currentQuantity}
                    </span>
                    <button
                        onClick={handleQtyIncrease}
                        className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors focus:outline-none cursor-pointer"
                        title="Increase quantity"
                    >
                        <FaPlus className="text-[10px]" />
                    </button>
                </div>

                {/* Item Total Price */}
                <div className="text-right">
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Total</span>
                    <span className="text-base font-extrabold text-indigo-600">
                        {formatPrice(unitPrice * currentQuantity)}
                    </span>
                </div>

                {/* Remove Item Button */}
                <button
                    onClick={removeItemFromCart}
                    className="w-9 h-9 rounded-xl border border-rose-100 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Remove item"
                >
                    <HiOutlineTrash className="text-lg" />
                </button>
            </div>

        </div>
    );
};

export default ItemContent;