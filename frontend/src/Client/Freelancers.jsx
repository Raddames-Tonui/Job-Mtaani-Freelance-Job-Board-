import React, { useState, useEffect, useContext } from 'react';
import { server_url } from '../../config.json';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdBookmarkAdd, MdDelete } from "react-icons/md"; 
import { UserContext } from '../context/UserContext';
import { FaUserCircle } from 'react-icons/fa'; 

const Freelancers = () => {
  const [acceptedFreelancers, setAcceptedFreelancers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { users } = useContext(UserContext);
  const [freelancers, setFreelancers] = useState([]);

  const authToken = localStorage.getItem("access_token");

  useEffect(() => {
    setFreelancers(users.filter(user => user.is_freelancer));

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
  }, [users, authToken]);

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
      }
    })
    .then(response => {
      if (response.ok) {
        toast.success('Freelancer removed successfully!');
        setAcceptedFreelancers(acceptedFreelancers.filter(freelancer => freelancer.id !== id));
      } else {
        toast.error('Failed to remove freelancer.');
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

        <table className="min-w-full bg-white border">
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
            {filteredFreelancers.map((freelancer) => (
              <tr
                key={freelancer.id}
                className={`cursor-pointer ${isAccepted(freelancer.id) ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'}`}
              >
                <td className="py-2 px-4 border-b border-gray-300">
                  {freelancer.avatar ? (
                    <img src={freelancer.avatar} alt="Profile" className="w-12 h-12 rounded-full" />
                  ) : (
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
                  {isAccepted(freelancer.id) ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleRemove(freelancer.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white w-32 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
                    >
                      Remove <span className='ml-2 text-xl'><MdDelete /></span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleChoose(freelancer.id);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white w-32 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
                    >
                      Save <span className='ml-2 text-xl'><MdBookmarkAdd /></span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Freelancers;
