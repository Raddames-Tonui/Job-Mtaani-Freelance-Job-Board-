// src/admin/JobsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchJobTitles } from './api';

const JobsPage = () => {
  const [jobTitles, setJobTitles] = useState([]);

  useEffect(() => {
    function loadJobTitles() {
      fetchJobTitles()
        .then(data => {
          console.log("Fetched job titles:", data); // Log the fetched data
          setJobTitles(data);
        })
        .catch(error => {
          console.error("Failed to fetch job titles:", error);
        });
    }
    loadJobTitles();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Titles</h2>
      {jobTitles.length > 0 ? (
        <ul className="list-disc pl-5">
          {jobTitles.map((title, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No job titles available</p>
      )}
    </div>
  );
};

export default JobsPage;
