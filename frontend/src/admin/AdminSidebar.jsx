import React, { useContext } from 'react';
import { FiUsers, FiSettings } from 'react-icons/fi';
import { UserContext } from '../context/UserContext';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { TbBriefcaseFilled } from 'react-icons/tb';

const AdminSidebar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);

  return (
    <div className="hidden md:block w-[20vw] border-r-2 h-full fixed top-0 left-0 bg-gray-900 text-gray-400">
      <div className="flex items-center justify-center py-4">
        <img src="/path-to-logo.png" alt="Sales Management Logo" className="h-16" />
      </div>
      <nav className="mt-4">
        <ul className="flex flex-col space-y-4">
          
              <li>
                <NavLink
                  to="/admin/overview"
                  className={({ isActive }) => `flex items-center p-4 text-lg ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}
                >
                  <FaHome className="mr-3 text-2xl" /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/clients"
                  className={({ isActive }) => `flex items-center p-4 text-lg ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}
                >
                  <FiUsers className="mr-3 text-2xl" /> Clients
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/freelancers"
                  className={({ isActive }) => `flex items-center p-4 text-lg ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}
                >
                  <FiUsers className="mr-3 text-2xl" /> Freelancers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/jobs"
                  className={({ isActive }) => `flex items-center p-4 text-lg ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}
                >
                  <TbBriefcaseFilled className="mr-3 text-2xl" /> Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) => `flex items-center p-4 text-lg ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}
                >
                  <FiSettings className="mr-3 text-2xl" /> Settings
                </NavLink>
              </li>
          
          <li>
            <button
              onClick={logoutUser}
              className="flex items-center p-4 text-lg hover:bg-gray-800 w-full"
            >
              <CgProfile className="mr-3 text-2xl" /> Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
