import React, { useState, useEffect } from 'react';
import { server_url } from '../../config.json';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdBookmarkAdd } from "react-icons/md";


const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [acceptedFreelancers, setAcceptedFreelancers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    if (!authToken) return;

    // Fetch freelancers
    fetch(`${server_url}/users?is_freelancer=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setFreelancers(data);
    })
    .catch((error) => {
      toast.error("Network error: " + error.message);
    });

    // Fetch accepted freelancers
    fetch(`${server_url}/freelancers/accepted`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setAcceptedFreelancers(data);
    })
    .catch((error) => {
      toast.error("Network error: " + error.message);
    });
  }, [authToken]);

  const handleChoose = (id) => {
    fetch(`${server_url}/accepted-freelancers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ freelancer_id: id }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Freelancer added successfully!');
        setFreelancers(freelancers.map(freelancer =>
          freelancer.id === id ? { ...freelancer, status: 'accepted' } : freelancer
        ));
        setAcceptedFreelancers([...acceptedFreelancers, data]);
      }
    })
    .catch(err => {
      toast.error(`Error: ${err.message}`);
    });
  };

  const handleRemove = (id) => {
    fetch(`${server_url}/accepted-freelancers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Freelancer removed successfully!');
        setFreelancers(freelancers.map(freelancer =>
          freelancer.id === id ? { ...freelancer, status: 'not-accepted' } : freelancer
        ));
        setAcceptedFreelancers(acceptedFreelancers.filter(freelancer => freelancer.id !== id));
      }
    })
    .catch(err => {
      toast.error(`Error: ${err.message}`);
    });
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      (freelancer.skills && freelancer.skills.toLowerCase().includes(lowercasedQuery)) ||
      (freelancer.experience && freelancer.experience.toLowerCase().includes(lowercasedQuery)) ||
      (freelancer.education && freelancer.education.toLowerCase().includes(lowercasedQuery)) ||
      (freelancer.location && freelancer.location.toLowerCase().includes(lowercasedQuery))
    );
  });

  const isAccepted = (id) => acceptedFreelancers.some(freelancer => freelancer.id === id);

  const getCardColor = (id) => {
    return isAccepted(id)
      ? 'bg-green-50 border-green-400 hover:bg-green-100'
      : 'bg-yellow-100 border-yellow-400 hover:bg-yellow-100';
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

        <div className="mb-6">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
            placeholder="Search by skills, experience, education, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className={`border rounded-lg shadow-md p-6 cursor-pointer ${getCardColor(freelancer.id)} transition-transform transform hover:scale-105`}
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
                  onClick={() => handleChoose(freelancer.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex justify-center items-center"
                >
                  Save Freelancer <span className='ml-2 text-xl'><MdBookmarkAdd /> </span>
                </button>
                {/* <button
                  onClick={() => handleRemove(freelancer.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Decline
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Freelancers;
