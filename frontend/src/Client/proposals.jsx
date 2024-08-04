// src/components/ProposalsList.jsx
// src/Client/Proposals.js
import React, { useEffect, useState } from 'react';

function Proposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Fetch proposals from the API
    fetch('http://127.0.0.1:5555/proposals')
      .then(response => response.json())
      .then(data => setProposals(data))
      .catch(error => console.error('Error fetching proposals:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Proposals</h1>
      {proposals.length === 0 ? (
        <p>No proposals available.</p>
      ) : (
        <ul>
          {proposals.map(proposal => (
            <li key={proposal.id} className="mb-4 p-4 border rounded-md shadow-sm">
              <p><strong>Proposal ID:</strong> {proposal.id}</p>
              <p><strong>Content:</strong> {proposal.content}</p>
              <p><strong>Freelancer ID:</strong> {proposal.freelancer_id}</p>
              <p><strong>Job Posting ID:</strong> {proposal.job_posting_id}</p>
              <p><strong>Created At:</strong> {new Date(proposal.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(proposal.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Proposals;
