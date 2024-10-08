import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { FaMoneyCheckAlt } from "react-icons/fa";

import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { RiProgress3Fill } from "react-icons/ri";
import { BiSolidAddToQueue } from "react-icons/bi";
import { TiUserAdd } from "react-icons/ti";
import { FaBriefcase } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";






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
            {/* <NavLink
            to="/client"
            end
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >       
            <FaHome className="mr-2" /> Overview
          </NavLink> */}
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
            <FaBriefcase  className="mr-2" /> My Jobs
          </NavLink>
          <NavLink
            to="/client/freelancers"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
             <MdPeopleAlt  className="mr-3 text-2xl" /> Freelancers
          </NavLink>
          <NavLink
            to="/client/projects/create-project"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <RiProgress3Fill className="mr-2"  />
          Projects
          </NavLink>                     
          <NavLink
            to="/client/payment"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            < FaMoneyCheckAlt className="mr-2"  />
          Payment
          </NavLink>                     
            </>
          )}   

            {/* FREELANCER  */}
        {currentUser && currentUser.is_freelancer && (
            <>
            <NavLink
            to="/freelancer/find-jobs"
            end
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >       
            <FaHome className="mr-2" /> Overview
          </NavLink>
            <NavLink
            to="/freelancer/updateprofile"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <TiUserAdd className="mr-2" /> Profile
          </NavLink>
          
          <NavLink
            to="/freelancer/applied-jobs"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <FaBriefcase  className="mr-2" /> Applied Jobs
          </NavLink>
          
          <NavLink
            to="/freelancer/projects"
            className={({ isActive }) => `p-4 flex items-center text-xl font-semibold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
          >
            <RiProgress3Fill className="mr-2"  />
          Projects
          </NavLink>                     
            </>
          )}     
               

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;