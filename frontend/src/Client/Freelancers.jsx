import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Freelancers = () => {
  const { users, fetchUsers, currentUser, addAcceptedFreelancer, deleteAcceptedFreelancer } = useContext(UserContext);
  const [freelancers, setFreelancers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/login");
  //     return;
  //   }

  //   fetchUsers().catch((error) => {
  //     console.error("Failed to fetch users:", error);
  //   });
  // }, [fetchUsers, navigate, currentUser]);

  useEffect(() => {
    if (users) {
      setFreelancers(users.filter(user => user.is_freelancer));
    }
  }, [users]);

  const filteredFreelancers = freelancers.filter(freelancer => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      (freelancer.skills && freelancer.skills.toLowerCase().includes(lowercasedQuery)) ||
      (freelancer.experience && freelancer.experience.toLowerCase().includes(lowercasedQuery)) ||
      (freelancer.education && freelancer.education.toLowerCase().includes(lowercasedQuery)) ||
      (freelancer.location && freelancer.location.toLowerCase().includes(lowercasedQuery))
    );
  });

  const handleChoose = (id) => {
    addAcceptedFreelancer(id)
      .then(() => {
        console.log(`Freelancer with ID ${id} added successfully`);
      })
      .catch((error) => {
        console.error(`Failed to add freelancer with ID ${id}:`, error);
      });
  };

  const handleRemove = (id) => {
    deleteAcceptedFreelancer(id)
      .then(() => {
        console.log(`Freelancer with ID ${id} removed successfully`);
        setFreelancers(freelancers.filter(freelancer => freelancer.id !== id));
      })
      .catch((error) => {
        console.error(`Failed to remove freelancer with ID ${id}:`, error);
      });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Available Freelancers</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search by skills, experience, education, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.map((freelancer) => (
          <div key={freelancer.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 capitalize underline flex justify-center">{freelancer.firstname} {freelancer.lastname}</h2>
            <p><span className='font-semibold'> Experience:</span>  {freelancer.experience}</p>
            <p><span className='font-semibold'>Education:</span>  {freelancer.education}</p>
            <p><span className='font-semibold'>Location:</span>  {freelancer.location}</p>
            <h3 className="font-semibold underline flex justify-center">Skills</h3>
            <p>{freelancer.skills}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleChoose(freelancer.id)}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
              >
                Choose
              </button>
              <button
                onClick={() => handleRemove(freelancer.id)}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelancers;
