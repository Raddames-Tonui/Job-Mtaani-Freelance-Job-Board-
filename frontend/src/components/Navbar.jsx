import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  return (
    <header className="w-full flex justify-between items-center px-6 bg-gradient-to-b from-blue-400 to-blue-300 h-[10vh] border-b-1 border-gray-100">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-white">My Job</h1>
      </div>
      <nav className="hidden md:flex space-x-6 text-white">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/job-listings" className="hover:underline">Job Listings</NavLink>
        <NavLink to="/my-jobs" className="hover:underline">My Jobs</NavLink>
        <NavLink to="/messages" className="hover:underline">Messages</NavLink>
        <NavLink to="/profile" className="hover:underline">Profile</NavLink>
        <NavLink to="/admin-dashboard" className="hover:underline">Admin</NavLink>
      </nav>
      <div className="hidden md:flex items-center space-x-4">
        <NavLink to="/become-seller" className="text-white hover:underline">Got Job?</NavLink>
        <NavLink to="/login" className="py-2 px-4 border border-white text-white rounded-full hover:bg-white hover:text-black">Sign in</NavLink>
        <NavLink to="/signup" className="py-2 px-4 bg-black text-white rounded-full">Join</NavLink>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-gradient-to-b from-blue-300 to-blue-400 md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 text-white">
            <NavLink to="/" className="hover:underline">Home</NavLink>
            <NavLink to="/job-listings" className="hover:underline">Job Listings</NavLink>
            <NavLink to="/my-jobs" className="hover:underline">My Jobs</NavLink>
            <NavLink to="/messages" className="hover:underline">Messages</NavLink>
            <NavLink to="/profile" className="hover:underline">Profile</NavLink>
            <NavLink to="/admin-dashboard" className="hover:underline">Admin</NavLink>
            <NavLink to="/become-seller" className="hover:underline">Become a Seller</NavLink>
            <NavLink to="/login" className="py-2 px-4 border border-white text-white rounded-full hover:bg-white hover:text-black">Sign in</NavLink>
            <NavLink to="/signup" className="py-2 px-4 bg-black text-white rounded-full">Join</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

