import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { server_url } from "../../config.json";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      fetch(`${server_url}/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: newPassword }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then(err => {
              throw new Error(err.message || 'Error resetting password');
            });
          }
        })
        .then(() => {
          toast.success('Password has been updated');
          setNewPassword("");
          setConfirmPassword("");
          navigate('/login'); 
        })
        .catch(error => {
          toast.error(error.message);
        });
    } else {
      toast.error('Passwords do not match');
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-md w-full py-6 rounded-md shadow-md border-2 border-gray-200">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">JobQuest</Link>

        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>

        <form className="space-y-4 mt-8 w-full" onSubmit={handleSubmit}>
          <div>
            <input
              id="new-password"
              name="new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              className="mt-2 block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="New Password"
            />
          </div>

          <div>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="mt-2 block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-md">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
