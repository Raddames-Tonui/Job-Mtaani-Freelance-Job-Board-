// src/admin/api.jsx

const API_BASE_URL = 'http://127.0.0.1:5555'; 

export const fetchClients = () => {
  return fetch(`${API_BASE_URL}/clients`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching clients:', error);
      return [];
    });
};

export const fetchFreelancers = () => {
  return fetch(`${API_BASE_URL}/freelancers`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching freelancers:', error);
      return [];
    });
};

export const fetchJobs = () => {
    return fetch(`${API_BASE_URL}/jobs`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        return [];
      });
  };
  
  export const fetchJobTitles = () => {
    return fetch(`${API_BASE_URL}/jobtitles`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching job titles:', error);
        return [];
      });
  };

  // src/admin/api.jsx
export const fetchClientCount = () => {
    return fetch('http://127.0.0.1:5555/stats/clients')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.count);
  };
  
  export const fetchFreelancerCount = () => {
    return fetch('http://127.0.0.1:5555/stats/freelancers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.count);
  };
  
  export const fetchJobCount = () => {
    return fetch('http://127.0.0.1:5555/stats/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.count);
  };
  