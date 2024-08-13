import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { JobContext } from "../context/JobContext";

import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { formatDistanceToNow } from "date-fns";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";


const FindJobs = () => {
  const { jobs, fetchJobs, applyForJob } = useContext(JobContext);
  const {currentUser} = useContext(UserContext);

  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (job) => {
    const jobCreatedAt = new Date(job.created_at);
    const timeAgo = formatDistanceToNow(jobCreatedAt, { addSuffix: true });

    setSelectedJob({ ...job, timeAgo });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleApply = (jobId) => {
    applyForJob({ content: "Application content", job_posting_id: jobId });
  };

  

  return (
    <div className="p-3">
      <h1 className="flex justify-center font-bold text-3xl  text-black my-4">
        Jobs You Might Like
      </h1>

      {jobs.length === 0 ? (
        <h3 className="text-center text-gray-500">No job postings found.</h3>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4  ">
          {/* Job cards */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4 justify-center">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                timeAgo={formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                onClick={() => openModal(job)}
                actions={[{ text: "Apply", onClick: () => handleApply(job.id) }]}
              />
            ))}
          </div>
       
        </div>
      )}
      
      {/* Job modal to display on top of jobs */}      
      <JobDetails
        isOpen={isModalOpen}
        onClose={closeModal}
        job={selectedJob}
        timeAgo={selectedJob?.timeAgo} 
        handleApply={handleApply}

      />
    </div>
  );
};

export default FindJobs;
