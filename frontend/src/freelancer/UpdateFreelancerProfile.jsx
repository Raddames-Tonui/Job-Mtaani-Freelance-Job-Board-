import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from 'react-hot-toast';

function UpdateFreelancerProfile() {
    const { currentUser, update_user } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (!currentUser) {
            navigate("/users/profile_update")
        } else {
            setUsername(currentUser.username || "");
            setAvatar(currentUser.avatar || "");
        }
    }, [currentUser, navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== repeatPassword) {
            toast.error("Passwords do not match");
            return;
        }

        update_user(username, avatar, password);
    }

    function handleCancel() {
        toast.success("canceled")
        navigate("/users/tasks"); 
    }

    if (!currentUser) {
        return (
           navigate("/users/signin")
          
        );
      }
 
    return (
        <section className=" h-[90vh] flex items-center justify-center py-4 px-6 lg:px-8 ">
            <div className="bg-gray-100 mx-auto flex flex-col items-center justify-center px-6 max-w-lg w-full py-4 rounded-md shadow-md">
                <div className="w-20 h-20 relative overflow-hidden rounded-full">
                    <img 
                        src={currentUser.avatar} 
                        alt="Profile Picture" 
                        className="w-full h-full object-cover ring-2 -300" 
                    />
                </div>
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Update your Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2 w-full pb-3">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username || ""}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="repeatPassword"
                                placeholder="Confirm Password"
                                value={repeatPassword || ""}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">
                            Add Profile Picture
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="avatar"
                                placeholder="Enter URL"
                                value={avatar || ""}
                                onChange={(e) => setAvatar(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="relative w-full h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] bg-gradient-to-r from-[#4bff63] to-[#7ff947] hover:bg-gradient-to-r hover:from-[#8aff54] hover:to-[#1fff32] transition-all duration-500"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="relative w-full h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 transition-all duration-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default UpdateFreelancerProfile;