import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProposalContext } from '../context/ProposalContext';

const Proposals = () => {
  const { jobId } = useParams();
  const { fetchProposalsForJobPosting, proposals } = useContext(ProposalContext);

  useEffect(() => {
    fetchProposalsForJobPosting(jobId);
  }, [jobId, fetchProposalsForJobPosting]);

  const jobTitle = proposals.length > 0 ? proposals[0]?.job_posting?.title : "N/A";

  return (
    <div className="md:p-6  min-h-screen">
      <div className="bg-slate-100 p-6 rounded-lg shadow-md">
        <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Proposals for Job Posting: {jobTitle}
        </h1>
        {proposals.length === 0 ? (
          <div className='flex justify-center'>
            <h3 className="text-center text-gray-500 mt-6 flex justify-center">No proposals found.</h3>
          </div>
        ) : (
          <div className="mt-6">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white hover:bg-blue-200 my-2 p-6 rounded-lg shadow-md">
                <p className="text-gray-800 mb-2">{proposal.content}</p>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Freelancer Details</h3>
                  <p>
                    <span className='font-semibold'>Name:</span> {proposal.freelancer?.firstname} {proposal.freelancer?.lastname}
                  </p>
                  <p>
                    <span className='font-semibold'>Email:</span> {proposal.freelancer?.email}
                  </p>
                  <p>
                    <span className='font-semibold'>Skills:</span> {proposal.freelancer?.skills}
                  </p>
                  <p>
                    <span className='font-semibold'>Experience:</span> {proposal.freelancer?.experience}
                  </p>
                </div>
                <p className="text-gray-500 mb-2">
                  <span className='font-semibold'>Submitted:</span> {new Date(proposal.created_at).toLocaleDateString()}
                </p>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-500 hover:bg-blue-700 px-3 text-white py-1 rounded-md ml-2 w-24">
                    Accept
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 px-3 text-white py-1 rounded-md ml-2 w-24">
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
