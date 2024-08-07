// src/admin/FreelancersPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchFreelancers } from './api';

const FreelancersPage = () => {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const getFreelancers = async () => {
      const data = await fetchFreelancers();
      setFreelancers(data);
    };

    getFreelancers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Freelancers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map(freelancer => (
              <tr key={freelancer.id} className="hover:bg-gray-50 transition-colors">
                
                <td className="py-3 px-6 border-b border-gray-200">{freelancer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FreelancersPage;
