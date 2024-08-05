import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';


const UpdateFreelancerProfile = () => {
    const { currentUser, updateUserProfile } = useContext(UserContext);
    const [formData, setFormData] = useState({
        skills: '',
        experience: '',
        avatar: ''
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                skills: currentUser.skills || '',
                experience: currentUser.experience || '',
                avatar: currentUser.avatar || ''
            });
        }
    }, [currentUser]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(formData)
            .then(() => {
                toast.success('Profile updated successfully!');
                // Clear form fields after successful submission
                setFormData({
                    skills: '',
                    experience: '',
                    avatar: ''
                });
            })
            .catch((error) => {
                toast.error('Failed to update profile: ' + error.message);
            });
    };

    return (
        <div className="flex">
            <div className="w-3/4 mt-[10vh] ml-[20vw]">
                <div className="flex items-center justify-center py-12 px-6 lg:px-8">
                    <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-2xl w-full py-8 rounded-md shadow-md border-2 border-gray-200">
                        <h2 className="text-3xl font-bold text-blue-500 capitalize">
                            Update Freelancer Profile
                        </h2>
                        <form className="space-y-6 mt-8 w-full" onSubmit={handleSubmit}>
                            {/* Skills */}
                            <div>
                                <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                                    Skills
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="skills"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        placeholder="List your skills"
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                                    Experience
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        placeholder="Describe your experience"
                                    />
                                </div>
                            </div>

                            {/* Avatar URL */}
                            <div>
                                <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">
                                    Avatar URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="avatar"
                                        name="avatar"
                                        type="text"
                                        value={formData.avatar}
                                        onChange={handleChange}
                                        className="block w-full text-gray-900 border-0 py-2 pl-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        placeholder="Enter avatar URL"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateFreelancerProfile;
