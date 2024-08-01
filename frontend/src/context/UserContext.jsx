import { useState, createContext, useEffect } from "react";
import toast from 'react-hot-toast';
import { server_url } from "../../config.json";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);

// REGISTER USER
const registerUser = (username, email, password, firstname = '', lastname = '', role = '') => {
    let is_admin = false;
    let is_freelancer = false;
    let is_client = false;
    // Set flags based on role
    switch (role) {
        case 'Admin':
            is_admin = true;
            break;
        case 'Freelancer':
            is_freelancer = true;
            break;
        case 'Client':
            is_client = true;
            break;
        default:
            break;
    }

    fetch(`${server_url}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            username, email, password, firstname,
            lastname, 
            is_admin, is_freelancer, is_client 
        })
    })
    .then((response) => response.json())
    .then((res) => {
        if (res.username) {
            toast.success('Registration successful!');
            nav("/login");
        } else if (res.error) {
            toast.error("User with this email or username already exists");
        } else {
            toast.error("An error occurred");
        }
    })

};



    // UPDATE USER
    const updateUser = (username, avatar, password) => {
        const updatePromise = fetch(`${server_url}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ username, avatar, password })
        })
        .then((response) => response.json())
        .then(({ success, error }) => {
            if (success) {
                return success; 
            } else if (error) {
                throw new Error(error); 
            }
        })
        .catch((error) => {
            throw new Error("Network error: " + error.message); 
        });

        toast.promise(updatePromise, {
            loading: 'Saving...',
            success: <b>Settings saved!</b>,
            error: (error) => <b>{error.message || 'Could not save.'}</b>,
        })
        .then(() => {
            nav("/users/tasks");
        });
    };

    // LOGIN USER
    const loginUser = (identifier, password) => {
        fetch(`${server_url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.access_token) {
                localStorage.setItem("access_token", res.access_token);
                setAuthToken(res.access_token);
                toast.success('Logged in', { icon: '👏' });
                nav("/jobs-list");
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
    
    // LOG OUT USER
    const logoutUser = () => {
        fetch(`${server_url}/logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.success) {
                localStorage.removeItem("access_token");
                setAuthToken(null);
                setCurrentUser(null);
                toast.success(res.success);
                nav("/");
            } else {
                toast.error(res.error);
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    };

    useEffect(() => {
        if (!authToken) return;

        fetch(`${server_url}/current_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.email) {
                setCurrentUser(data);
            } else {
                setCurrentUser(null);
                localStorage.removeItem("access_token");
                setAuthToken(null);
                nav("/users/signin");
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    }, [authToken, nav]);

    const contextData = {
        currentUser,
        setCurrentUser,
        registerUser,
        loginUser,
        updateUser,
        logoutUser,
        authToken
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
