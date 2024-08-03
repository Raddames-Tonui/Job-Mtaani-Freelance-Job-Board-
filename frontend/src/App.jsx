import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./Layout";
import LayoutClient from "./LayoutClient";
import { UserProvider } from "./context/UserContext";
import { JobProvider } from "./context/JobContext";
import Home from "./home/Home";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import CustomerSupport from "./pages/CustomerSupport";
import JobList from "./jobs/JobList";
import JobCreation from "./jobs/JobCreation";
import Login from "./Authentication/Login";
import SignUpForm from "./Authentication/SignUpForm";
import ResetPassword from "./Authentication/ResetPassword";
import ForgotPassword from "./Authentication/ForgotPassword";
import FindJobs from "./freelancer/FindJobs";
import AvailableJobs from "./freelancer/AvailableJobs";



function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <JobProvider>
          
          <Routes>
            <Route path="/freelancer" element={<Layout />}>
              <Route path="jobs-list" element={<JobList />} />
              <Route path="find-jobs" element={<FindJobs />} />
              <Route path="available-jobs" element={<AvailableJobs />} />              
            </Route>

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="forgot-password" element={<ForgotPassword />} />  
              <Route path="customer-support" element={<CustomerSupport />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NoPage />} />          
            </Route>
              
            <Route path="/client" element={<LayoutClient />}>
              <Route index element={<JobCreation/>} />
              <Route path="create-job" element={<JobCreation />} />
            </Route>
          </Routes>
        </JobProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
