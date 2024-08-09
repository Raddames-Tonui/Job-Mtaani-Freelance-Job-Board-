import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { server_url } from '../../config.json';

export const ProposalContext = createContext();

export const ProposalProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('access_token'));

  // Fetch all proposals
  const fetchProposals = () => {
    fetch(`${server_url}/user/proposals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setProposals(data);
      })
      .catch(error => {
        console.error('Failed to fetch proposals:', error);
      });
  };

  // Fetch proposals for a specific job posting
  const fetchProposalsForJobPosting = (jobPostingId) => {
    fetch(`${server_url}/job_postings/${jobPostingId}/proposals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setProposals(data);
      })
      .catch(error => {
        console.error('Failed to fetch proposals for job posting:', error);
        toast.error('Failed to fetch proposals for job posting');
      });
  };

  // Update proposal status and handle acceptance
  const updateProposalStatus = (proposalId, status) => {
    if (status === 'accepted') {
      // Call the route to accept the proposal
      fetch(`${server_url}/proposals/${proposalId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(updatedAcceptedFreelancer => {
          // Update local state or UI as needed
          toast.success('Proposal accepted and freelancer entry created');
        })
        .catch(error => {
          console.error('Failed to accept proposal:', error);
          toast.error('Failed to accept proposal');
        });
    } else {
      // Update proposal status normally
      fetch(`${server_url}/proposals/${proposalId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(updatedProposal => {
          setProposals(prevProposals =>
            prevProposals.map(proposal =>
              proposal.id === proposalId ? updatedProposal : proposal
            )
          );
          toast.success('Proposal status updated');
        })
        .catch(error => {
          console.error('Failed to update proposal status:', error);
          toast.error('Failed to update proposal status');
        });
    }
  };

  const refreshProposals = () => {
    fetchProposals();
  };

  useEffect(() => {
    if (authToken) {
      fetchProposals();
    }
  }, [authToken]);

  const contextData = {
    proposals,
    fetchProposals,
    fetchProposalsForJobPosting,
    updateProposalStatus,
    refreshProposals,
    setAuthToken
  };

  return (
    <ProposalContext.Provider value={contextData}>
      {children}
    </ProposalContext.Provider>
  );
};
