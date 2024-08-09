// PaymentForm.jsx
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51MEGH2EAdhkm3Iy5evFHo5liA1qyMVyjVFguHJzKO80HDlT3DYbI4IUM9xMoylsysNGqAZsl0PU0jyM9OTLuTUaW00YWRK8juE');

// Define appearance options for Stripe Elements
const appearance = {
    theme: "stripe",
    variables: {
        colorPrimary: "#ffffff",
        colorBackground: "#ffffff",
        colorText: "#000000",
        colorDanger: "#ffffff",
        fontFamily: "Ubuntu",
        spacingUnit: "2px",
        borderColor: "#342",
        borderRadius: "0px",
    },
};

const PaymentForm = ({ contractId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent when component mounts
        axios.post('/create_payment_intent', { contract_id: contractId })
            .then(response => setClientSecret(response.data.clientSecret))
            .catch(error => console.error('Error creating PaymentIntent:', error));
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
            console.error('Payment error:', result.error.message);
            alert('Payment failed. Please try again.');
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                alert('Payment successful!');
            }
        }
    };

    return (
        <form className='py-4 space-y-4 ' onSubmit={handleSubmit}>
            <CardElement options={{ appearance }} />
            <button type="submit" className='bg-cyan-500 text-white font-semibold px-8 py-1 rounded hover:bg-gradient-to-r from-teal-600 via-cyan-600 to-green-500 transition-all duration-600' disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

const AddFundsForm = ({ contractId }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm contractId={contractId} />
    </Elements>
);

export default AddFundsForm;
