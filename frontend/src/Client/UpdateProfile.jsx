

import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
    const { currentUser, updateUserProfile } = useContext(UserContext);
    const [formData, setFormData] = useState({
        about: '',
        needs: '',
        location: '' 
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                about: currentUser.about || '',
                needs: currentUser.needs || '',
                location: currentUser.location || ''    
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (typeof updateUserProfile === 'function') {
                await updateUserProfile(formData);
                toast.success('Profile updated successfully!');

                 // Clear form fields after successful update
                setFormData({
                    about: '',
                    needs: '',
                    location: ''
                });

            } else {
                throw new Error('updateUserProfile is not a function');
            }
        } catch (error) {
            toast.error('Error updating profile.');
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">About</label>
                <textarea 
                    name="about" 
                    value={formData.about} 
                    onChange={handleChange} 
                    placeholder="Tell us about your business" 
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Needs</label>
                <textarea 
                    name="needs" 
                    value={formData.needs} 
                    onChange={handleChange} 
                    placeholder="What are your needs?" 
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    placeholder="Enter your location" 
                    className="w-full px-3 py-2 border rounded-lg" 
                />
            </div>
            <button 
                type="submit" 
                className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
                Update Profile
            </button>
        </form>
    );
};

export default UpdateProfile;
