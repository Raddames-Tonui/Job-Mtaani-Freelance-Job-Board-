import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // List of paths where the Navbar should not be displayed
  const noNavbarPaths = ['/login', '/signup', '/reset-password/:token', '/forgot-password'];
  
  const shouldDisplayNavbar = !noNavbarPaths.includes(location.pathname);

  if (!shouldDisplayNavbar) {
    return null; 
  }

  return (
    <nav className="absolute top-2 w-full px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          <NavLink
            to="/"
            className="text-white py-2 mr-2 font-bold text-3xl"
          >
            Job Mtaani
          </NavLink>
          <button
            className="block lg:hidden ml-auto border border-white text-white py-2 px-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <ul
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex p-0 my-0 mx-auto list-none flex-col lg:flex-row lg:space-x-4`}
          >
            <li>
              <NavLink
                to="/"
                className="text-white font-normal p-1 hover:text-gray-300 text-xl"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-white font-normal p-1 hover:text-gray-300 text-xl"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customer-support"
                className="text-white font-normal p-1 hover:text-gray-300 text-xl"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex ml-auto space-y-2 lg:space-y-0 lg:space-x-4`}
          >
            <NavLink
              to="/login"
              className="bg-transparent text-white border border-white py-2 px-4 hover:bg-white hover:text-black"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-white text-black py-2 px-4 hover:bg-gray-200"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarHome;
