import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
    <header className="w-full flex justify-between items-center px-6 bg-gradient-to-b from-blue-300 to-blue-200 h-[10vh] border-b border-gray-100">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-blue-600">JobQuest</h1>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-700">
        {['/', '/find-jobs', '/employers', '/candidates', '/blog', '/pages'].map((path, index) => (
          <div key={index} className="relative group">
            <NavLink to={path} className="hover:underline" onClick={() => toggleDropdown(index)}>
              {path === '/' ? 'Home' : path.slice(1).replace('-', ' ').replace('/', '')}
            </NavLink>
            {isDropdownOpen === index && (
              <div className="absolute bg-white shadow-md rounded-md">
                {/* Define dropdown items based on path here */}
                <NavLink to={`${path}-list`} className="block px-4 py-2 hover:bg-gray-200">List</NavLink>
                <NavLink to={`${path}-grid`} className="block px-4 py-2 hover:bg-gray-200">Grid</NavLink>
                <NavLink to={`${path}-details`} className="block px-4 py-2 hover:bg-gray-200">Details</NavLink>
              </div>
            )}
          </div>
        ))}
      </nav>
      
      {/* Desktop Action Links */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLink to="/upload-cv" className="text-blue-600 hover:underline">Upload your CV</NavLink>
        <NavLink to="/login" className="py-2 px-4 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white">Login / Register</NavLink>
        <NavLink to="/job-post" className="py-2 px-4 bg-blue-600 text-white rounded-full">Job Post</NavLink>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-blue-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 text-blue-600">
            {['/', '/find-jobs', '/employers', '/candidates', '/blog', '/pages'].map((path, index) => (
              <NavLink key={index} to={path} className="hover:underline" onClick={toggleMenu}>
                {path === '/' ? 'Home' : path.slice(1).replace('-', ' ').replace('/', '')}
              </NavLink>
            ))}
            <NavLink to="/upload-cv" className="text-blue-600 hover:underline">Upload your CV</NavLink>
            <NavLink to="/login" className="py-2 px-4 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white">Login / Register</NavLink>
            <NavLink to="/job-post" className="py-2 px-4 bg-blue-600 text-white rounded-full">Job Post</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
