import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';

import { UserProvider } from './context/UserContext';


import Home from './pages/Home';
import NoPage from './pages/NoPage';
import About from './pages/About';
import LoginPage from './Authentication/LoginPage';
import CustomerSupport from './pages/CustomerSupport';
import SignUpForm from './Authentication/SignUpForm';



function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App