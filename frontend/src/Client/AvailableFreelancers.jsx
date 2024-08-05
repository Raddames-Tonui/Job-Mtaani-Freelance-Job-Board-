import React, { useState, useEffect } from 'react';
import {server_url} from "../../config.json"

const AvailableFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = () => {
      fetch(`${server_url}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setFreelancers(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchFreelancers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Available Freelancers</h1>
      <ul>
        {freelancers.map((freelancer) => (
          <li key={freelancer.id}>
            <h2>{freelancer.name}</h2>
            <p>{freelancer.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableFreelancers;
