import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { server_url } from '../../config.json';

export const ProposalContext = createContext();

export const ProposalProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('access_token'));

  // Function to fetch freelancer proposals
  const fetchProposals = () => {
    fetch(`${server_url}/user/proposals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setProposals(data);
    })
    .catch(() => {
      toast.error('Failed to fetch proposals');
    });
  };

  // Function to fetch all proposals for a specific job posting
  const fetchProposalsForJobPosting = (jobPostingId) => {
    fetch(`${server_url}/job_postings/${jobPostingId}/proposals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setProposals(data);
    })
    .catch(() => {
      toast.error('Failed to fetch proposals for job posting');
    });
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
    refreshProposals,
    setAuthToken
  };

  return (
    <ProposalContext.Provider value={contextData}>
      {children}
    </ProposalContext.Provider>
  );
};
