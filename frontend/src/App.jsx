import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';

import Home from './pages/Home';
import NoPage from './pages/NoPage';
import About from './pages/About';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App