// WithdrawFundsForm.jsx
import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Define appearance options for Stripe Elements specific to withdrawing funds
const withdrawFundsAppearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#007bff', // Blue for withdrawing funds
    colorBackground: '#f8f9fa',
    colorText: '#000000',
    colorDanger: '#ff4d4d',
    fontFamily: 'Arial, sans-serif',
    spacingUnit: '2px',
    borderColor: '#d1d1d1',
    borderRadius: '4px',
  },
};

const stripePromise = loadStripe('your-publishable-key-here');

const WithdrawFundsForm = ({ walletId, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios.post('/create_withdraw_payment_intent', { wallet_id: walletId })
      .then(response => setClientSecret(response.data.clientSecret))
      .catch(error => console.error('Error creating PaymentIntent:', error));
  }, [walletId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error('Payment error:', result.error.message);
      alert('Failed to withdraw funds. Please try again.');
    } else if (result.paymentIntent.status === 'succeeded') {
      alert('Funds withdrawn successfully!');
      onClose(); // Close the modal or perform any other action on success
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <form className='p-4 bg-blue-50 rounded shadow-md' onSubmit={handleSubmit}>
        <h2 className='text-xl font-bold mb-4 text-blue-600'>Withdraw Funds from Wallet</h2>
        <CardElement options={{ appearance: withdrawFundsAppearance }} />
        <button
          type="submit"
          className='mt-4 bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300'
          disabled={!stripe}
        >
          Withdraw Funds
        </button>
      </form>
    </Elements>
  );
};

export default WithdrawFundsForm;
