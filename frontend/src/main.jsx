import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51MEGH2EAdhkm3Iy5evFHo5liA1qyMVyjVFguHJzKO80HDlT3DYbI4IUM9xMoylsysNGqAZsl0PU0jyM9OTLuTUaW00YWRK8juE');


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
)
