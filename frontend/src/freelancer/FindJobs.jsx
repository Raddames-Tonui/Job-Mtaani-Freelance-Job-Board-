import React, { useContext, useEffect, useState } from "react";
import { JobContext } from "../context/JobContext";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { formatDistanceToNow } from "date-fns";

const FindJobs = () => {
  const { jobs, fetchJobs, applyForJob } = useContext(JobContext);

  // Creating the job modal to display on top of jobs
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
    <div className="">
      <h1 className="flex justify-center font-bold text-3xl pt-6 text-blue-500 my-5">
        Available Job Postings
      </h1>

      {jobs.length === 0 ? (
        <h3>No job postings found.</h3>
      ) : (
        <div className="flex justify-center md:justify-start md:ml-10">
          <div className="grid grid-cols-1 gap-3">
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

      <JobDetails
        isOpen={isModalOpen}
        onClose={closeModal}
        job={selectedJob}
        timeAgo={selectedJob?.timeAgo} 
      />
    </div>
  );
};

export default FindJobs;
