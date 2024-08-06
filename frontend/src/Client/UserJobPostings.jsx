import React, { useContext, useEffect } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';

const UserJobPostings = () => {
    const { userJobs, fetchUserJobs, deleteJob, updateJob } = useContext(JobContext);

    useEffect(() => {
        fetchUserJobs();
    }, []);

    const handleUpdate = (jobId) => {
        console.log(`Update job with ID: ${jobId}`);
    };

    return (
        <div>
            <h1 className='flex justify-center font-bold text-3xl pt-6 text-blue-500 my-5'>My Job Postings</h1>
            {userJobs.length === 0 ? (
                <p>No job postings found.</p>
            ) : (
                <div className="grid grid-cols-1  gap-2">
                    {userJobs.map(job => (
                        <JobCard 
                            key={job.id} 
                            job={job} 
                            actions={[
                                { text: "Update", onClick: () => handleUpdate(job.id) },
                                { text: "Delete", onClick: () => deleteJob(job.id) }
                            ]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserJobPostings;