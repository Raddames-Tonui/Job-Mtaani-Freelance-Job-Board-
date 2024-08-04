import React, { useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const AvailableFreelancers = () => {

  const { FetchFreelancers } = UserContext(UserContext);
  const [freelancers, setFreelancers] = useState({
    username:'',
    email:'', 
   

  });

  useEffect(() => {
    const fetchFreelancers = () => {
      fetch(`${server_url}/users`)
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
 
  return (
    <div>
      <h1>Available Freelancers</h1>
      <ul>
        {freelancers.map((freelancer) => (
          <li key={freelancer.id}>
            <h2>{freelancer.name}</h2>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableFreelancers;
