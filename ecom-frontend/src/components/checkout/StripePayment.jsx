import { Alert, AlertTitle, Skeleton } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "YOUR_STRIPE_PUBLISHABLE_KEY";
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const calculatedTotal = totalPrice > 0 ? totalPrice : (cart?.reduce(
    (acc, item) => acc + (Number(item?.specialPrice || item?.price || 0) * Number(item?.quantity || 1)), 0
  ) || 0);

  useEffect(() => {
    if (!clientSecret && user && selectedUserCheckoutAddress) {
      const sendData = {
        amount: Math.max(Math.round(Number(calculatedTotal) * 100), 50),
        currency: "usd",
        email: user?.email,
        name: `${user?.username || 'Customer'}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user?.email}`,
        metadata: {
          test: "1"
        }
      };
      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret, user, selectedUserCheckoutAddress, calculatedTotal, dispatch]);

  if (errorMessage && !clientSecret) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <Alert severity="error" className="rounded-xl">
          <AlertTitle>Stripe Gateway Error</AlertTitle>
          {errorMessage}
        </Alert>
      </div>
    );
  }

  return (
    <>
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={calculatedTotal} />
        </Elements>
      ) : (
        <div className='max-w-lg mx-auto py-8 space-y-4'>
          <div className='bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4'>
            <Skeleton variant="rectangular" width="100%" height={40} className="rounded-xl" />
            <Skeleton variant="rectangular" width="100%" height={56} className="rounded-xl" />
            <Skeleton variant="rectangular" width="100%" height={48} className="rounded-xl" />
          </div>
          <p className="text-slate-500 text-xs font-semibold text-center animate-pulse">
            Loading Stripe Card Payment...
          </p>
        </div>
      )}
    </>
  );
};

export default StripePayment;