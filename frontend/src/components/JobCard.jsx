import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaLocationDot } from "react-icons/fa6";

const JobCard = ({ job, actions }) => {
  const jobCreatedAt = new Date(job.created_at);
  const timeAgo = formatDistanceToNow(jobCreatedAt, { addSuffix: true });

  return (
    <div className="bg-white hover:bg-blue-200 shadow-md rounded-lg p-6 mx-auto w-[60vw]">
      <h2>
        <span className="text-sm text-gray-500">Posted {timeAgo}</span>
      </h2>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{job.title}</h2>
      </div>
      <div className="flex items-center mt-2">
        {job.role && (
          <span className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-3.5 py-1 rounded-xl">{job.role}</span>
        )}
        <span className="text-gray-500 ml-2">{job.experience}</span>
        <span className="text-gray-500 ml-2">{job.education}</span>
      </div>
      <div className="mt-4 text-gray-700">
        <p>{job.description}</p>
      </div>
      <div className="flex flex-wrap mt-4">
        {job.tags && job.tags.map(tag => (
          <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{tag}</span>
        ))}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between mt-4 text-gray-500 text-sm">
        <div className="mb-2 md:mb-0 md:flex-1">
          <span>Payment: {job.salary_type}</span>
        </div>
        {job.max_salary && (
          <div className="mb-2 md:mb-0 md:flex-1">
            <span>Est. budget: {job.max_salary}</span>
          </div>
        )}
        {job.rate && (
          <div className="mb-2 md:mb-0 md:flex-1">
            <span>{job.salary_type}</span>
          </div>
        )}
        {job.job_level && (
          <div className="flex items-center mb-2 md:mb-0 md:flex-1">
            <FaLocationDot className="mr-1" />
            <span>{job.location}</span>
          </div>
        )}
        {job.expiration_date && (
          <div className="mb-2 md:mb-0 md:flex-1">
            <span>Last Day: {job.expiration_date}</span>
          </div>
        )}
      </div>
      <div className='flex justify-end mt-4'>
        {actions && actions.map((action, index) => (
          <button
            key={index}
            className='bg-blue-500 hover:bg-blue-700 px-3 text-white py-1 rounded-md ml-2'
            onClick={action.onClick}
          >
            {action.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
