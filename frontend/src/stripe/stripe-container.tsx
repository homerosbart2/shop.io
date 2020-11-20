import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './checkout-form';

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

interface StripeContainerProps {
    amount: number;
    shown: boolean;
    onCancelButtonClick: () => void;
    onPaySuccess: () => void;
}

export const StripeContainer = (props: StripeContainerProps) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm
                amount={props.amount}
                shown={props.shown}
                onCancelButtonClick={props.onCancelButtonClick}
                onPaySuccess={props.onPaySuccess}
            />
        </Elements>
    );
};