import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

function ResetPassword() {
  const { resetPassword } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      resetPassword(token, newPassword);
    } else {
      toast.error("Passwords do not match");
    }
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="h-[90vh] flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-md w-full py-6 rounded-md shadow-md border-2 border-gray-200">
        <Link to="/" className="text-3xl font-bold text-blue-600 w-auto">JobQuest</Link>

        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>

        <form className="space-y-6 mt-8 w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
              New Password
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword || ""}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="New Password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword || ""}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#448bf5] to-[#47c1f9] hover:bg-gradient-to-r hover:from-[#3b73c7] hover:to-[#229aca] ring-1 ring-gray-600 transition-all duration-500"
            >
              Reset Password
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-600 text-md">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
