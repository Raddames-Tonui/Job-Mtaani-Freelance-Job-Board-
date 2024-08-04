import { createContext, useEffect, useState } from "react";
import { server_url } from "../../config.json";
import { toast } from "react-hot-toast";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);

    // FETCH JOBS
    useEffect(() => {
        fetch(`${server_url}/jobpostings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const jobsWithTags = data.map(job => ({
                ...job,
                tags: job.tags ? job.tags.split(',').map(tag => tag.trim()) : []
                // above checks if tags are empty it create null tags else splits the tags and returns an array
            }));
            setJobs(jobsWithTags);
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }, []);

    // CREATE JOB
    const createJob = (jobDetails) => {
        return fetch(`${server_url}/jobpostings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(jobDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create job');
            }
            return response.json();
        })
        .then(newJob => {
            const jobWithTags = {
                ...newJob,
                tags: newJob.tags ? newJob.tags.split(',').map(tag => tag.trim()) : []
            };
            setJobs(previousJobs => [...previousJobs, jobWithTags]);
            toast.success("Job posted successfully");
            return jobWithTags;
        })
        .catch(error => {
            console.error("Error creating job:", error);
            toast.error("Failed to post job");
            throw error;
        });
    };

    const contextData = {
        jobs,
        setJobs,
        createJob,
    };

    return (
        <JobContext.Provider value={contextData}>
            {children}
        </JobContext.Provider>
    );
};
