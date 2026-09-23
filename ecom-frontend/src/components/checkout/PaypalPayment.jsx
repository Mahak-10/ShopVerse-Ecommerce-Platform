import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import { addPaymentMethod, stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaPaypal } from 'react-icons/fa';

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID";

const PaypalPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paypalRef = useRef(null);

  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sdkLoaded, setSdkLoaded] = useState(false);

  const finalTotal = totalPrice > 0 ? totalPrice : (cart?.reduce(
    (acc, item) => acc + (Number(item?.specialPrice || item?.price || 0) * Number(item?.quantity || 1)), 0
  ) || 0);

  // Load PayPal official JS SDK dynamically
  useEffect(() => {
    if (paymentMethod !== "COD") {
      const scriptId = "paypal-sdk-script";
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`;
        script.async = true;
        script.onload = () => setSdkLoaded(true);
        script.onerror = () => setErrorMessage("Failed to load PayPal SDK script.");
        document.body.appendChild(script);
      } else {
        setSdkLoaded(true);
      }
    }
  }, [paymentMethod]);

  // Render official PayPal Smart Buttons when SDK is loaded
  useEffect(() => {
    if (sdkLoaded && window.paypal && paypalRef.current && paymentMethod !== "COD") {
      paypalRef.current.innerHTML = "";
      try {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: (finalTotal > 0 ? finalTotal : 1.00).toFixed(2)
                }
              }]
            });
          },
          onApprove: async (data, actions) => {
            setLoading(true);
            const details = await actions.order.capture();
            const sendData = {
              addressId: selectedUserCheckoutAddress?.addressId,
              paymentMethod: "Paypal",
              pgName: "PAYPAL",
              pgPaymentId: details.id || data.orderID,
              pgStatus: "COMPLETED",
              pgResponseMessage: `PayPal Payment Approved by ${details.payer?.name?.given_name || 'Buyer'}`,
            };
            dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
            setTimeout(() => {
              setLoading(false);
              navigate('/order-confirm');
            }, 1000);
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
            setErrorMessage("PayPal payment failed or was cancelled.");
            toast.error("PayPal payment failed");
          }
        }).render(paypalRef.current);
      } catch (err) {
        console.error("PayPal render error:", err);
      }
    }
  }, [sdkLoaded, finalTotal, selectedUserCheckoutAddress, paymentMethod, dispatch, navigate]);

  const handlePlaceCodOrder = () => {
    if (!selectedUserCheckoutAddress?.addressId) {
      toast.error("Please select a delivery address.");
      return;
    }
    
    setLoading(true);
    const sendData = {
      addressId: selectedUserCheckoutAddress?.addressId,
      paymentMethod: "COD",
      pgName: "COD",
      pgPaymentId: "COD_" + Date.now(),
      pgStatus: "SUCCESS",
      pgResponseMessage: "Cash on Delivery",
    };

    dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
    setTimeout(() => {
      setLoading(false);
      navigate('/order-confirm');
    }, 1200);
  };

  const switchToCodHandler = () => {
    dispatch(addPaymentMethod("COD"));
  };

  return (
    <div className="max-w-lg mx-auto my-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
      {paymentMethod === "COD" ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <FaCheckCircle className="text-emerald-500 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Cash on Delivery</h2>
          <p className="text-slate-600 text-sm">
            You will pay <strong className="text-slate-900">{formatPrice(finalTotal)}</strong> in cash upon delivery of your order.
          </p>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md">
              {errorMessage}
            </div>
          )}

          <button
            onClick={handlePlaceCodOrder}
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all text-base disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Processing Order..." : `Confirm & Place Order (${formatPrice(finalTotal)})`}
          </button>
        </div>
      ) : (
        <div className="space-y-5 text-left">
          <div className="text-center space-y-2 border-b border-slate-100 pb-4">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 text-3xl">
                <FaPaypal />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">PayPal Express Checkout</h2>
            <p className="text-slate-500 text-xs font-medium">Pay securely using your PayPal account balance or linked cards.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Order Amount:</span>
              <span className="font-extrabold text-indigo-600 text-sm">{formatPrice(finalTotal)}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Payment Gateway:</span>
              <span className="text-amber-600 font-bold">PayPal Sandbox</span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md font-medium">
              {errorMessage}
            </div>
          )}

          <div className="pt-2 space-y-3">
            <div ref={paypalRef} className="min-h-[120px]">
              {!sdkLoaded && (
                <div className="text-center text-xs text-slate-400 py-6 animate-pulse">
                  Loading Official PayPal Buttons...
                </div>
              )}
            </div>

            <button
              onClick={switchToCodHandler}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-xs cursor-pointer"
            >
              Switch to Cash on Delivery (COD)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaypalPayment;