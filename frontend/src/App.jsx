import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { JobProvider } from "./context/JobContext";
import { ProposalProvider } from "./context/ProposalContext";
import { ProjectProvider } from "./context/ProjectContext";

import Layout from "./Layout/Layout";
import Home from "./home/Home";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import CustomerSupport from "./pages/CustomerSupport";

import Login from "./Authentication/Login";
import SignUpForm from "./Authentication/SignUpForm";
import ResetPassword from "./Authentication/ResetPassword";
import ForgotPassword from "./Authentication/ForgotPassword";
import TermsAndConditions from "./Authentication/TermsAndConditions";

import LayoutClient from "./Layout/LayoutClient";
import UpdateProfile from "./Client/UpdateProfile";
import Proposals from "./Client/Proposals";
import JobCreation from "./Client/JobCreation";
import Freelancers from "./Client/Freelancers";
import FreelancersSaved from "./Client/FreelancersSaved";
import UserJobPostings from "./Client/UserJobPostings";
import ClientDashboard from "./Client/ClientDashboard";
import ProjectForm from "./Client/ProjectForm";
import Projects from "./Client/Projects";

import LayoutAdmin from "./Layout/LayoutAdmin";
import OverviewPage from "./admin/OverviewPage";
import ClientsPage from "./admin/ClientsPage";
import FreelancersPage from "./admin/FreelancersPage";
import JobsPage from "./admin/JobsPage";
import Settings from "./admin/Settings";

import FindJobs from "./freelancers/FindJobs";
import AppliedJobs from "./freelancers/AppliedJobs";
import UpdateFreelancerProfile from "./freelancers/UpdateFreelancerProfile";
import FreelancerProjects from "./freelancers/FreelancerProjects";
import AccountPage from "./payment/AccountPage";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <JobProvider>
          <ProposalProvider>
            <ProjectProvider>
              <Routes>
                {/* FREELANCER ROUTES */}
                <Route path="/freelancer" element={<LayoutClient />}>
                  {/* <Route index element={<FreelancerDashboard />} /> */}
                  <Route path="find-jobs" element={<FindJobs />} />
                  <Route  path="updateprofile"  element={<UpdateFreelancerProfile />} />
                  <Route path="applied-jobs" element={<AppliedJobs />} />
                  <Route path="projects" element={<FreelancerProjects />} />
                </Route>
                
                {/* HOME ROUTES */}
                <Route path="/" element={<Layout />}>   
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUpForm />} />
                  <Route path="reset-password/:token" element={<ResetPassword />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />              
                  <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="customer-support" element={<CustomerSupport />} />
                  <Route path="about" element={<About />} />
                  <Route path="*" element={<NoPage />} />
                </Route>
                  

                {/* CLIENT ROUTES */}
                <Route path="/client" element={<LayoutClient />}>
                  <Route index element={<ClientDashboard />} />
                  <Route path="create-job" element={<JobCreation />} />
                  <Route path="update-profile" element={<UpdateProfile />} />
                  <Route path="my-jobs" element={<UserJobPostings />} />
                  <Route path="freelancers" element={<Freelancers />} />                  
                  <Route path="saved-freelancers" element={<FreelancersSaved />} />                  
                  <Route path="proposal/:jobId" element={<Proposals />} />
                  <Route path="my-projects" element={<Projects/>}/>
                  <Route path="projects/create-project" element={<ProjectForm />} />
                  <Route path="payment" element={<AccountPage/>}/>
                </Route>

                {/* ADMIN ROUTES */}
                <Route path="/admin" element={<LayoutAdmin />}>
                  <Route path="/admin/overview" element={<OverviewPage />} />
                  <Route path="clients" element={<ClientsPage />} />
                  <Route path="freelancers" element={<FreelancersPage />} />
                  <Route path="jobs" element={<JobsPage />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </ProjectProvider>
          </ProposalProvider>
        </JobProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
