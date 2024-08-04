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
      <h1 className="text-2xl font-bold mb-4 text-center">Proposals</h1>
      {proposals.length === 0 ? (
        <p className="text-center text-gray-600">No proposals available.</p>
      ) : (
        <div className="space-y-4">
          {proposals.map(proposal => (
            <div key={proposal.id} className="border-l-4 border-blue-500 bg-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Proposal ID: {proposal.id}</h2>
              <p className="text-gray-800 mb-2"><strong>Content:</strong> {proposal.content}</p>
              <div className="text-gray-600 mb-2">
                <p><strong>Freelancer ID:</strong> {proposal.freelancer_id}</p>
                <p><strong>Job Posting ID:</strong> {proposal.job_posting_id}</p>
              </div>
              <div className="text-gray-500 text-sm">
                <p><strong>Created At:</strong> {new Date(proposal.created_at).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(proposal.updated_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Proposals;
