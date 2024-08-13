import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProposalContext } from '../context/ProposalContext';
import { LuDownload } from "react-icons/lu";

const Proposals = () => {
  const { jobId } = useParams(); 
  const { fetchProposalsForJobPosting, proposals, updateProposalStatus, getResumeUrl } = useContext(ProposalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProposals = async () => {
      await fetchProposalsForJobPosting(jobId);
      setLoading(false);
    };

    loadProposals();
  }, [jobId, fetchProposalsForJobPosting]);

  const handleStatusChange = (proposalId, status) => {
    updateProposalStatus(proposalId, status);
  };

  const handleDownloadClick = (resumeFilename) => {
    const resumeUrl = getResumeUrl(resumeFilename);
    window.open(resumeUrl, '_blank');
  };

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

  const getCardColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 border-green-400 hover:bg-green-100';
      case 'denied':
        return 'bg-red-100 border-red-400 hover:bg-red-100';
      default:
        return 'bg-yellow-100 border-yellow-400 hover:bg-yellow-100';
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
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
              <div
                key={proposal.id}
                className={`border rounded-lg shadow-md p-6 cursor-pointer ${getCardColor(proposal.status)} transition-transform transform hover:scale-105`}
              >
                <div className="mb-4">
                  <div className="flex items-center mb-4">
                    <img src={proposal.freelancer?.avatar} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                    <h3 className="text-lg font-semibold text-gray-800">{proposal.freelancer?.firstname} {proposal.freelancer?.lastname}</h3>
                  </div>
                  <hr className="mb-4 border-t border-gray-300" />
                  <p className="text-gray-700"><strong>Email:</strong> {proposal.freelancer?.email || 'Not Available'}</p>
                  <p className="text-gray-700"><strong>Skills:</strong> {proposal.freelancer?.skills || 'Not Available'}</p>
                  <p className="text-gray-700"><strong>Experience:</strong> {proposal.freelancer?.experience || 'Not Available'}</p>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  <strong>Submitted:</strong> {new Date(proposal.created_at).toLocaleDateString()}
                </p>
                {/* <div className="flex justify-center items-center text-blue-600 cursor-pointer" onClick={() => handleDownloadClick(proposal.resume_path)}>
                  <LuDownload className="mr-2" />
                  <span className="font-semibold">Download CV</span>
                </div> */}
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-md"
                    onClick={(e) => { e.stopPropagation(); handleStatusChange(proposal.id, 'accepted'); }}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
                  >
                    Message
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                    onClick={(e) => { e.stopPropagation(); handleStatusChange(proposal.id, 'denied'); }}
                  >
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
