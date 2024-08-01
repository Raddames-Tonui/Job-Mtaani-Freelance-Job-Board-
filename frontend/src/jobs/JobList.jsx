import React from 'react';

const jobs = [
  {
    id: 1,
    title: 'Marketing Manager',
    location: 'New Mexico, USA',
    salary: '$50k-$80k/month',
    daysRemaining: '4 Days Remaining',
    type: 'Full Time',
    featured: true,
    remote: true,
    logo: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    title: 'Project Manager',
    location: 'Dhaka, Bangladesh',
    salary: '$50k-$80k/month',
    daysRemaining: '4 Days Remaining',
    type: 'Full Time',
    featured: true,
    remote: false,
    logo: 'https://via.placeholder.com/50',
  },
  {
    id: 3,
    title: 'Interaction Designer',
    location: 'New York, USA',
    salary: '$50k-$80k/month',
    daysRemaining: '4 Days Remaining',
    type: 'Full Time',
    featured: true,
    remote: false,
    logo: 'https://via.placeholder.com/50',
  },
  {
    id: 4,
    title: 'Networking Engineer',
    location: 'Washington, USA',
    salary: '$300k-$335k',
    daysRemaining: '4 Days Remaining',
    type: 'Full Time',
    featured: false,
    remote: false,
    logo: 'https://via.placeholder.com/50',
  },
  {
    id: 5,
    title: 'Product Designer',
    location: 'Ohio, USA',
    salary: '$50k-$80k/month',
    daysRemaining: '4 Days Remaining',
    type: 'Full Time',
    featured: false,
    remote: false,
    logo: 'https://via.placeholder.com/50',
  },
];

const JobList = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <input
          className="border p-2 mb-2 lg:mb-0 w-full lg:w-1/4"
          type="text"
          placeholder="Job title, Keyword..."
        />
        <input
          className="border p-2 mb-2 lg:mb-0 w-full lg:w-1/4"
          type="text"
          placeholder="Location"
        />
        <select className="border p-2 mb-2 lg:mb-0 w-full lg:w-1/4">
          <option value="">Select Category</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded w-full lg:w-1/6">
          Find Job
        </button>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <div className="mb-2 lg:mb-0">
          <button className="border p-2 mr-2 rounded">Design</button>
          <button className="border p-2 rounded">New York</button>
        </div>
        <div className="flex items-center">
          <select className="border p-2 mr-2">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <select className="border p-2 mr-2">
            <option value="12">12 per page</option>
            <option value="24">24 per page</option>
            <option value="36">36 per page</option>
          </select>
          <button className="border p-2 rounded">🔲</button>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="p-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`flex flex-col lg:flex-row items-start lg:items-center justify-between border-b py-4 ${job.featured ? 'bg-yellow-50' : ''}`}
            >
              <div className="flex items-start lg:items-center">
                <img
                  src={job.logo}
                  alt={job.title}
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p className="text-gray-600">
                    {job.location} • {job.salary} • {job.daysRemaining}
                  </p>
                  <div className="flex flex-wrap items-center">
                    {job.featured && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2 mb-1">
                        Featured
                      </span>
                    )}
                    {job.remote && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mb-1">
                        Remote
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center mt-2 lg:mt-0">
                <span className="text-blue-500 text-sm font-bold mr-4">
                  {job.type}
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="border px-4 py-2 mx-1 rounded">1</button>
        <button className="border px-4 py-2 mx-1 rounded">2</button>
        <button className="border px-4 py-2 mx-1 rounded">3</button>
        {/* Add more pagination buttons as necessary */}
      </div>
    </div>
  );
};

export default JobList;
