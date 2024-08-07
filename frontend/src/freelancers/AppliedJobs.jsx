import React, { useContext, useEffect, useState } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import '../app.css';  

const AppliedJobs = () => {
  const { proposals, fetchProposals } = useContext(ProposalContext);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  useEffect(() => {
    if (proposals.length > 0) {
      setLoading(false);
    }
  }, [proposals]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
        </div>
      </div>
    );
  }



  return (
    <div>
      <h1>My Proposals</h1>
      {proposals.length === 0 ? (
        <p>No proposals found</p>
      ) : (
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <h2>{proposal.content || 'Content Not Available'}</h2>
              <p>Freelancer: {proposal.freelancer?.email || 'Freelancer Not Available'}</p>
              <p>Client: {proposal.job_posting?.client?.username || 'Client Not Available'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedJobs;
