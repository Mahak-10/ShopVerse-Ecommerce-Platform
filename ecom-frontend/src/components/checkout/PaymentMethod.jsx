import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethod, createUserCart } from '../../store/actions';
import { FaCreditCard, FaMoneyBillWave, FaPaypal, FaLock } from 'react-icons/fa';
import { MdOutlineVerifiedUser } from 'react-icons/md';

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts);
    const { errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        if (cart && cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }));
            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId]);

    useEffect(() => {
        if (!paymentMethod) {
            dispatch(addPaymentMethod("COD"));
        }
    }, [paymentMethod, dispatch]);

    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Select Payment Method</h2>
                    <p className="text-slate-500 text-xs mt-1 font-medium">Choose how you would like to pay for your order. All transactions are SSL encrypted.</p>
                </div>

                <div className="space-y-4">
                    
                    {/* Cash on Delivery (COD) */}
                    <div 
                        onClick={() => paymentMethodHandler('COD')}
                        className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                            paymentMethod === 'COD'
                                ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                                paymentMethod === 'COD' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                                <FaMoneyBillWave />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">Cash on Delivery (COD)</h4>
                                <p className="text-slate-500 text-xs font-medium">Pay with cash or UPI upon delivery at your doorstep.</p>
                            </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            paymentMethod === 'COD' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                        }`}>
                            {paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                    </div>

                    {/* Credit / Debit Card (Stripe) */}
                    <div 
                        onClick={() => paymentMethodHandler('Stripe')}
                        className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                            paymentMethod === 'Stripe'
                                ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                                paymentMethod === 'Stripe' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                                <FaCreditCard />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">Credit / Debit Card (Stripe)</h4>
                                <p className="text-slate-500 text-xs font-medium">Instant online payment via Visa, Mastercard, AMEX.</p>
                            </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            paymentMethod === 'Stripe' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                        }`}>
                            {paymentMethod === 'Stripe' && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                    </div>

                    {/* PayPal */}
                    <div 
                        onClick={() => paymentMethodHandler('Paypal')}
                        className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                            paymentMethod === 'Paypal'
                                ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-600/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                                paymentMethod === 'Paypal' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                                <FaPaypal />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">PayPal Checkout</h4>
                                <p className="text-slate-500 text-xs font-medium">Fast, secure checkout using your PayPal account balance.</p>
                            </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            paymentMethod === 'Paypal' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                        }`}>
                            {paymentMethod === 'Paypal' && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                    </div>

                </div>
            </div>

            {/* Trust Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                    <FaLock className="text-indigo-600" />
                    <span>256-Bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MdOutlineVerifiedUser className="text-emerald-600 text-sm" />
                    <span>Money-Back Guarantee</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;