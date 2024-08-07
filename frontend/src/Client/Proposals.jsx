import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProposalContext } from '../context/ProposalContext';

const Proposals = () => {
  const { jobId } = useParams();
  const { fetchProposalsForJobPosting, proposals } = useContext(ProposalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProposals = async () => {
      await fetchProposalsForJobPosting(jobId);
      setLoading(false);
    };

    loadProposals();
  }, [jobId, fetchProposalsForJobPosting]);

  const jobTitle = proposals.length > 0 ? proposals[0]?.job_posting?.title : "N/A";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Proposals for Job Posting: {jobTitle}
        </h1>
        {proposals.length === 0 ? (
          <div className="flex justify-center">
            <h3 className="text-gray-500">No proposals found.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white border rounded-lg shadow-md p-4 hover:bg-gray-50">
                <p className="text-gray-800 mb-4">{proposal.content || 'Content Not Available'}</p>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Freelancer Details</h3>
                  <p><strong>Name:</strong> {proposal.freelancer?.firstname} {proposal.freelancer?.lastname}</p>
                  <p><strong>Email:</strong> {proposal.freelancer?.email || 'Email Not Available'}</p>
                  <p><strong>Skills:</strong> {proposal.freelancer?.skills || 'Skills Not Available'}</p>
                  <p><strong>Experience:</strong> {proposal.freelancer?.experience || 'Experience Not Available'}</p>
                </div>
                <p className="text-gray-500 mb-4">
                  <strong>Submitted:</strong> {new Date(proposal.created_at).toLocaleDateString()}
                </p>
                <div className="flex justify-end space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md">
                    Accept
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md">
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;
