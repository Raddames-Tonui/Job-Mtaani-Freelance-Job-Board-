
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './src/Layout';

import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './src/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="signup" element={<Signup />} />
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App