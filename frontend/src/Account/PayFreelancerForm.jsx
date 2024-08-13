import React, { useState, useEffect } from 'react';
import { server_url } from "../../config.json";


const PayFreelancerForm = ({ server_url }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setFilteredFreelancers(data);
          setLoading(false);
          console.log(freelancers)
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchFreelancers();
  }, [server_url]);

  useEffect(() => {
    // Filter freelancers based on search term
    if (searchTerm) {
      setFilteredFreelancers(
        freelancers.filter(freelancer =>
          freelancer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredFreelancers(freelancers);
    }
  }, [searchTerm, freelancers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount && description && selectedFreelancer) {
      setSuccess('Payment processed successfully!');
      setError(null);
      // Reset form
      setAmount('');
      setDescription('');
      setSelectedFreelancer(null);
    } else {
      setError('Please fill out all fields and select a freelancer.');
      setSuccess(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Pay Freelancer</h2>

      {/* Loading State */}
      {loading && <p className="text-gray-600">Loading freelancers...</p>}

      {/* Search Freelancer */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-gray-700 mb-1">Search Freelancer:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          placeholder="Search by name"
        />
      </div>

      {/* Freelancer Search Results */}
      {searchTerm && (
        <div className="mb-4">
          <ul className="space-y-2">
            {filteredFreelancers.map(freelancer => (
              <li
                key={freelancer.id}
                onClick={() => setSelectedFreelancer(freelancer)}
                className={`cursor-pointer p-2 border rounded-md ${selectedFreelancer?.id === freelancer.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              >
                {freelancer.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Freelancer */}
      {selectedFreelancer && (
        <div className="mb-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold text-blue-800">Selected Freelancer:</h3>
          <p>{selectedFreelancer.name}</p>
          <p>{selectedFreelancer.skills}</p>
        </div>
      )}

      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 mb-1">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-1">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
        >
          Pay Now
        </button>
        {success && (
          <div className="mt-4 text-green-600">
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default PayFreelancerForm;
