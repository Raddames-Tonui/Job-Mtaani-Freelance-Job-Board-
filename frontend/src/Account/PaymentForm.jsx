// PaymentForm.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_stripe_public_key');

const PaymentForm = ({ contractId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.post('/create_payment_intent', { contract_id: contractId })
            .then(response => setClientSecret(response.data.clientSecret));
    }, [contractId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                alert('Payment successful!');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
};

const StripePayment = ({ contractId }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm contractId={contractId} />
    </Elements>
);

export default StripePayment;
