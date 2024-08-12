import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import backgroundImage from '../assets/womanonlaptop.webp';

function Login() {
  const { loginUser } = useContext(UserContext);
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    loginUser(identifier, password); 
    setIdentifier("");
    setPassword("");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row  justify-center w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2 p-8">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300 flex justify-center">Job Mtaani</Link>
        <h2 className="text-2xl font-bold ">Log in</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username email"
                value={identifier || ""}
                onChange={e => setIdentifier(e.target.value)}
                required
                className="mt-2 block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
                placeholder="Username or Email"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password || ""}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-2 block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0  focus:border-blue-500"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="hidden md:block bg-cover bg-center text-white p-8" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="h-full flex flex-col justify-center items-center bg-black bg-opacity-50 p-6">
            <h3 className="text-3xl font-bold">Welcome back!</h3>
            <p className="mt-4 text-lg">Login to access your account and manage your job applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
