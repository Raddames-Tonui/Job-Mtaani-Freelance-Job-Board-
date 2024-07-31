import { useState, createContext, useEffect } from "react";
import toast from 'react-hot-toast';
import { server_url } from "../../config.json";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

   

    // REGISTER USER
    const register_user = (username, email, avatar, password) => {
        fetch(`${server_url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar, email, username, password })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.success) {
                toast.success(res.success);
                nav("/users/login");
            } else if (res.error) {
                toast.error("User with this email or username already exists");
            } else {
                toast.error("An error occurred");
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    };

    useEffect(() => {
        // Fetch user data
        fetch(`${server_url}/clients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUser(data);
        })
        
    }, []);

    const contextData = {
        user
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};

// LOGIN USER
const login_user = (email, password) => {
    fetch(`${server_url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
    .then((response) => response.json())
    .then((res) => {
        if (res.access_token) {
            localStorage.setItem("access_token", res.access_token);
            setAuthToken(res.access_token);
            toast.success('Logged in');
            nav("/users/jobs");
        } else if (res.message) {
            toast.error(res.message);
        } else {
            toast.error("An error occurred");
        }
    })
    .catch((error) => {
        toast.error("Network error: " + error.message);
    });
};