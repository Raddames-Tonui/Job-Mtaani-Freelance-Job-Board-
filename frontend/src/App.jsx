import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';

import { UserProvider } from './context/UserContext';
import { JobProvider } from './context/JobContext';

import Home from './pages/Home';
import NoPage from './pages/NoPage';
import About from './pages/About';
import CustomerSupport from './pages/CustomerSupport';
import JobList from './jobs/JobList';
import JobCreation from './jobs/JobCreation';

import Login from './Authentication/Login';
import SignUpForm from './Authentication/SignUpForm';




function App() {
  return (
    <BrowserRouter>
      <UserProvider>
          <JobProvider>
            <Routes>
              <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="/jobs-list" element={<JobList/>}/>

                <Route path="/create-job" element={<JobCreation/>}/>
          
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpForm />} />
                
                
                <Route path="/customer-support" element={<CustomerSupport />} />

                <Route path="/about" element={<About />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </JobProvider>
        </UserProvider>
    </BrowserRouter>
  )
}

export default App