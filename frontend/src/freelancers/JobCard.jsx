import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const JobCard = ({ job, actions, onClick, timeAgo }) => {
  return (
    <div
      className="bg-white hover:bg-blue-200 shadow-md rounded-lg p-6 md:mx-auto mx-2 md:w-[60vw] "
      
    >
      <h2>
        <span className="text-sm text-gray-500">Posted {timeAgo}</span>
      </h2>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{job.title}</h2>
      </div>
      <ul className="flex-row lg:flex items-center mt-2">
        <li>
          <span className="bg-blue-400 text-white text-xs font-semibold mr-2 px-3.5 py-1 rounded-xl">
            {job.role}
          </span>
        </li>
        <li>
          <span className="text-gray-500 ml-2">{job.experience}</span>
        </li>
        <li>
          <span className="text-gray-500 ml-2">{job.education}</span>
        </li>
      </ul>
      <div className="mt-4 text-gray-700">
        <p>{job.description}</p>
      </div>
      <div className="flex flex-wrap mt-4">
        {job.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
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
        {job.location && (
          <div className="flex items-center mb-2 md:mb-0 md:flex-1">
            <FaLocationDot className="mr-1 text-md" />
            <span>{job.location}</span>
          </div>
        )}
        {job.expiration_date && (
          <div className="mb-2 md:mb-0 md:flex-1">
            <span>Last Day: {job.expiration_date}</span>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-4">
      {actions?.map((action, index) => (
  <button
    key={index}
    onClick={onClick}
    className="relative inline-flex items-center justify-center px-3 py-1 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-blue-500 rounded-md shadow-md group"
  >
    <span className="absolute inset-0 flex items-center justify-center w-full h-full bg-blue-500 text-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </span>
    <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">
      View More Details
    </span>
    <span className="relative invisible">View More Details</span>
  </button>
))}

      </div>
    </div>
  );
};

export default JobCard;
