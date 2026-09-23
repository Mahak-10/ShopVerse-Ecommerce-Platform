import React from 'react';
import { FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const OrderSummary = ({ address, paymentMethod }) => {
  return (
    <div className="space-y-6">
      
      {/* Shipping Address Review Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-extrabold text-slate-900 text-xl flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-lg">
              <FaMapMarkerAlt />
            </div>
            <span>Delivery Address</span>
          </h3>
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <FaCheckCircle className="text-[10px]" />
            <span>Verified Address</span>
          </span>
        </div>

        <div className="text-slate-700 text-sm space-y-1.5 pt-1 font-medium leading-relaxed">
          <p className="font-extrabold text-slate-900 text-lg">{address?.buildingName || "N/A"}</p>
          <p className="text-slate-600">{address?.street || "N/A"}</p>
          <p className="text-slate-600">{address?.city ? `${address.city}, ${address.state} - ${address.pincode}` : "N/A"}</p>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider pt-1">{address?.country || "India"}</p>
        </div>
      </div>

      {/* Payment Method Review Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-extrabold text-slate-900 text-xl flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-lg">
              <FaCreditCard />
            </div>
            <span>Selected Payment Method</span>
          </h3>
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <FaCheckCircle className="text-[10px]" />
            <span>Selected</span>
          </span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <span className="font-extrabold text-indigo-600 text-base bg-indigo-50/60 px-5 py-3 rounded-2xl border border-indigo-100/80 shadow-2xs">
            {paymentMethod === "COD" 
              ? "Cash on Delivery (COD)" 
              : paymentMethod === "Stripe" 
              ? "Credit / Debit Card (Stripe)" 
              : "PayPal Checkout"}
          </span>
        </div>
      </div>

    </div>
  );
};

export default OrderSummary;