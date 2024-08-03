// Sidebar.jsx
import React, { useContext } from 'react';
import { FiHome, FiUser, FiFilePlus, FiBriefcase, FiBookmark, FiDollarSign, FiUsers, FiSettings } from 'react-icons/fi';
import { UserContext } from '../context/UserContext';
// import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const {currentUser} = useContext(UserContext)
  // console.log(currentUser)
  return (
    <div className="hidden md:block w-[20vw] h-[90vh] fixed top-[10vh] z-50  bg-gradient-to-b from-blue-300 to-blue-200 border-r-white shadow-md ">
      {/* <div className="p-4 font-bold text-xl"><h1>{currentUser.firstname}</h1></div> */}
      <nav className="mt-4">
        <ul>
          <li className="p-4 hover:bg-gray-200 flex items-center">
            <FiHome className="mr-2" /> Overview
          </li>
          <li className="p-4 hover:bg-gray-200 flex items-center">
            <FiUser className="mr-2" /> Employers Profile
          </li>
          {/* <NavLink to="/client/create-job"  className="p-4 bg-gray-200 flex items-center">
            <FiFilePlus className="mr-2" /> Post a Job
          </NavLink> */}
          <li className="p-4 hover:bg-gray-200 flex items-center">
            <FiBriefcase className="mr-2" /> My Jobs
          </li>
          <li className="p-4 hover:bg-gray-200 flex items-center">
            <FiBookmark className="mr-2" /> Saved Candidate
          </li>
          <li className="p-4 hover:bg-gray-200 flex items-center">
            <FiDollarSign className="mr-2" /> Plans & Billing
          </li>
          <li className="p-4 hover:bg-gray-200 flex items-center">
            <FiUsers className="mr-2" /> All Companies
          </li>
          <li className="p-4 hover:bg-gray-200 flex items-center">
            <FiSettings className="mr-2" /> Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
