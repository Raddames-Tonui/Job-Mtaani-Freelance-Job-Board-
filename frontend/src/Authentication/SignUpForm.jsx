import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-hot-toast';
import backgroundImage from '../assets/womanonlaptop.webp';

function SignUpForm() {
  const { registerUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    firstname: "",
    lastname: "",
    role: "",
    termsAccepted: false, 
  });

  function handleChange(e) {
    const { id, type, checked, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {
      username,
      email,
      password,
      repeatPassword,
      firstname,
      lastname,
      role,
      termsAccepted
    } = formData;

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
    } else if (!termsAccepted) {
      toast.error("You must accept the terms and conditions");
    } else {
      registerUser(
        username,
        email,
        password,
        firstname,
        lastname,
        role
      );

      setFormData({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        firstname: "",
        lastname: "",
        role: "",
        termsAccepted: false
      });
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row justify-center w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
      
        <div className="md:w-1/2 p-4 pl-6">
          <Link to="/" className="text-2xl  font-bold text-blue-600 hover:text-blue-800 transition duration-300 flex justify-center">Job Mtaani</Link>
          <h2 className="text-2xl font-bold ">Sign up</h2>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                id="firstname"
                type="text"
                value={formData.firstname || ""}
                onChange={handleChange}
                required
                className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
                placeholder="First Name"
              />
              <input
                id="lastname"
                type="text"
                value={formData.lastname || ""}
                onChange={handleChange}
                required
                className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
                placeholder="Last Name"
              />
            </div>

            <input
              id="username"
              type="text"
              value={formData.username || ""}
              onChange={handleChange}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
              placeholder="Username"
            />

            <input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
              placeholder="Email"
            />

            <input
              id="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
              placeholder="Password"
            />

            <input
              id="repeatPassword"
              type="password"
              value={formData.repeatPassword || ""}
              onChange={handleChange}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
              placeholder="Confirm Password"
            />

            <select
              id="role"
              value={formData.role || ""}
              onChange={handleChange}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
            >
              <option value="" disabled>Select your role</option>
              <option value="Admin">Admin</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Client">Client</option>
            </select>

            <div className="flex items-center">
              <input
                id="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-600">
                I accept the{" "}
                <Link
                  to="/terms-and-conditions"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  terms and conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="hidden md:block bg-cover bg-center text-white p-8" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="h-full flex flex-col justify-center items-center bg-black bg-opacity-50 p-6">
            <h3 className="text-3xl font-bold">Your journey starts here.</h3>
            <p className="mt-4 text-lg text-center">Join us today and connect with top employers to find your dream job.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
