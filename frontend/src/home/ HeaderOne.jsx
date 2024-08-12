import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import bgImage from "../assets/background.jpeg";

function HeaderOne() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative">
      <nav className="absolute top-2 w-full px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-row items-center justify-between">
            <NavLink
              to="/"
              className="text-white  py-2 mr-2 font-bold text-3xl"
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
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-white font-normal p-1 hover:text-gray-300 text-xl"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customer-support"
                  className="text-white font-normal p-1 hover:text-gray-300 text-xl"
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
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-white text-black py-2 px-4 hover:bg-gray-200"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(1, 0, 0, 0.2)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col justify-center md:w-7/12 lg:w-6/12">
            <h1 className="text-white mb-3 text-3xl md:text-3xl">
              Welcome to Job Mtaani
            </h1>
            <p className="text-white opacity-80 pr-6 mr-6">
              Your gateway to endless career opportunities. Explore, apply, and
              connect with top employers. Empowering your job search, one click
              at a time.
            </p>
            <div className="flex space-x-1 mt-3">
              <Link
                to="/signup"
                className="bg-white text-black py-2 px-4 hover:bg-gray-200"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="text-white py-2 px-4 hover:text-gray-300"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderOne;
