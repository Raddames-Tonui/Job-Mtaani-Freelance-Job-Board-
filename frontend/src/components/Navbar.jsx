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
    <header className=" w-full flex justify-between items-center px-6 bg-gradient-to-b from-blue-300 to-blue-200 h-[10vh] border-b-1 border-gray-100">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-xl font-bold text-blue-600">JobQuest</Link>
      </div>
      <nav className="hidden md:flex space-x-6 text-gray-700">
        <div className="relative">
          <NavLink to="/" className="hover:underline font-semibold">Home</NavLink>
          <div className="absolute hidden group-hover:block">
            <div className="bg-white shadow-md rounded-md">
              <NavLink to="/home" className="block px-16 py-2 hover:bg-blue-200">Home</NavLink>
            </div>
          </div>
        </div>
        <div className="relative group ">
          <NavLink to="/find-jobs" className="hover:underline font-semibold">Find Jobs</NavLink>
          <div className="absolute hidden group-hover:block w-[16vw]  ">
            <div className="bg-white shadow-md rounded-md flex flex-col justify-center mx-auto ">
              <NavLink to="/job-list" className="block px-16 py-2 hover:bg-blue-200 ">Job List</NavLink>
              <NavLink to="/job-grid" className="block px-16 py-2 hover:bg-blue-200  ">Job Grid</NavLink>
              <NavLink to="/job-details" className="block px-16 py-2 hover:bg-blue-200   ">Job Details</NavLink>
            </div>
          </div>
        </div>
        <div className="relative group">
          <NavLink to="/employers" className="hover:underline font-semibold">Employers</NavLink>
          <div className="absolute hidden group-hover:block">
            <div className="bg-white shadow-md rounded-md">
              <NavLink to="/employer-list" className="block px-16 py-2 hover:bg-blue-200">Employer List</NavLink>
              <NavLink to="/employer-grid" className="block px-16 py-2 hover:bg-blue-200">Employer Grid</NavLink>
              <NavLink to="/employer-details" className="block px-16 py-2 hover:bg-blue-200">Employer Details</NavLink>
            </div>
          </div>
        </div>
        <div className="relative group">
          <NavLink to="/candidates" className="hover:underline font-semibold">Candidates</NavLink>
          <div className="absolute hidden group-hover:block">
            <div className="bg-white shadow-md rounded-md  w-[16vw]">
              <NavLink to="/candidate-list" className="block  px-8 py-2 hover:bg-blue-200">Candidate List</NavLink>
              <NavLink to="/candidate-grid" className="block px-8 py-2 hover:bg-blue-200">Candidate Grid</NavLink>
              <NavLink to="/candidate-details" className="block px-8 py-2 hover:bg-blue-200">Candidate Details</NavLink>
            </div>
          </div>
        </div>
        <NavLink to="/blog" className="hover:underline font-semibold">Blog</NavLink>
        <div className="relative group">
          <NavLink to="/about" className="hover:underline font-semibold">About</NavLink>
 
        </div>
      </nav>
      <div className="hidden md:flex items-center space-x-4">
        <NavLink to="/upload-cv" className="text-blue-600 hover:underline font-semibold">Upload your CV</NavLink>
        <NavLink to="/login" className="py-2 px-4 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white">Login / Register</NavLink>
        <NavLink to="/job-post" className="py-2 px-4 bg-blue-600 text-white rounded-full">Job Post</NavLink>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden ">
        <button onClick={toggleMenu} className="text-blue-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-gradient-to-b from-blue-200 to-blue-200 border-t-2 z-10 shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 text-blue-600">
            <NavLink to="/" className="hover:underline font-semibold">Home</NavLink>
            <NavLink to="/find-jobs" className="hover:underline font-semibold">Find Jobs</NavLink>
            <NavLink to="/employers" className="hover:underline font-semibold">Employers</NavLink>
            <NavLink to="/candidates" className="hover:underline font-semibold">Candidates</NavLink>
            <NavLink to="/blog" className="hover:underline font-semibold">Blog</NavLink>
            <NavLink to="/pages" className="hover:underline font-semibold">Pages</NavLink>
            <NavLink to="/upload-cv" className="text-blue-600 hover:underline font-semibold">Upload your CV</NavLink>
            <NavLink to="/login" className="py-2 px-4 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white">Login / Register</NavLink>
            <NavLink to="/job-post" className="py-2 px-4 bg-blue-600 text-white rounded-full">Job Post</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
