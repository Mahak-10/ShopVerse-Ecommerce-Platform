import React, { useEffect } from 'react';
import { FaShoppingCart, FaBoxOpen, FaCheckCircle, FaTruck, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../store/actions';
import { formatPrice } from '../../utils/formatPrice';
import Skeleton from '../shared/Skeleton';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((state) => state.order);
  const { isLoading } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const emptyOrder = !adminOrder || adminOrder.length === 0;

  if (isLoading && emptyOrder) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-[calc(100vh-140px)] space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <FaBoxOpen />
            <span>Order History</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My <span className="text-indigo-600">Orders</span>
          </h1>
        </div>
        
        <Link 
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-300 transition-all self-start shadow-xs"
        >
          <span>Continue Shopping</span>
        </Link>
      </div>

      {emptyOrder ? (
        <div className="bg-white rounded-3xl p-16 text-center space-y-4 max-w-md mx-auto border border-slate-200 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-3xl mx-auto">
            <FaShoppingCart />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Orders Placed Yet</h2>
          <p className="text-slate-600 text-sm">
            Discover thousands of handpicked products with lightning fast shipping.
          </p>
          <div className="pt-2">
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:scale-105 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {adminOrder.map((order, idx) => (
            <div key={order.orderId || idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              
              {/* Order Header */}
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex flex-wrap justify-between items-center gap-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Order ID</span>
                  <span className="font-extrabold text-slate-900 text-base">#{order.orderId}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Placed On</span>
                  <span className="text-sm text-slate-700 font-semibold">{order.orderDate || 'Recent'}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Total Amount</span>
                  <span className="font-extrabold text-indigo-600 text-lg">{formatPrice(order.totalAmount)}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Fulfillment Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded-full ${
                    order.orderStatus?.toLowerCase().includes('delivered')
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : order.orderStatus?.toLowerCase().includes('shipped')
                      ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                      : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  }`}>
                    {order.orderStatus?.toLowerCase().includes('delivered') ? <FaCheckCircle className="text-xs" /> : <FaTruck className="text-xs" />}
                    <span>{order.orderStatus || 'Order Accepted'}</span>
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6 divide-y divide-slate-100 bg-white">
                {order.orderItems?.map((item, itemIdx) => {
                  const product = item.product || {};
                  const itemPrice = item.orderedProductPrice || product.specialPrice || product.price || 0;
                  const itemImg = product.image ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/${product.image}`) : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/default.png`;

                  return (
                    <div key={item.orderItemId || itemIdx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                      <img 
                        src={itemImg} 
                        alt={product.productName || 'Product'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/headphones.jpg`;
                        }}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-slate-50"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{product.productName || 'Ordered Item'}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{product.description}</p>
                        <div className="text-xs text-slate-600 mt-1">
                          Qty: <span className="font-bold text-slate-900">{item.quantity}</span> × {formatPrice(itemPrice)}
                        </div>
                      </div>
                      <div className="text-right font-extrabold text-slate-900 text-base">
                        {formatPrice(itemPrice * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment Info Footer */}
              {order.payment && (
                <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-indigo-600" />
                    <span>
                      Method: <strong className="text-slate-900 uppercase font-bold">
                        {order.payment.pgName === "COD" || order.payment.paymentMethod === "COD" ? "Cash on Delivery" : (order.payment.pgName || order.payment.paymentMethod || "COD")}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-emerald-600" />
                    <span>
                      Payment Status: <strong className={`font-bold ${
                        order.payment.pgName === "COD" || order.payment.paymentMethod === "COD"
                          ? "text-amber-700"
                          : (order.payment.pgStatus === "succeeded" || order.payment.pgStatus === "SUCCESS" ? "text-emerald-700" : "text-red-700")
                      }`}>
                        {order.payment.pgName === "COD" || order.payment.paymentMethod === "COD"
                          ? "Pay on Delivery (Pending)"
                          : (order.payment.pgStatus === "succeeded" || order.payment.pgStatus === "SUCCESS" ? "Paid" : (order.payment.pgStatus || "Pending"))}
                      </strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
