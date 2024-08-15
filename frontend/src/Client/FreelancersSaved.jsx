import React, { useState, useEffect, useContext } from 'react';
import { server_url } from '../../config.json';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import { FaUserCircle } from 'react-icons/fa'; 

const FreelancersSaved = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [authToken] = useState(localStorage.getItem("access_token"));

  const { users } = useContext(UserContext);

  useEffect(() => {
    if (!authToken) return;

    fetch(`${server_url}/freelancers/accepted`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || "Failed to fetch freelancers");
        });
      }
      return response.json();
    })
    .then(data => setFreelancers(data))
    .catch(error => toast.error("Network error: " + error.message));
  }, [authToken]);

  const handleRemove = (id) => {
    if (!authToken) return;

    fetch(`${server_url}/accepted-freelancers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          toast.error(`Error: ${errorData.message || "Failed to remove freelancer"}`);
        });
      }
      setFreelancers(freelancers.filter(freelancer => freelancer.id !== id));
      toast.success("Freelancer removed successfully");
    })
    .catch(error => toast.error("Network error: " + error.message));
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="inline-flex">
            <NavLink 
              to="/client/freelancers"
              className={({ isActive }) => 
                `py-2 px-6 rounded-l-lg text-white ${isActive ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'}`
              }
            >
              All Freelancers
            </NavLink>
            <NavLink 
              to="/client/saved-freelancers"
              className={({ isActive }) => 
                `py-2 px-6 rounded-r-lg text-white ${isActive ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'}`
              }
            >
              Saved Freelancers
            </NavLink>
          </div>
        </div>

        {freelancers.length === 0 ? (
          <p className="text-center text-gray-600">No saved freelancers</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Avatar</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Experience</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Education</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Skills</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {freelancers.map(freelancer => (
                <tr key={freelancer.id}>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {freelancer.avatar ? (
    <FaUserCircle className="w-12 h-12 text-gray-400" />                    ) : (
                      <FaUserCircle className="w-12 h-12 text-gray-400" />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {freelancer.firstname} {freelancer.lastname}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {freelancer.experience}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {freelancer.education}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {freelancer.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {freelancer.skills}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleRemove(freelancer.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium mr-2"
                    >
                      Remove
                    </button>
                    {/* <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Message
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FreelancersSaved;
