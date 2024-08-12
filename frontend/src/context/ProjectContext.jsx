import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { server_url } from '../../config.json';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [freelancerProjects, setFreelancerProjects] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);
  const [acceptedFreelancers, setAcceptedFreelancers] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('access_token'));

  // Fetch all projects
  const fetchProjects = () => {
    fetch(`${server_url}/projects`, {
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
      .then(data => setProjects(data))
      .catch(error => {
        console.error('Failed to fetch projects:', error);
      });
  };

  // Fetch projects assigned to the freelancer
  const fetchFreelancerProjects = () => {
    fetch(`${server_url}/freelancer/projects`, {
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
      .then(data => setFreelancerProjects(data))
      .catch(error => {
        console.error('Failed to fetch freelancer projects:', error);
      });
  };

  // Fetch client projects
  const fetchClientProjects = () => {
    fetch(`${server_url}/client/projects`, {
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
      .then(data => setClientProjects(data))
      .catch(error => {
        console.error('Failed to fetch client projects:', error);
      });
  };

  // Update milestone status
  const updateMilestoneStatus = (milestoneId, status) => {
    fetch(`${server_url}/milestones/${milestoneId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: status === 'completed' })
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error: ${response.status} ${response.statusText}, Details: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        
        fetchFreelancerProjects(); 
        fetchClientProjects(); 
        toast.success('Milestone status updated successfully!');
      })
      .catch(error => {
        console.error('Failed to update milestone status:', error);
        toast.error(`Failed to update milestone status: ${error.message}`);
      });
  };

  // Create a new project
  const createProject = (projectData) => {
    return fetch(`${server_url}/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(newProject => {
        setProjects(prevProjects => [...prevProjects, newProject]);
        toast.success('Project created successfully!');
      })
      .catch(error => {
        console.error('Failed to create project:', error);
        toast.error('Failed to create project');
      });
  };

  // Fetch freelancers accepted by the current client
  const fetchAcceptedFreelancers = () => {
    return fetch(`${server_url}/freelancers/accepted`, {
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
        setAcceptedFreelancers(data);
        return data;
      })
      .catch(error => {
        console.error('Failed to fetch accepted freelancers:', error);
        return [];
      });
  };

  const contextData = {
    projects,
    freelancerProjects,
    clientProjects, 
    acceptedFreelancers,
    fetchProjects,
    fetchFreelancerProjects,
    fetchClientProjects, 
    createProject,
    updateMilestoneStatus,
    setAuthToken,
    fetchAcceptedFreelancers
  };

  useEffect(() => {
    if (authToken) {
      fetchProjects();
      fetchAcceptedFreelancers();
      fetchFreelancerProjects();
      fetchClientProjects(); 
    }
  }, [authToken]);

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
