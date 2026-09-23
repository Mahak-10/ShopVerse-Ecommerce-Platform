import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { formatPrice } from '../../utils/formatPrice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#0f172a",
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      lineHeight: "24px",
      "::placeholder": {
        color: "#94a3b8",
      },
    },
    invalid: {
      color: "#dc2626",
      iconColor: "#dc2626",
    },
  },
};

const PaymentForm = ({ clientSecret, totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedUserCheckoutAddress?.addressId) {
            toast.error("Please select a checkout address first.");
            return;
        }

        if (!stripe || !elements) {
            toast.error("Stripe SDK is still loading. Please wait a moment.");
            return;
        }

        setIsProcessing(true);
        setErrorMessage("");

        const cardElement = elements.getElement(CardElement);

        // EmbarkX Course Standard Stripe Card Confirmation
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: `${selectedUserCheckoutAddress?.buildingName || 'Customer'}`,
                    email: selectedUserCheckoutAddress?.email || "customer@example.com",
                },
            },
        });

        if (error) {
            setErrorMessage(error.message || "Payment failed");
            toast.error(error.message || "Payment failed");
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            const sendData = {
                addressId: selectedUserCheckoutAddress?.addressId,
                paymentMethod: "Stripe",
                pgName: "STRIPE",
                pgPaymentId: paymentIntent.id,
                pgStatus: paymentIntent.status,
                pgResponseMessage: "Stripe Card Payment Successful",
            };

            dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setIsProcessing, toast));
            setTimeout(() => {
                setIsProcessing(false);
                navigate('/order-confirm');
            }, 1000);
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-lg mx-auto space-y-5 text-left'>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                    <FaCreditCard className="text-indigo-600 text-xl" />
                    <h3 className="text-lg font-extrabold text-slate-900">Credit / Debit Card</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <FaLock className="text-xs text-emerald-500" /> SSL Encrypted
                </span>
            </div>

            <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700 mb-1">Card Number, Expiry & CVC</label>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-600/20 shadow-xs">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
            </div>

            {errorMessage && (
                <div className='text-red-600 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100'>
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className='w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md shadow-indigo-600/20 transition-all text-base disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2'
            >
                <span>{isProcessing ? "Processing Stripe Payment..." : `Pay ${formatPrice(totalPrice)}`}</span>
            </button>
        </form>
    );
};

export default PaymentForm;