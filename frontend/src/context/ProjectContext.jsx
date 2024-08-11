import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { server_url } from '../../config.json'; 

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
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

  const contextData = {
    projects,
    acceptedFreelancers,
    fetchProjects,
    createProject,
    setAuthToken,
    fetchAcceptedFreelancers 
  };

  useEffect(() => {
    if (authToken) {
      fetchProjects();
      fetchAcceptedFreelancers();
    }
  }, [authToken]);

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
