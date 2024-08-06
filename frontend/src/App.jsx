import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { JobProvider } from "./context/JobContext";

import Layout from "./Layout";
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
import AppliedJobs from "./freelancer/AppliedJobs";


import LayoutClient from "./LayoutClient";
import UpdateProfile from "./Client/UpdateProfile";
import Proposals from "./Client/Proposals";
import JobCreation from "./Client/JobCreation";
import Freelancers from "./Client/Freelancers";

import LayoutAdmin from "./LayoutAdmin";
import AdminDashboard from "./admin/AdminDashboard";
import ClientDashboard from "./Client/ClientDashboard";
import MyJobs from "./Client/UserJobPostings";

import SubmitProposal from './components/SubmitProposal';
import TrackProposals from './components/TrackProposals';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <JobProvider>
          <Routes>
            {/* FREELANCER ROUTES */}
            <Route path="/freelancer" element={<Layout />}>
              <Route index element={<FindJobs />} />
              <Route path="updateprofile" element={<UpdateFreelancerProfile />} />
              <Route path="available-jobs" element={<AvailableJobs />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
            </Route>

            {/* HOME ROUTES */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="reset-password/:token" element={<ResetPassword />} /> 
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="customer-support" element={<CustomerSupport />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NoPage />} />
            </Route>

            {/* CLIENT ROUTES */}
            <Route path="/client" element={<LayoutClient />}>
              <Route index element={<ClientDashboard />} />
              <Route path="create-job" element={<JobCreation />} />
              <Route path="update-profile" element={<UpdateProfile />} />
              <Route path="proposals" element={<Proposals />} />
              <Route path="my-jobs" element={<MyJobs />} />
              <Route path="freelancers" element={<Freelancers />} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<AdminDashboard />} />
            </Route>
          </Routes>
        </JobProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

