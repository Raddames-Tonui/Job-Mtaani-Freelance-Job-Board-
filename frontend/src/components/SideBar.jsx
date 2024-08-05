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
              <img src={currentUser.avatar} alt={currentUser.firstname} className='h-20 w-20 rounded-full border-2 border-white' />
            ) : (
              <CgProfile className='h-16 w-16 text-black' />
            )}
            <h2 className="text-xl font-semibold mt-2 text-black capitalize">{currentUser.firstname} {currentUser.lastname}</h2>
          </div>
        </>
      )}
      <nav className="mt-4">
        <ul>
          <li>
            <NavLink 
              to="/client/overview" 
              className={({ isActive }) => isActive ? "p-4 bg-white flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiHome className="mr-2" /> Overview
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/client/update-profile" 
              className={({ isActive }) => isActive ? "p-4 bg-gray-300 flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiUser className="mr-2" /> Employers Profile
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/client/create-job" 
              className={({ isActive }) => isActive ? "p-4 bg-gray-300 flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiFilePlus className="mr-2" /> Post a Job
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/client/my-jobs" 
              className={({ isActive }) => isActive ? "p-4 bg-gray-300 flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiBriefcase className="mr-2" /> My Jobs
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/client/saved-candidates" 
              className={({ isActive }) => isActive ? "p-4 bg-gray-300 flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiBookmark className="mr-2" /> Saved Candidates
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/client/plans-billing" 
              className={({ isActive }) => isActive ? "p-4 bg-gray-300 flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiDollarSign className="mr-2" /> Plans & Billing
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/client/all-companies" 
              className={({ isActive }) => isActive ? "p-4 bg-gray-300 flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiUsers className="mr-2" /> All Companies
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/client/settings" 
              className={({ isActive }) => isActive ? "p-4 bg-gray-300 flex items-center" : "p-4 hover:bg-gray-200 flex items-center"}
            >
              <FiSettings className="mr-2" /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
