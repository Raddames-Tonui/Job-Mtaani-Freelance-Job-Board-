import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FiBell } from 'react-icons/fi';
import { FaMoneyCheckAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiProgress3Fill } from "react-icons/ri";
import { BiSolidAddToQueue } from "react-icons/bi";
import { TiUserAdd } from "react-icons/ti";
import { FaBriefcase } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

const Navbar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const renderMenuItems = () => {
    if (!currentUser) {
      return (
        <>
          <NavLink to="/" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/customer-support" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Customer Support</NavLink>
          <NavLink to="/about" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>About Us</NavLink>
        </>
      );
    } else if (currentUser.is_freelancer) {
      return (
        <>
          <NavLink to="/freelancer/updateprofile" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Profile</NavLink>
          <NavLink to="/freelancer/find-jobs" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Find Jobs</NavLink>
          <NavLink to="/freelancer/applied-jobs" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Applied Jobs</NavLink>
          <NavLink to="/freelancer/projects" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Projects</NavLink>
        </>
      );
    } else if (currentUser.is_client) {
      return (
        <>
          <NavLink to="/client/update-profile" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Profile</NavLink>
          <NavLink to="/client/create-job" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Post Job</NavLink>
          <NavLink to="/client/freelancers" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Available Freelancers</NavLink>
          <NavLink to="/client/my-jobs" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>My Jobs</NavLink>
          <NavLink to="/client/projects/create-project" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Projects</NavLink>
          <NavLink to="/client/payment" className="hover:underline font-semibold transition duration-300" onClick={closeMenu}>Payment</NavLink>
        </>
      );
    }
  };

  return (
    <header className={`fixed top-0 w-full ${currentUser?.is_admin ? 'bg-gradient-to-b from-blue-300 to-blue-200' : 'bg-blue-300'} flex justify-between items-center px-6 h-[10vh] z-50`}>
      <div className="flex items-center space-x-2">
        {currentUser && (
          <Link
            to={currentUser.is_freelancer ? "/freelancer/find-jobs" : "/client/update-profile"}
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Job Mtaani
          </Link>
        )}
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6 text-gray-700">
        {renderMenuItems()}
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        {currentUser ? (
          <>
            {currentUser?.avatar && (
              <img 
                src={currentUser.avatar} 
                alt="Profile Picture" 
                className="rounded-full w-10 h-10 ring-1 object-cover" 
              />
            )}
            <button
              onClick={logoutUser}
              className={`relative inline-flex items-center px-6 py-2 text-base font-medium text-white border-1 border-blue-500 rounded-full bg-blue-500 transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white ${currentUser.is_admin ? 'border-blue-700 text-blue-700 hover:bg-blue-700' : ''}`}
            >
              <span className="absolute inset-0 bg-indigo-600 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"></span>
              <span className="relative">Logout</span>
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="text-blue-600 hover:underline font-semibold transition duration-300">Login</NavLink>
            <NavLink to="/signup" className="bg-blue-600 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition duration-300">Sign up</NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-blue-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={`absolute top-[10vh] left-0 w-full ${currentUser?.is_admin ? 'bg-gradient-to-b from-blue-300 to-blue-200' : 'bg-blue-200'} z-10 shadow-md md:hidden`}>
          <nav className="flex flex-col items-center space-y-4 py-4 text-blue-600">
            {renderMenuItems()}
            {currentUser ? (
              <button onClick={logoutUser} className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300" onClick={closeMenu}>Logout</button>
            ) : (
              <>
                <NavLink to="/login" className="py-2 px-4 text-blue-600 rounded-full hover:text-white transition duration-300" onClick={closeMenu}>Login</NavLink>
                <NavLink to="/signup" className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300" onClick={closeMenu}>Sign up</NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
