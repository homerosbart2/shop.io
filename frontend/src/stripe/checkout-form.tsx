import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStore } from '../stores';
import { Button, BUTTON_COLOR } from '../components/button/button';
import { LoadingSpinner } from '../components/loading-spinner/loading-spinner';

import './checkout-form.scss';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { observer } from 'mobx-react';

interface CheckoutFormProps {
    amount: number;
    shown: boolean;
    onCancelButtonClick: () => void;
    onPaySuccess: () => void;
    onFail: (message: string) => void;
}

export const CheckoutForm = observer((props: CheckoutFormProps) => {
    const store = useStore();
    const isPaying = store.orderStore.isPaying || store.orderStore.isCreating;
    const [complete, setComplete] = useState<boolean>(false);
    const [isCreatingPaymentMethod, setIsCreatingPaymentMethod] = useState<boolean>(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (stripe && elements) {
            setIsCreatingPaymentMethod(true);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)!,
            });
            setIsCreatingPaymentMethod(false);
    
            if (!error) {
                if (paymentMethod) {
                    if (await store.orderStore.pay(paymentMethod.id, props.amount)) {
                        props.onPaySuccess();
                    } else {
                        props.onFail('There was an error with your payment method.');
                    }
                }
            } else {
                console.log(error.message);
            }
        }
    };

    const handleChange = ({ complete }: StripeCardElementChangeEvent) => {
        setComplete(complete);
    };

    return (
        <div className={`checkout-form ${props.shown ? 'shown' : ''}`}>
            <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>
                <div className="buttons">
                    <Button color={BUTTON_COLOR.ORANGE} onClick={props.onCancelButtonClick}>
                        Cancel
                    </Button>
                    <button className={complete ? '' : 'disabled'}>
                        {(isPaying || isCreatingPaymentMethod) ? <LoadingSpinner/> : 'Pay'}
                    </button>
                </div>
            </form>
        </div>
    );
});