import React, { useState, useEffect } from 'react';

const TrackProposals = () => {
  const [proposals, setProposals] = useState([]);
  const serverUrl = 'http://localhost:5000'; // Adjust this to match your backend URL

  useEffect(() => {
    fetch(`${serverUrl}/proposals`)
      .then(response => response.json())
      .then(data => setProposals(data))
      .catch(error => console.error('Error fetching proposals:', error));
  }, []);

  return (
    <div>
      <h1>Track Proposals</h1>
      {proposals.length > 0 ? (
        <ul>
          {proposals.map(proposal => (
            <li key={proposal.id}>
              <p>Proposal ID: {proposal.id}</p>
              <p>Content: {proposal.content}</p>
              <p>Freelancer ID: {proposal.freelancer_id}</p>
              <p>Job Posting ID: {proposal.job_posting_id}</p>
              <p>Created At: {proposal.created_at}</p>
              <p>Updated At: {proposal.updated_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals found.</p>
      )}
    </div>
  );
};

export default TrackProposals;
