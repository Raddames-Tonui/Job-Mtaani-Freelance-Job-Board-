import { createContext, useEffect, useState } from "react";
import { server_url } from "../../config.json";
import { toast } from "react-hot-toast";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);

    // FETCH JOBS
    useEffect(() => {
        fetch(`${server_url}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setJobs(data);
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }, []); 

    // CREATE JOB
    const createJob = (title, description, client_id, requirements) => {
        fetch(`${server_url}/jobpostings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                client_id,
                requirements
            })
        })
        .then(response => response.json())
        .then(newJob => {
            setJobs(previousJobs => [...previousJobs, newJob]);
            toast.success("Task added successfully");
        })
        .catch(error => {
            console.error("Error creating job:", error);
        });
    };

    const contextData = {
        jobs,
        setJobs,
        createJob
    };

    return (
        <JobContext.Provider value={contextData}>
            {children}
        </JobContext.Provider>
    );
};
