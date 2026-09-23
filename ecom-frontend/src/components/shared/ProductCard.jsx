import { useState } from 'react';
import { FaShoppingCart, FaStar, FaEye, FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart } from '../../store/actions';
import ProductViewModal from './ProductViewModal';
import { formatPrice } from '../../utils/formatPrice';
import toast from 'react-hot-toast';

const ProductCard = ({
    productId,
    id,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice
}) => {
    const dispatch = useDispatch();
    const [openViewModal, setOpenViewModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const pId = productId || id;

    const { cart } = useSelector((state) => state.carts);
    const cartItem = cart?.find((item) => item.productId === pId);
    const currentQtyInCart = cartItem ? cartItem.quantity : 0;

    const isAvailable = quantity === undefined || quantity === null || quantity > 0;
    const discountPercentage = Math.round(discount || 0);

    const handleAddToCart = (e) => {
        if (e) e.stopPropagation();
        if (!isAvailable) {
            toast.error("Sorry, this item is out of stock!");
            return;
        }
        dispatch(addToCart({
            productId: pId,
            productName,
            image,
            description,
            quantity: quantity ?? 100,
            price,
            discount,
            specialPrice
        }, 1, toast));
    };

    const handleIncrease = (e) => {
        e.stopPropagation();
        dispatch(increaseCartQuantity({
            productId: pId,
            productName,
            image,
            description,
            quantity: quantity ?? 100,
            price,
            discount,
            specialPrice
        }, toast, currentQtyInCart, () => { }));
    };

    const handleDecrease = (e) => {
        e.stopPropagation();
        if (currentQtyInCart <= 1) {
            dispatch(removeFromCart({ productId: pId, productName }, toast));
        } else {
            dispatch(decreaseCartQuantity({
                productId: pId,
                productName,
                image,
                description,
                quantity: quantity ?? 100,
                price,
                discount,
                specialPrice
            }, currentQtyInCart - 1));
        }
    };

    const imageUrl = image
        ? (image.startsWith('http') ? image : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/${image}`)
        : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/default.png`;

    return (
        <>
            <div
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setOpenViewModal(true)}
            >
                {/* Discount Badge Pill */}
                {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 z-20 bg-red-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md pointer-events-none">
                        {discountPercentage}% OFF
                    </div>
                )}

                {/* Image Showcase */}
                <div className="relative w-full h-56 bg-slate-50 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
                    <img
                        src={imageUrl}
                        alt={productName}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/headphones.jpg`;
                        }}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Quick View Floating Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenViewModal(true);
                        }}
                        className={`absolute bottom-3 bg-white/90 hover:bg-white text-slate-800 px-4 py-2 rounded-xl text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-2 transition-all duration-300 border border-slate-200 cursor-pointer ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                            }`}
                    >
                        <FaEye />
                        <span>Quick View</span>
                    </button>
                </div>

                {/* Details Section */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-amber-400 text-[11px]" />
                                ))}
                            </div>
                            <span className="text-slate-500 text-[11px] ml-1 font-medium">(4.8)</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {productName}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                            {description || "High performance product built with superior durability and modern features."}
                        </p>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                            {discountPercentage > 0 ? (
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 line-through font-medium">
                                        {formatPrice(price)}
                                    </span>
                                    <span className="text-lg font-extrabold text-slate-900">
                                        {formatPrice(specialPrice)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-lg font-extrabold text-slate-900">
                                    {formatPrice(price)}
                                </span>
                            )}
                        </div>

                        {/* Add to Cart Stepper Button */}
                        {currentQtyInCart > 0 ? (
                            <div
                                className="flex items-center bg-indigo-600 text-white rounded-xl shadow-md overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={handleDecrease}
                                    className="px-2.5 py-2 hover:bg-indigo-700 transition-colors focus:outline-none"
                                    title="Decrease quantity"
                                >
                                    <FaMinus className="text-[10px]" />
                                </button>
                                <span className="px-2.5 text-xs font-extrabold select-none">
                                    {currentQtyInCart}
                                </span>
                                <button
                                    onClick={handleIncrease}
                                    className="px-2.5 py-2 hover:bg-indigo-700 transition-colors focus:outline-none"
                                    title="Increase quantity"
                                >
                                    <FaPlus className="text-[10px]" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                disabled={!isAvailable}
                                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${!isAvailable
                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 active:scale-95 cursor-pointer"
                                    }`}
                            >
                                <FaPlus className="text-[10px]" />
                                <span>{!isAvailable ? "Out of Stock" : "Add"}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            <ProductViewModal
                open={openViewModal}
                setOpen={setOpenViewModal}
                product={{
                    productId: pId,
                    id: pId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice
                }}
                isAvailable={isAvailable}
            />
        </>
    );
};

export default ProductCard;