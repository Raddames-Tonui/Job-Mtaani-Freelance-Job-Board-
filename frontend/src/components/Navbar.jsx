import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BiSolidBadgeCheck } from 'react-icons/bi';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <div className="relative bg-green-800 flex h-[10vh]">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex text-2xl font-bold text-white ml-2">
                        GigConnect
                            <BiSolidBadgeCheck className="text-3xl text-[#35ca22]" />
                        </NavLink>

                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6">
                     
                    <NavLink to="/" className="text-white hover:underline font-semibold hover:font-bold">Home</NavLink>

                                <NavLink to="/users/profile_update" className="text-white hover:underline font-semibold hover:font-bold">Update profile</NavLink>
                                {/* <button
                                    className="relative w-24 h-10 rounded-3xl text-sm font-inherit border-none overflow-hidden z-10 bg-gradient-to-r from-[#36e66e] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd850] hover:to-[#35ca22] transition-all duration-500 ring-slate-900 hover:ring-black"
                                    // onClick={logout_user}
                                >
                                    <span className="relative z-10 px-2 text-black font-semibold">
                                        Log Out
                                    </span>
                                </button> */}
                                <img 
                                    // src={currentUser?.avatar} 
                                    alt="Profile Picture" 
                                    className="rounded-full w-12 h-12 ring-2 ring-[#35ca22] object-cover" 
                                />
                   
                                <NavLink to="/users/signup" className="text-white hover:underline font-semibold hover:font-bold">Sign Up</NavLink>
                                <button
                                    className="relative w-24 h-10 rounded-3xl text-sm font-inherit border-none overflow-hidden z-10 bg-gradient-to-r from-[#36e66e] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd850] hover:to-[#35ca22] transition-all duration-500 ring-slate-900 hover:ring-black"
                                >
                                    <NavLink to="/users/signin" className="relative z-10 text-black font-semibold">
                                        Sign In
                                    </NavLink>
                                </button>
                   
                    </div>

                    {/* Mobile menu */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu}>
                            {isMobileMenuOpen ? <FaTimes className="text-2xl text-white" /> : <FaBars className="text-2xl text-white" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* {isMobileMenuOpen && (
                <>
                    <div className="md:hidden fixed inset-0 z-10" onClick={closeMobileMenu}></div>
                    <div className="md:hidden fixed top-auto right-0 w-[40vw] h-[90vh] z-20 bg-gray-800 opacity-90 flex justify-center items-center shadow-lg">
                        <div className="flex flex-col items-center space-y-6 py-4 px-6">
                            {currentUser ? (
                                <>
                                    <NavLink to="/users/tasks" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>My Tasks</NavLink>
                                    <NavLink to="/users/profile_update" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>Profile</NavLink>
                                    <button className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={logout_user}>
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>Home</NavLink>
                                    <NavLink to="/users/signup" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>Sign Up</NavLink>
                                    <NavLink to="/users/signin" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>Sign In</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )} */}
        </>
    );
};

export default Navbar;