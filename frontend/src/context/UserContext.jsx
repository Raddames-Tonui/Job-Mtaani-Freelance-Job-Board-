import React, { createContext, useState, useEffect } from 'react';
// import server_url from "../../config.json";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data
        fetch("http://127.0.0.1:5555/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            // Log the entire response for debugging
            console.log('Response:', response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Expected JSON response but got ' + contentType);
            }
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
