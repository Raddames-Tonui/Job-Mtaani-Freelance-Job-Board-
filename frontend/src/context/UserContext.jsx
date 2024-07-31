import React, { createContext, useState, useEffect } from 'react';
import { server_url } from "../../config.json";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data
        fetch(`${server_url}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();          
        })
        .then(data => {
            console.log('Fetched user data:', data);
            setUser(data);
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const contextData = {
        user,
        loading,
        error,
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
