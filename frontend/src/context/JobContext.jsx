import { createContext, useEffect, useState } from "react";
import { server_url } from "../../config.json";

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
            console.log(data);
            setJobs(data);
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }, []); 

    const contextData = {
        jobs,
        setJobs
    };

    return (
        <JobContext.Provider value={contextData}>
            {children}
        </JobContext.Provider>
    );
};
