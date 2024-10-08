import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
    const { currentUser, updateUserProfile } = useContext(UserContext);
    const [formData, setFormData] = useState({
        about: currentUser?.about || '',
        needs: currentUser?.needs || '',
        avatar: currentUser?.avatar || ''
    });

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
            })
            .catch((error) => {
                toast.error('Failed to update profile: ' + error.message);
            });
    };

    return (
        <div className="mt-[10vh]">
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
                        {/* About */}
                        <div>
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    placeholder="Tell us about yourself"
                                />
                            </div>
                        </div>

                        {/* Needs */}
                        <div>
                            <label htmlFor="needs" className="block text-sm font-medium leading-6 text-gray-900">
                                Needs
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="needs"
                                    name="needs"
                                    value={formData.needs}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    placeholder="What are your needs?"
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
    );
};

export default UpdateProfile;
