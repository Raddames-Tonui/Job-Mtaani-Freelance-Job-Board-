import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const UpdateFreelancerProfile = () => {
    const { currentUser, updateUserProfile } = useContext(UserContext);
    const [formData, setFormData] = useState({
        skills: '',
        experience: '',
        education: '',
        location: '',
        avatar: ''
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                skills: currentUser.skills || '',
                experience: currentUser.experience || '',
                education: currentUser.education || '',
                location: currentUser.location || '',
                avatar: currentUser.avatar || ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(formData)
            .then(() => {
                setFormData({
                    skills: '',
                    experience: '',
                    education: '',
                    location: '',
                    avatar: ''
                });
                toast.success('Profile updated successfully');
            })
            .catch((error) => {
                toast.error('Failed to update profile: ' + error.message);
            });
    };

    return (
        <div className="flex justify-center px-4 md:px-0">
            <div className="w-full md:w-[60vw]">
                <div className="flex items-center justify-center py-12 px-6 lg:px-8">
                    <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-2xl w-full py-8 rounded-md shadow-md border-2 border-gray-200">
                        {currentUser && currentUser.username ? (
                            <h2 className="text-3xl font-bold text-blue-700 capitalize">
                                {currentUser.username}
                            </h2>
                        ) : null}
                        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Update Your Profile
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
                                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                        placeholder="List your skills"
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="flex-1">
                                <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                                    Experience
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    >
                                        <option value="0-1 years">0-1 years</option>
                                        <option value="1-3 years">1-3 years</option>
                                        <option value="3-5 years">3-5 years</option>
                                        <option value="5+ years">5+ years</option>
                                    </select>
                                </div>
                            </div>

                            {/* Education */}
                            <div className="flex-1">
                                <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">
                                    Education
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="education"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    >
                                        <option value="High School">High School</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Master">Master</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Location
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                        placeholder="Enter your location"
                                    />
                                </div>
                            </div>

                            {/* Avatar */}
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
                                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                        placeholder="Enter avatar URL"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
