import React from 'react';

const jobs = [
  { title: 'Marketing Manager', location: 'Remote', type: 'Full-time', company: 'Company A', logo: '🧑‍💼', id: 1 },
  { title: 'Project Manager', location: 'Remote', type: 'Full-time', company: 'Company B', logo: '📋', id: 2 },
  { title: 'Microcode Designer', location: 'Remote', type: 'Part-time', company: 'Company C', logo: '💻', id: 3 },
  // Add more jobs as necessary
];

const JobList = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input className="border p-2 w-1/3" type="text" placeholder="Job title, keywords" />
        <input className="border p-2 w-1/4" type="text" placeholder="Location" />
        <select className="border p-2 w-1/4">
          <option value="">Select Category</option>
          <option value="it">IT</option>
          <option value="marketing">Marketing</option>
          <option value="design">Design</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded w-1/6">Apply Now</button>
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="p-4">
          {jobs.map(job => (
            <div key={job.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <div className="text-2xl mr-4">{job.logo}</div>
                <div>
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p>{job.location} - {job.type}</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
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
