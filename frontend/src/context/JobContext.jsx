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
            setJobs(data);
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }, []);

    // CREATE JOB
    const createJob = (title, description, requirements) => {
        return fetch(`${server_url}/jobpostings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                title,
                description,
                requirements,
            }),
        })
        .then(response => response.json())
        .then(newJob => {
            setJobs(previousJobs => [...previousJobs, newJob]);
            toast.success("Job posted successfully");
            return newJob;
        })
        .catch(error => {
            console.error("Error creating job:", error);
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
