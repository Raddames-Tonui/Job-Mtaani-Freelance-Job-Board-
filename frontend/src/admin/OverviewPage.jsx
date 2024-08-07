// src/admin/OverviewPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchClientCount, fetchFreelancerCount, fetchJobCount } from './api';

const OverviewPage = () => {
  const [clientCount, setClientCount] = useState(0);
  const [freelancerCount, setFreelancerCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    fetchClientCount()
      .then(count => setClientCount(count))
      .catch(error => console.error('Failed to fetch client count:', error));

    fetchFreelancerCount()
      .then(count => setFreelancerCount(count))
      .catch(error => console.error('Failed to fetch freelancer count:', error));

    fetchJobCount()
      .then(count => setJobCount(count))
      .catch(error => console.error('Failed to fetch job count:', error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">The Number of Clients</h3>
          <p className="text-3xl font-bold text-gray-800">{clientCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">The Number of Freelancers</h3>
          <p className="text-3xl font-bold text-gray-800">{freelancerCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">Number of Jobs</h3>
          <p className="text-3xl font-bold text-gray-800">{jobCount}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
