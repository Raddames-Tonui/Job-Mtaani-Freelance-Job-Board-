import { useState, createContext, useEffect } from "react";
import toast from 'react-hot-toast';
import { server_url } from "../../config.json";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);

    // ============================================ USER DETAILS ===============================================
    // Fetch all users
    const fetchAllUsers = () => {
        fetch(`${server_url}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    };

    useEffect(() => {
        if (authToken) {
            fetchAllUsers();
        }
    }, [authToken]);

    // DELETE USER
    const deleteUser = (id) => {
        fetch(`${server_url}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then((res) => {
            console.log('Delete response:', res);
            if (res.message) {
                toast.success(res.message);
                fetchAllUsers();
            } else if (res.error) {
                toast.error(res.error);
            }
        })
        .catch((error) => {
            console.error('Delete error:', error);
            toast.error("Network error: " + error.message);
        });
    };

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
        });
    };

    // UPDATE USER PROFILE
    const updateUserProfile = (profileData) => {
        fetch(`${server_url}/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(profileData)
        })
        .then((response) => response.json())
        .then(({ success, error }) => {
            if (success) {
                setCurrentUser((prev) => ({ ...prev, ...profileData })); 
                return success; 
            } else if (error) {
                throw new Error(error); 
            }
        })
        .catch((error) => {
            throw new Error("Network error: " + error.message); 
        })
        .finally(() => {
            toast.promise(Promise.resolve(), {
                loading: 'Saving...',
                success: <b>Profile updated!</b>,
                error: (error) => <b>{error.message || 'Could not update profile.'}</b>,
            });
        });
    };

    // ============================================= AUTHENTICATION =============================================
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

                if (res.is_admin) {
                    nav("/admin/overview");
                } else if (res.is_client) {
                    nav("/client");
                } else if (res.is_freelancer) {
                    nav("/freelancer/find-jobs");
                } else {
                    nav("/jobs-list");
                }

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

    // FETCH CURRENT USER
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
                nav("/login");
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    }, [authToken, nav]);

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
                toast.error("Unable to Log out!");
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    };

    // =========================================PASSWORD ===================================
    // RESET PASSWORD
    const resetPassword = (token, newPassword) => {
        fetch(`${server_url}/reset-password/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ new_password: newPassword })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.message === "Password has been reset") {
                toast.success(res.message);
                nav("/login");
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

    // =================================== ACCEPTED FREELANCER ==================================
    // Function to add an accepted freelancer
    const addAcceptedFreelancer = (freelancerId, jobPostingId = null) => {
        const body = {
            freelancer_id: freelancerId,
        };

        if (jobPostingId) {
            body.job_posting_id = jobPostingId;
        }

        fetch(`${server_url}/accepted-freelancers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            toast.success('Freelancer added successfully!');
            return data;
        })
        .catch(err => {
            toast.error(`Error: ${err.message}`);
        });
    };

    // Function to delete an accepted freelancer
    const deleteAcceptedFreelancer = (id) => {
        fetch(`${server_url}/accepted-freelancers/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            toast.success('Freelancer removed successfully!');
            return data;
        })
        .catch(err => {
            toast.error(`Error: ${err.message}`);
        });
    };

    // =================================== RATING ===================================
    // Function to create a rating
    const createRating = (userId, score, review) => {
        fetch(`${server_url}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ user_id: userId, score, review })
        })
        .then(response => response.json())
        .then(data => {
            toast.success('Rating created successfully!');
            return data;
        })
        .catch(err => {
            toast.error(`Error: ${err.message}`);
        });
    };

    // Function to update a rating
    const updateRating = (ratingId, score, review) => {
        fetch(`${server_url}/ratings/${ratingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ score, review })
        })
        .then(response => response.json())
        .then(data => {
            toast.success('Rating updated successfully!');
            return data;
        })
        .catch(err => {
            toast.error(`Error: ${err.message}`);
        });
    };

    const contextData = {
        currentUser,
        setCurrentUser,
        registerUser,
        loginUser,
        updateUserProfile, 
        logoutUser,
        resetPassword,
        authToken,
        users,
        deleteUser,
        addAcceptedFreelancer,
        deleteAcceptedFreelancer,
        createRating,
        updateRating
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
