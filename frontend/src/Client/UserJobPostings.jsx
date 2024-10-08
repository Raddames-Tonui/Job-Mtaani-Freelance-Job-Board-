import React, { useContext, useEffect } from "react";
import { JobContext } from "../context/JobContext";
import ClientJobCard from "./ClientJobCard";

const UserJobPostings = () => {
  const { userJobs, fetchUserJobs, deleteJob } = useContext(JobContext);

  useEffect(() => {
    fetchUserJobs();
  }, [fetchUserJobs]);

  return (
    <div>
      <h1 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        My Job Postings
      </h1>
      {userJobs.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {userJobs.map((job) => (
            <ClientJobCard
              key={job.id}
              job={job}
              onDelete={() => deleteJob(job.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserJobPostings;