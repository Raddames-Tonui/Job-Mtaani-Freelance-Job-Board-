import React, { useContext, useEffect, useState } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import '../app.css';  

const AppliedJobs = () => {
  const { proposals, fetchProposals } = useContext(ProposalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProposals = async () => {
      await fetchProposals();
      setLoading(false);
    };
    
    loadProposals();
  }, [fetchProposals]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
        </div>
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">My Proposals</h1>
        <p>No proposals found</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Proposals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-yellow-100 border rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Proposal Content:</h2>
            <p className="mb-4">{proposal.content || 'Content Not Available'}</p>
            
            <h3 className="text-lg font-semibold mb-1">Job Posting:</h3>
            <p><strong>Title:</strong> {proposal.job_posting?.title || 'Title Not Available'}</p>
            <p><strong>Description:</strong> {proposal.job_posting?.description || 'Description Not Available'}</p>
            <p><strong>Location:</strong> {proposal.job_posting?.location || 'Location Not Available'}</p>
            <p><strong>Client:</strong> {proposal.job_posting?.client?.username || 'Client Not Available'}</p>

            <h3 className="text-lg font-semibold mt-4 mb-1">Freelancer:</h3>
            <p><strong>Name:</strong> {proposal.freelancer?.firstname} {proposal.freelancer?.lastname}</p>
            <p><strong>Email:</strong> {proposal.freelancer?.email || 'Email Not Available'}</p>
            <p><strong>Skills:</strong> {proposal.freelancer?.skills || 'Skills Not Available'}</p>
            <p><strong>Experience:</strong> {proposal.freelancer?.experience || 'Experience Not Available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
