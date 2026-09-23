import { Step, StepLabel, Stepper, StepButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';
import { FaArrowLeft, FaArrowRight, FaLock, FaShieldAlt, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatPrice';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.errors);
    const { cart, totalPrice } = useSelector((state) => state.carts);
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );
    const { paymentMethod } = useSelector((state) => state.payment);

    const steps = [
        "Delivery Address",
        "Payment Method",
        "Review Order",
        "Complete Payment",
    ];

    const calculatedSubtotal = cart?.reduce((acc, item) => {
        const unitPrice = Number(item?.specialPrice || item?.price || 0);
        const itemQty = Number(item?.quantity || 1);
        return acc + unitPrice * itemQty;
    }, 0) || 0;

    const finalTotal = totalPrice > 0 ? totalPrice : calculatedSubtotal;

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevStep) => prevStep - 1);
        }
    };

    const handleNext = () => {
        if (activeStep === 0 && (!selectedUserCheckoutAddress || !selectedUserCheckoutAddress.addressId)) {
            toast.error("Please select or add a checkout address before proceeding.");
            return;
        }

        if (activeStep === 1 && !paymentMethod) {
            toast.error("Please select a payment method before proceeding.");
            return;
        }

        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleStepClick = (stepIndex) => {
        if (stepIndex < activeStep) {
            setActiveStep(stepIndex);
        } else if (stepIndex === 1 && selectedUserCheckoutAddress?.addressId) {
            setActiveStep(1);
        } else if (stepIndex === 2 && selectedUserCheckoutAddress?.addressId && paymentMethod) {
            setActiveStep(2);
        } else if (stepIndex === 3 && selectedUserCheckoutAddress?.addressId && paymentMethod) {
            setActiveStep(3);
        }
    };

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    const isProceedDisabled = Boolean(
        (activeStep === 0 && (!selectedUserCheckoutAddress || !selectedUserCheckoutAddress.addressId)) ||
        (activeStep === 1 && !paymentMethod)
    );

    return (
        <div className="py-10 min-h-[calc(100vh-100px)] pb-36 bg-slate-50">
            
            {/* Header Title & Stepper Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
                        Express Checkout
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-900">Finalize Your Order</h1>
                </div>

                {/* Progress Stepper with Brand Purple Theme Colors */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
                    <Stepper 
                        activeStep={activeStep} 
                        alternativeLabel
                        sx={{
                            '& .MuiStepIcon-root': {
                                color: '#cbd5e1',
                                '&.Mui-active': {
                                    color: '#4f46e5',
                                },
                                '&.Mui-completed': {
                                    color: '#4f46e5', // Purple / Indigo checkmark tick!
                                },
                            },
                            '& .MuiStepLabel-label': {
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                color: '#64748b',
                                '&.Mui-active': {
                                    color: '#4f46e5',
                                    fontWeight: 800,
                                },
                                '&.Mui-completed': {
                                    color: '#4f46e5',
                                    fontWeight: 800,
                                },
                            },
                            '& .MuiStepConnector-line': {
                                borderColor: '#e2e8f0',
                            },
                            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                                borderColor: '#4f46e5',
                            },
                            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                                borderColor: '#4f46e5',
                            },
                        }}
                    >
                        {steps.map((label, index) => (
                            <Step key={index} completed={index < activeStep}>
                                <StepButton onClick={() => handleStepClick(index)}>
                                    <StepLabel>{label}</StepLabel>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </div>

                {/* Main 2-Column Equal Width & Equal Height Checkout Grid (50/50 Split) */}
                {isLoading && (!address || address.length === 0) ? (
                    <div className="py-10">
                        <Skeleton />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-2">
                        
                        {/* Left Box: Active Step Content (50% Equal Width) */}
                        <div className="h-full flex flex-col">
                            {activeStep === 0 && <AddressInfo address={address} />}
                            
                            {activeStep === 1 && <PaymentMethod />}
                            
                            {activeStep === 2 && (
                                <OrderSummary 
                                    totalPrice={totalPrice}
                                    cart={cart}
                                    address={selectedUserCheckoutAddress}
                                    paymentMethod={paymentMethod}
                                />
                            )}

                            {activeStep === 3 && (
                                <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between h-full space-y-6">
                                    <div className="space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h2 className="text-2xl font-extrabold text-slate-900">Complete Payment</h2>
                                            <p className="text-slate-500 text-xs mt-1 font-medium">Submit your payment details below to place your order.</p>
                                        </div>

                                        {paymentMethod === "Stripe" ? (
                                            <StripePayment />
                                        ) : (
                                            <PaypalPayment />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Box: Persistent Order Summary Side Card (50% Equal Width & Matching Height) */}
                        <div className="h-full flex flex-col">
                            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between h-full space-y-6">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4 flex items-center justify-between">
                                        <span>Order Summary</span>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                            {cart?.length || 0} Items
                                        </span>
                                    </h3>

                                    {/* Delivery Address Quick Preview */}
                                    {selectedUserCheckoutAddress?.addressId && (
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-1">
                                            <div className="flex items-center gap-2 font-bold text-slate-900">
                                                <FaMapMarkerAlt className="text-indigo-600 shrink-0" />
                                                <span className="truncate">{selectedUserCheckoutAddress.buildingName}</span>
                                            </div>
                                            <p className="text-slate-500 truncate pl-5">
                                                {selectedUserCheckoutAddress.street}, {selectedUserCheckoutAddress.city}
                                            </p>
                                        </div>
                                    )}

                                    {/* Line Items Quick List */}
                                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                                        {cart?.map((item, idx) => (
                                            <div key={item.productId || idx} className="flex items-center justify-between text-xs gap-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <img 
                                                        src={item.image?.startsWith("http") ? item.image : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/${item.image}`}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/headphones.jpg`;
                                                        }}
                                                        alt={item.productName}
                                                        className="w-11 h-11 object-contain rounded-xl border border-slate-100 bg-slate-50 shrink-0 p-1"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-slate-900 truncate">{item.productName}</p>
                                                        <p className="text-slate-400">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-slate-900 shrink-0">
                                                    {formatPrice(Number(item.specialPrice || item.price || 0) * Number(item.quantity || 1))}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-4">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span className="font-bold text-slate-900">{formatPrice(finalTotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span className="text-emerald-600 font-bold uppercase flex items-center gap-1">
                                                <FaTruck className="text-xs" /> FREE
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Estimated GST</span>
                                            <span className="text-slate-400 font-medium">Included</span>
                                        </div>
                                        <hr className="border-slate-100 my-2" />
                                        <div className="flex justify-between text-lg font-extrabold text-slate-900 pt-1">
                                            <span>Total Amount</span>
                                            <span className="text-indigo-600 text-2xl">{formatPrice(finalTotal)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Badges */}
                                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <FaLock className="text-indigo-600" />
                                        <span>256-Bit SSL Encrypted Checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="text-emerald-600" />
                                        <span>100% Brand Authenticity Guaranteed</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Bottom Fixed Navigation Bar */}
            <div className="flex justify-between items-center px-6 md:px-16 fixed z-40 h-20 bottom-0 bg-white/95 backdrop-blur-md left-0 w-full border-t border-slate-200 shadow-2xl">
                <button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all ${
                        activeStep === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                    <FaArrowLeft className="text-xs" />
                    <span>Back</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold hidden sm:flex">
                    <FaLock className="text-indigo-600" />
                    <span>256-Bit SSL Encrypted Transaction</span>
                </div>

                {activeStep !== steps.length - 1 ? (
                    <button
                        disabled={isProceedDisabled}
                        onClick={handleNext}
                        className={`inline-flex items-center gap-2 font-bold text-sm px-8 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-98 ${
                            isProceedDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                    >
                        <span>Proceed to Next Step</span>
                        <FaArrowRight className="text-xs" />
                    </button>
                ) : (
                    <span className="text-xs text-emerald-600 font-extrabold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                        Finalizing Order
                    </span>
                )}
            </div>
        </div>
    );
};

export default Checkout;