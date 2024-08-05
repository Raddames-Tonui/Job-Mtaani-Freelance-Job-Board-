import { createContext, useEffect, useState } from "react";
import { server_url } from "../../config.json";
import { toast } from "react-hot-toast";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [userJobs, setUserJobs] = useState([]);

    // FETCH JOBS
    const fetchJobs = () => {
        fetch(`${server_url}/jobpostings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            const jobsWithTags = data.map(job => ({
                ...job,
                tags: job.tags ? job.tags.split(',').map(tag => tag.trim()) : []
            }));
            setJobs(jobsWithTags);
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
    };

    // FETCH USER JOBS
    const fetchUserJobs = () => {
        return fetch(`${server_url}/user/job_postings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user job postings');
            }
            return response.json();
        })
        .then(data => {
            const jobsWithTags = data.map(job => ({
                ...job,
                tags: job.tags ? job.tags.split(',').map(tag => tag.trim()) : []
            }));
            setUserJobs(jobsWithTags);
        })
        .catch(error => {
            console.error("Error fetching user job postings:", error);
        });
    };

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

    // DELETE JOB
    const deleteJob = (jobId) => {
        return fetch(`${server_url}/jobpostings/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete job');
            }
            setUserJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
            toast.success("Job deleted successfully");
        })
        .catch(error => {
            console.error("Error deleting job:", error);
            toast.error("Failed to delete job");
        });
    };

    // UPDATE JOB
    const updateJob = (jobId, jobDetails) => {
        return fetch(`${server_url}/jobpostings/${jobId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(jobDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update job');
            }
            return response.json();
        })
        .then(updatedJob => {
            const jobWithTags = {
                ...updatedJob,
                tags: updatedJob.tags ? updatedJob.tags.split(',').map(tag => tag.trim()) : []
            };
            setUserJobs(prevJobs => prevJobs.map(job => (job.id === jobId ? jobWithTags : job)));
            toast.success("Job updated successfully");
            return jobWithTags;
        })
        .catch(error => {
            console.error("Error updating job:", error);
            toast.error("Failed to update job");
            throw error;
        });
    };

    // APPLY FOR JOB
    const applyForJob = (jobId) => {
        return fetch(`${server_url}/jobpostings/${jobId}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to apply for job');
            }
            toast.success("Applied for job successfully");
        })
        .catch(error => {
            console.error("Error applying for job:", error);
            toast.error("Failed to apply for job");
        });
    };

    const contextData = {
        jobs,
        userJobs,
        setJobs,
        fetchJobs,
        fetchUserJobs,
        createJob,
        deleteJob,
        updateJob,
        applyForJob,
    };

    return (
        <JobContext.Provider value={contextData}>
            {children}
        </JobContext.Provider>
    );
};
