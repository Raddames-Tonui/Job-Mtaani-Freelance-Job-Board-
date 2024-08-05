// Sidebar.jsx
import React, { useContext } from 'react';
import { FiHome, FiUser, FiFilePlus, FiBriefcase, FiBookmark, FiDollarSign, FiUsers, FiSettings } from 'react-icons/fi';
import { UserContext } from '../context/UserContext';
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="hidden md:block w-[20vw] h-[90vh] fixed top-[10vh] z-50 bg-gradient-to-b from-blue-300 to-blue-200 border-r-white shadow-md">
      {currentUser && currentUser.username && (
        <>
          <div className='flex flex-col items-center justify-center mt-4'>
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.firstname} className='h-20 w-20 rounded-full border-2 border-white object-cover top-0' />
            ) : (
              <CgProfile className='h-16 w-16 text-black' />
            )}
            <h2 className="text-xl font-semibold mt-2 text-black capitalize">{currentUser.firstname} {currentUser.lastname}</h2>
          </div>
        </>
      )}
      <nav className="mt-4">
        <ul>
          <NavLink to="/client" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-white">
            <FiHome className="mr-2" /> Overview
          </NavLink>
          <NavLink to="/client/update-profile" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiUser className="mr-2" /> Employers Profile
          </NavLink>
          <NavLink to="/client/create-job" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiFilePlus className="mr-2" /> Post a Job
          </NavLink>
          <NavLink to="/client/my-jobs" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiBriefcase className="mr-2" /> My Jobs
          </NavLink>
          <NavLink to="/client/freelancers" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiBookmark className="mr-2" /> Saved Candidates
          </NavLink>
          <NavLink to="/client/plans-billing" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiDollarSign className="mr-2" /> Plans & Billing
          </NavLink>
          <NavLink to="/client/all-companies" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiUsers className="mr-2" /> All Companies
          </NavLink>
          <NavLink to="/client/settings" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiSettings className="mr-2" /> Settings
          </NavLink>
        </ul>
        <ul>
          <NavLink to="/freelancer/findjobs" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiHome className="mr-2" /> Find Jobs
          </NavLink>
          <NavLink to="/freelancer/update-profile" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiUser className="mr-2" /> Update Profile
          </NavLink>
          <NavLink to="/freelancer/available-jobs" className="p-4 hover:bg-gray-200 flex items-center" activeClassName="bg-gray-300">
            <FiBriefcase className="mr-2" /> Available Jobs
          </NavLink>
          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
