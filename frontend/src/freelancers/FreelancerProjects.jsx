import React, { useState, useEffect } from 'react';
import { server_url } from "../../config.json";

const FreelancerProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token from localStorage (or wherever you store it)
    const token = localStorage.getItem('token');

    // Fetch projects from the backend using fetch with Promises
    fetch(`${server_url}/projects`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Freelance Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Deadline:</strong> {project.deadline}</p>
            {project.freelancer && (
              <p><strong>Freelancer:</strong> {project.freelancer.firstname} {project.freelancer.lastname} ({project.freelancer.username})</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreelancerProjects;
