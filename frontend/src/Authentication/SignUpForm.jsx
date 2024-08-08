import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from 'react-hot-toast';

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
    <section className="flex items-center justify-center py-6 px-6 lg:px-8">
      <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-md w-full py-6 rounded-md shadow-md border-2 border-gray-200">
        <Link to="/" className="text-3xl font-bold text-blue-600 w-auto">JobQuest</Link>

        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-2 w-full">
          {/* First Name and Last Name */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  value={formData.firstname || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  value={formData.lastname || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={formData.username || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={formData.email || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="repeatPassword"
                placeholder="Confirm Password"
                value={formData.repeatPassword || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="mt-4">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
              Role
            </label>
            <div className="mt-2">
              <select
                id="role"
                value={formData.role || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                required
              >
                <option value="" disabled>Select your role</option>
                {/* <option value="Admin">Admin</option> */}
                <option value="Freelancer">Freelancer</option>
                <option value="Client">Client</option>
              </select>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-600">
              I accept the{" "}
              <Link
                to="/terms-and-conditions"
                className="text-blue-500 hover:text-blue-700 transition duration-300"
              >
                terms and conditions
              </Link>
            </label>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="relative w-full h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#448bf5] to-[#47c1f9] hover:bg-gradient-to-r hover:from-[#3b73c7] hover:to-[#229aca] ring-1 ring-gray-600 transition-all duration-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-600 text-md">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUpForm;
