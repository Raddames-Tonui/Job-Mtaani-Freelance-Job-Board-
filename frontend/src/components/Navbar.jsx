import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Icon } from '@iconify/react';


const Navbar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-blue-300  flex justify-between items-center px-6 h-[10vh] z-50">
      <div className="flex items-center space-x-2">
       
        {!currentUser ? (
                  <>
                    <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">JobQuest</Link>
                  
                  </>
                ) : (
                  <>
                    {currentUser.is_freelancer && (
                      <>
                        <Link to="/freelancer" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">JobQuest</Link>
                      
                      </>
                    )}
                    {currentUser.is_client && (
                      <>
                        <Link to="/client" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">JobQuest</Link>
                      </>
                    )}
                    {currentUser.is_admin && (
                      <>
                        <Link to="/admin" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">JobQuest</Link>
                      </>
                    )}
                  </>
                )}
        
      
      </div>

      <nav className="hidden md:flex space-x-6 text-gray-700">
        {!currentUser ? (
          <>
            <NavLink to="/" className="hover:underline font-semibold transition duration-300">Home</NavLink>
            <NavLink to="/customer-support" className="hover:underline font-semibold transition duration-300">Customer Support</NavLink>
            <NavLink to="/about" className="hover:underline font-semibold transition duration-300">About Us</NavLink>
          </>
        ) : (
          <>
            {currentUser.is_freelancer && (
              <>

                <NavLink to="/freelancer" className="hover:underline font-semibold transition duration-300">Find Jobs</NavLink>
                {/* <NavLink to="/freelancer/available-jobs" className="hover:underline font-semibold transition duration-300">Available Jobs</NavLink> */}
                <NavLink to="/freelancer/updateprofile" className="hover:underline font-semibold transition duration-300">Update Profile</NavLink>
                <NavLink to="/freelancer/applied-jobs" className="hover:underline font-semibold transition duration-300">Applied Jobs</NavLink>
              </>
            )}
            {currentUser.is_client && (
              <>
                <NavLink to="/client/update-profile" className="hover:underline font-semibold transition duration-300 whitespace-nowrap">Profile</NavLink>
                <NavLink to="/client/create-job" className="hover:underline font-semibold transition duration-300 whitespace-nowrap">Post Job</NavLink>
                {/* <NavLink to="/client/proposals" className="hover:underline font-semibold transition duration-300 whitespace-nowrap">Proposals</NavLink> */}
                <NavLink to="/client/freelancers" className="hover:underline font-semibold transition duration-300 whitespace-nowrap">Available Freelancers</NavLink>
              </>
            )}
            {currentUser.is_admin && (
              <>
              <NavLink to="/admin" className="hover:underline font-semibold transition duration-300 whitespace-nowrap">Dashboard</NavLink>

              </>
            )}
          </>
        )}
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        {currentUser ? (
          <>
          <button onClick={logoutUser} className="bg-blue-600 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition duration-300">Logout</button>
          {currentUser?.avatar ? (
            <img 
              src={currentUser?.avatar} 
              alt="Profile Picture" 
              className="rounded-full w-12 h-12 ring-1 ring-[#3322ca] object-cover" 
            />            
          ):
          (
            <Icon icon="healthicons:ui-user-profile" className='w-12 h-12'/>
          )            
          }
          
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
        <div className="absolute top-[10vh] left-0 w-full bg-gradient-to-b from-blue-200 to-blue-200 z-10 shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 text-blue-600">
            <NavLink to="/" className="hover:underline font-semibold transition duration-300">Home</NavLink>
            <NavLink to="/find-jobs" className="hover:underline font-semibold transition duration-300">Find Jobs</NavLink>
            <NavLink to="/employers" className="hover:underline font-semibold transition duration-300">Employers</NavLink>
            <NavLink to="/candidates" className="hover:underline font-semibold transition duration-300">Candidates</NavLink>
            <NavLink to="/blog" className="hover:underline font-semibold transition duration-300">Blog</NavLink>
            <NavLink to="/pages" className="hover:underline font-semibold transition duration-300">Pages</NavLink>

            {currentUser ? (
              <NavLink to="/" className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">Sign out</NavLink>
            ) : (
              <>
                <NavLink to="/login" className="py-2 px-4 text-blue-600 rounded-full hover:text-white transition duration-300">Login</NavLink>
                <NavLink to="/signup" className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">Sign up</NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
