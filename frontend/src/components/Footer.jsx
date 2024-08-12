import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-300 pt-10 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">For Candidates</h2>
          <nav className="flex flex-col space-y-2">
            <NavLink to="/browse-jobs" className="  text-gray-900   font-semibold  hover:underline">Browse Jobs</NavLink>
            <NavLink to="/browse-categories" className="  text-gray-900   font-semibold  hover:underline">Browse Categories</NavLink>
            <NavLink to="/candidate-dashboard" className="  text-gray-900   font-semibold  hover:underline">Candidate Dashboard</NavLink>
            <NavLink to="/job-alerts" className="  text-gray-900   font-semibold  hover:underline">Job Alerts</NavLink>
            <NavLink to="/bookmarks" className="  text-gray-900   font-semibold  hover:underline">My Bookmarks</NavLink>
          </nav>
        </div>
        <div>
          <h2 className="text-xl  font-bold text-gray-800 mb-4">For Employers</h2>
          <nav className="flex flex-col space-y-2">
            <NavLink to="/browse-candidates" className="  text-gray-900   font-semibold  hover:underline">Browse Candidates</NavLink>
            <NavLink to="/employer-dashboard" className="  text-gray-900   font-semibold  hover:underline">Employer Dashboard</NavLink>
            <NavLink to="/add-job" className="  text-gray-900   font-semibold  hover:underline">Add Job</NavLink>
            <NavLink to="/job-packages" className="  text-gray-900   font-semibold  hover:underline">Job Packages</NavLink>
          </nav>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">About Us</h2>
          <nav className="flex flex-col space-y-2">
            <NavLink to="/about" className="  text-gray-900   font-semibold  hover:underline">About Us</NavLink>
            <NavLink to="/job-page-invoice" className="  text-gray-900   font-semibold  hover:underline">Job Page Invoice</NavLink>
            <NavLink to="/terms" className="  text-gray-900   font-semibold  hover:underline">Terms Page</NavLink>
            <NavLink to="/blog" className="  text-gray-900   font-semibold  hover:underline">Blog</NavLink>
            <NavLink to="/contact" className="  text-gray-900   font-semibold  hover:underline">Contact</NavLink>
          </nav>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Helpful Resources</h2>
          <nav className="flex flex-col space-y-2">
            <NavLink to="/site-map" className="  text-gray-900   font-semibold  hover:underline">Site Map</NavLink>
            <NavLink to="/terms-of-use" className="  text-gray-900   font-semibold  hover:underline">Terms of Use</NavLink>
            <NavLink to="/privacy-center" className="  text-gray-900   font-semibold  hover:underline">Privacy Center</NavLink>
            <NavLink to="/security-center" className="  text-gray-900   font-semibold  hover:underline">Security Center</NavLink>
            <NavLink to="/accessibility-center" className="  text-gray-900   font-semibold  hover:underline">Accessibility Center</NavLink>
          </nav>
        </div>
      </div>
      <hr className='border-gray-300 mt-12'/>
      <p className="text-center font-semibold text-black py-8">© 2024 Job Mtaani. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
