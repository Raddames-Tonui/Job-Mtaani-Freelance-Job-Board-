import React, { useContext, useEffect } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';

const FindJobs = () => {
    const { jobs, fetchJobs, applyForJob } = useContext(JobContext);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return (
        <div>
            <h1 className='flex justify-center font-bold text-3xl pt-6 text-blue-500 my-5'>Available Job Postings</h1>
            {jobs.length === 0 ? (
                <p>No job postings found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-2">
                    {jobs.map(job => (
                        <JobCard 
                            key={job.id} 
                            job={job} 
                            actions={[{ text: 'Apply', onClick: () => applyForJob(job.id) }]} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindJobs;
