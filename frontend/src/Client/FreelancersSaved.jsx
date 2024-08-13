import React, { useState, useEffect } from 'react';
import { server_url } from '../../config.json';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const FreelancersSaved = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const fetchFreelancers = async () => {
      if (!authToken) return;

      try {
        const response = await fetch(`${server_url}/freelancers/accepted`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFreelancers(data);
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || "Failed to fetch freelancers"}`);
        }
      } catch (error) {
        toast.error("Network error: " + error.message);
      }
    };

    fetchFreelancers();
  }, [authToken]);

  const handleRemove = async (id) => {
    if (!authToken) return;

    try {
      const response = await fetch(`${server_url}/accepted-freelancers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const updatedFreelancers = freelancers.filter(freelancer => freelancer.id !== id);
        setFreelancers(updatedFreelancers);
        toast.success("Freelancer removed successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Failed to remove freelancer"}`);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="border rounded-lg shadow-md p-6 cursor-pointer transition-transform transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <img src={freelancer.avatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-indigo-500 mr-4" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{freelancer.firstname} {freelancer.lastname}</h2>
                  <p className="text-gray-600"><strong>Experience:</strong> {freelancer.experience}</p>
                  <p className="text-gray-600"><strong>Education:</strong> {freelancer.education}</p>
                  <p className="text-gray-600"><strong>Location:</strong> {freelancer.location}</p>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">Skills</h3>
              <p className="text-gray-600 mb-4">{freelancer.skills}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleRemove(freelancer.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancersSaved;
