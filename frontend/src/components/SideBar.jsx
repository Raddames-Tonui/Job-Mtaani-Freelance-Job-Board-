import React, { useContext } from 'react';
import {  FiBriefcase, FiDollarSign, FiUsers, FiSettings } from 'react-icons/fi';
import { UserContext } from '../context/UserContext';
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { RiProgress3Fill } from "react-icons/ri";
import { BiSolidAddToQueue } from "react-icons/bi";
import { TiUserAdd } from "react-icons/ti";
import { TbBriefcaseFilled } from "react-icons/tb";





const Sidebar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="hidden md:block w-[20vw] h-[90vh] fixed top-[10vh] z-50 bg-gradient-to-b from-blue-300 to-blue-200 border-t-gray-300 border-2 shadow-md">
      {currentUser && currentUser.username && (
        <div className='flex flex-col items-center justify-center mt-4'>
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.firstname} className='h-16 w-16 rounded-full border-2 border-white object-cover top-0 ring-1 ring-[#3322ca]' />
          ) : (
            <CgProfile className='h-16 w-16 text-black' />
          )}
          <h2 className="mt-2 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900 capitalize">
            {currentUser.firstname} {currentUser.lastname}
          </h2>
        </div>
      )}
      <nav className="mt-4">
        <ul>
          

        {/* CLIENT */}

        {currentUser && currentUser.is_client && (
            <>
            <NavLink
            to="/client"
            end
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >       
            <FaHome className="mr-2" /> Overview
          </NavLink>
            <NavLink
            to="/client/update-profile"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <TiUserAdd className="mr-2" /> Profile
          </NavLink>
          <NavLink
            to="/client/create-job"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <BiSolidAddToQueue className='mr-2'/>  Post a Job           
          </NavLink>
          <NavLink
            to="/client/my-jobs"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <FiBriefcase className="mr-2" /> My Jobs
          </NavLink>
          <NavLink
            to="/client/progress"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <RiProgress3Fill className="mr-2"  />
          Progress
          </NavLink>
          <NavLink
            to="/client/plans-billing"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <FiDollarSign className="mr-2" /> Plans & Billing
          </NavLink>
              
            </>
          )}     
          
     

          {/* ADMIN */}
          {currentUser && currentUser.is_admin && (
            <>
             <NavLink
            to="/admin"
            end
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >       
            <FaHome className="mr-2" /> Overview
          </NavLink>
              <NavLink
                to="/client/all-companies"
                className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              >
                <FiUsers className="mr-2" /> All Clients
              </NavLink>
              <NavLink
                to="/client/all-companies"
                className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              >
                <FiUsers className="mr-2" /> All Freelancers
              </NavLink>
              <NavLink
                to="/client/settings"
                className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              >
                <TbBriefcaseFilled className="mr-2"/>Available Jobs                
              </NavLink>
              <NavLink
                to="/client/settings"
                className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              >
                <FiSettings className="mr-2" /> Settings
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
