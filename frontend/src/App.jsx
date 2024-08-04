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

import Login from "./Authentication/Login";
import SignUpForm from "./Authentication/SignUpForm";
import ResetPassword from "./Authentication/ResetPassword";
import ForgotPassword from "./Authentication/ForgotPassword";
import TermsAndConditions from "./Authentication/TermsAndConditions";


import FindJobs from "./freelancer/FindJobs";
import AvailableJobs from "./freelancer/AvailableJobs";
import UpdateFreelancerProfile from "./freelancer/UpdateFreelancerProfile";


import UpdateProfile from "./Client/UpdateProfile";
import Proposals from "./Client/Proposals";
import JobList from "./Client/JobList";
import JobCreation from "./Client/JobCreation";
import Freelancers from "./Client/Freelancers";
import Overview from "./Client/Overview";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <JobProvider>
          
          <Routes>
            {/* FREELANCER ROUTES */}
            <Route path="/freelancer" element={<Layout />}>
              <Route path="updateprofile" element={<UpdateFreelancerProfile/>}/>
              <Route path="jobs-list" element={<JobList />} />
              <Route path="find-jobs" element={<FindJobs />} />
              <Route path="available-jobs" element={<AvailableJobs />} />              
            </Route>

            {/*  */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions/>}/>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="forgot-password" element={<ForgotPassword />} />  
              <Route path="customer-support" element={<CustomerSupport />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NoPage />} />          
            </Route>
              {/* CLIENT ROUTES */}
            <Route path="/client" element={<LayoutClient />}>
              <Route index element={<Overview/>} />
              <Route path="overview" element={<Overview/>} />
              <Route path="create-job" element={<JobCreation />} />
              <Route path="update-profile" element={<UpdateProfile/>}/>
              <Route path="proposals" element={<Proposals/>}/>
              <Route path="freelancers" element={<Freelancers/>}/>
            </Route>
          </Routes>
        </JobProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
