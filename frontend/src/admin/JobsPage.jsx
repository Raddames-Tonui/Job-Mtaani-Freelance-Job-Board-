import React, { useContext, useEffect } from 'react';
import { JobContext } from '../context/JobContext';

const JobsPage = () => {
  const { jobs, fetchJobs } = useContext(JobContext);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Titles</h2>
      {jobs.length > 0 ? (
        <ul className="list-disc pl-5">
          {jobs.map((job, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{job.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No job titles available</p>
      )}
    </div>
  );
};

export default JobsPage;
