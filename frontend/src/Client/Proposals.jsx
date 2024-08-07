import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProposalContext } from '../context/ProposalContext';
import { useContext } from 'react';

const Proposals = () => {
  const { jobId } = useParams();
  const { fetchProposalsForJobPosting, proposals } = useContext(ProposalContext);
  
  useEffect(() => {
    fetchProposalsForJobPosting(jobId);
  }, [jobId, fetchProposalsForJobPosting]);

  return (
    <div className="p-3">
      <h1 className="font-bold text-3xl text-black my-4">Proposals for Job Posting {jobId}</h1>
      {proposals.length === 0 ? (
        <h3 className="text-center text-gray-500">No proposals found.</h3>
      ) : (
        <div>
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <p className="text-gray-700">{proposal.content}</p>
              <p className="text-gray-500">Freelancer: {proposal.freelancer?.username}</p>
              <p className="text-gray-500">Submitted: {new Date(proposal.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proposals;
