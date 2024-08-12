import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FiBell} from 'react-icons/fi';

const AdminNavbar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-gray-900 flex justify-between items-center px-6 h-[10vh] z-50 border-b-2 border-b-white">
      <div className="flex items-center space-x-2">
    
                <Link to="/admin/overview" className="text-2xl font-bold text-white hover:text-blue-800 transition duration-300">Job Mtaani</Link>
       
       
        <button onClick={toggleMenu} className="md:hidden text-gray-400 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
      </div>

      <nav className="hidden md:flex space-x-6 text-gray-400">
            <NavLink to="/admin/overview" className="hover:underline transition duration-300">Overview</NavLink>
            <NavLink to="/admin/clients" className="hover:underline transition duration-300">Clients</NavLink>
            <NavLink to="/admin/freelancers" className="hover:underline transition duration-300">Freelancers</NavLink>
            <NavLink to="/admin/jobs" className="hover:underline transition duration-300">Jobs</NavLink> 
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        {currentUser ? (
          <>
            <FiBell className="text-gray-400 w-6 h-6 mr-10" />
            <button onClick={logoutUser} className="py-2 px-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 font-bold transition duration-300">Logout</button>
            
          </>
        ) : (
          <>
            <NavLink to="/login" className="text-blue-600 hover:underline font-semibold transition duration-300">Login</NavLink>
            <NavLink to="/signup" className="bg-blue-600 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition duration-300">Sign up</NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-gray-800 z-10 shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 text-gray-400">
            {currentUser && currentUser.is_admin && (
              <>
                <NavLink to="/admin/overview" className="hover:underline transition duration-300">Overview</NavLink>
                <NavLink to="/admin/clients" className="hover:underline transition duration-300">Clients</NavLink>
                <NavLink to="/admin/freelancers" className="hover:underline transition duration-300">Freelancers</NavLink>
                <NavLink to="/admin/jobs" className="hover:underline transition duration-300">Jobs</NavLink>
              </>
            )}
            {currentUser ? (
              <button onClick={logoutUser} className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">Logout</button>
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

export default AdminNavbar;
