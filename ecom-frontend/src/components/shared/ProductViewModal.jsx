import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { MdClose, MdCheckCircle, MdRemoveShoppingCart } from 'react-icons/md';
import { FaShoppingCart, FaStar, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions';
import { formatPrice } from '../../utils/formatPrice';
import toast from 'react-hot-toast';
import SetQuantity from '../cart/SetQuantity';

function ProductViewModal({ open, setOpen, product = {}, isAvailable }) {
  const [selectedQty, setSelectedQty] = useState(1);
  const dispatch = useDispatch();

  if (!product) return null;

  const { id, productId, productName, image, description, quantity, price = 0, discount = 0, specialPrice } = product;
  const pId = productId || id;

  // Determine availability: if explicitly passed use it, otherwise check if quantity is not strictly 0
  const isStockAvailable = isAvailable !== undefined ? isAvailable : (quantity === undefined || quantity === null || quantity > 0);
  const discountPercentage = Math.round(discount || 0);

  const handleAddToCart = () => {
    if (!pId) {
      toast.error("Unable to add product to cart.");
      return;
    }
    dispatch(addToCart({
      image,
      productName,
      description,
      specialPrice,
      price,
      productId: pId,
      quantity: quantity ?? 100,
      discount
    }, selectedQty, toast));
    setOpen(false);
  };

  const imageUrl = image
    ? (image.startsWith("http") ? image : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/${image}`)
    : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/default.png`;

  return (
    <Dialog open={open} as="div" className="relative z-50" onClose={() => setOpen(false)}>
      <DialogBackdrop className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">

          <DialogPanel className="relative transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all max-w-3xl w-full border border-slate-200">

            {/* Close Icon Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
            >
              <MdClose className="text-xl" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">

              {/* Product Image Column */}
              <div className="md:col-span-5 bg-slate-50 p-6 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-200">
                {discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    {discountPercentage}% OFF
                  </span>
                )}

                <img
                  src={imageUrl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/headphones.jpg`;
                  }}
                  alt={productName || "Product image"}
                  className="max-h-72 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info & Action Column */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">

                <div className="space-y-3">

                  {/* Category / Stock Status Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                      Official Item
                    </span>

                    {isStockAvailable ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <MdCheckCircle className="text-emerald-600 text-sm" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        <MdRemoveShoppingCart className="text-rose-600 text-sm" />
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <DialogTitle as="h2" className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {productName}
                  </DialogTitle>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-amber-400 text-xs" />
                      ))}
                    </div>
                    <span className="text-slate-500 text-xs font-medium ml-1">4.8 (120+ reviews)</span>
                  </div>

                  {/* Pricing Callout */}
                  <div className="pt-2 flex items-baseline gap-3">
                    {specialPrice ? (
                      <>
                        <span className="text-3xl font-extrabold text-slate-900">
                          {formatPrice(specialPrice)}
                        </span>
                        <span className="text-base text-slate-400 line-through font-medium">
                          {formatPrice(price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-extrabold text-slate-900">
                        {formatPrice(price)}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {description || "High performance commercial product designed with premium durability and ultrafast response."}
                  </p>

                  {/* Trust Micro-Badges */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <FaTruck className="text-indigo-600" />
                      <span>Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaShieldAlt className="text-emerald-600" />
                      <span>Warranty Included</span>
                    </div>
                  </div>

                </div>

                {/* Actions & Quantity Footer */}
                <div className="pt-4 border-t border-slate-100 space-y-4">

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Quantity
                    </span>
                    <SetQuantity
                      quantity={selectedQty}
                      cardCounter={true}
                      handleQtyIncrease={() => setSelectedQty(prev => prev + 1)}
                      handleQtyDecrease={() => setSelectedQty(prev => prev > 1 ? prev - 1 : 1)}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      disabled={!isStockAvailable}
                      onClick={handleAddToCart}
                      type="button"
                      className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md ${!isStockAvailable
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 active:scale-98 cursor-pointer'
                        }`}
                    >
                      <FaShoppingCart />
                      <span>{isStockAvailable ? "Add to Cart" : "Out of Stock"}</span>
                    </button>

                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="py-3 px-5 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </DialogPanel>

        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;