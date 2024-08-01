import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { JobContext } from '../context/JobContext';


const AvailableJobs = () => {
    const { jobs} = useContext(JobContext);

  return (
    <div>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white rounded-md shadow">Design</button>
            <button className="px-4 py-2 bg-white rounded-md shadow">New York</button>
          </div>
          <div className="flex space-x-4">
            <select className="px-4 py-2 bg-white rounded-md shadow">
              <option>Latest</option>
            </select>
            <select className="px-4 py-2 bg-white rounded-md shadow">
              <option>12 per page</option>
            </select>
            <button className="px-4 py-2 bg-white rounded-md shadow">Grid/List</button>
          </div>
        </div>
        <div className="space-y-4">
          {jobs.map(job => (
            <div
              key={job.id}
              className="p-6 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <div className="flex items-center mb-2">
                  <img
                    src={`https://logo.clearbit.com/${job.client_id}.com`}
                    alt={job.client_id}
                    className="w-10 h-10 mr-4 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.client_id}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{job.description}</p>
                  <p>{job.requirements}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">&lt;</button>
          <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">01</button>
          <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">02</button>
          <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">03</button>
          <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">04</button>
          <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">05</button>
          <button className="px-4 py-2 mx-1 bg-white rounded-md shadow">&gt;</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AvailableJobs;
