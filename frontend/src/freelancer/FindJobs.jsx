import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import { formatDistanceToNow } from 'date-fns';

const FindJobs = () => {
  const { jobs } = useContext(JobContext);

  return (
    <div className="p-4">
      <div className=''>
          {jobs.map(job => {
            const jobCreatedAt = new Date(job.created_at);
            const timeAgo = formatDistanceToNow(jobCreatedAt, { addSuffix: true }); // To post time

            return (
              <div key={job.id} className="bg-white hover:bg-blue-100 shadow-md rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <span className="text-sm text-gray-500">Posted {timeAgo}</span>
                </div>
                <div className="flex items-center mt-2">
                  {job.role && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{job.role}</span>
                  )}
                  <span className="text-gray-500 ml-2">{job.job_level}</span>
                  <span className="text-gray-500 ml-2">{job.education}</span>
                </div>
                <div className="mt-4 text-gray-700">
                  <p>{job.description}</p>
                </div>
                <div className="flex flex-wrap mt-4">
                  {job.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                  <span>{job.salary_type}</span>
                  {job.max_salary && <span>Est. budget: {job.max_salary}</span>}
                  {job.rate && <span>{job.salary_type}</span>}
                  {job.job_level && <span>{job.location}</span>}
                  {job.expiration_date && <span>{job.expiration_date}</span>}
                </div>
                <div className='flex justify-end mt-4'>
                  <button className='bg-blue-500 hover:bg-blue-700 px-3 text-white py-1 rounded-md'>Apply</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FindJobs;
