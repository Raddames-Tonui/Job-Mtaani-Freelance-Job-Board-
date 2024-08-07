import React, { useState, useEffect } from 'react';
import { server_url } from "../../config.json";

const AvailableFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = () => {
      fetch(`${server_url}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setFreelancers(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchFreelancers();
  }, []);

  const handleChoose = (id) => {
    console.log(`Chosen freelancer ID: ${id}`);
    // Add your logic for handling the chosen freelancer
  };

  const handleRemove = (id) => {
    setFreelancers(freelancers.filter(freelancer => freelancer.id !== id));
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Available Freelancers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <div key={freelancer.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{freelancer.name}</h2>
            <p className="text-gray-700">{freelancer.email}</p>
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

export default AvailableFreelancers;