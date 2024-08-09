import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { ProjectContext } from '../context/ProjectContext';

const CreateProjectForm = () => {
    const { acceptedFreelancers, createProject } = useContext(ProjectContext);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        freelancer_id: '',
        status: 'ongoing',
        deadline: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(formData);
            setFormData({
                title: '',
                description: '',
                freelancer_id: '',
                status: 'ongoing',
                deadline: ''
            });
        } catch (error) {
            console.error('Failed to create project:', error);
            toast.error('Failed to create project');
        }
    };

    return (
        <div className="mt-[10vh]">
            <div className="flex items-center justify-center py-12 px-6 lg:px-8">
                <div className="bg-white mx-auto flex flex-col items-center justify-center px-6 max-w-2xl w-full py-8 rounded-md shadow-md border-2 border-gray-200">
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a New Project
                    </h2>
                    <form className="space-y-6 mt-8 w-full" onSubmit={handleSubmit}>
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    placeholder="Project Title"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    placeholder="Project Description"
                                />
                            </div>
                        </div>

                        {/* Freelancer */}
                        <div>
                            <label htmlFor="freelancer_id" className="block text-sm font-medium leading-6 text-gray-900">
                                Freelancer
                            </label>
                            <div className="mt-2">
                                <select
                                    id="freelancer_id"
                                    name="freelancer_id"
                                    value={formData.freelancer_id}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                >
                                    <option value="">Select Freelancer</option>
                                    {acceptedFreelancers.map((freelancer) => (
                                        <option key={freelancer.id} value={freelancer.id}>
                                            {freelancer.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                Status
                            </label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                >
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        {/* Deadline */}
                        <div>
                            <label htmlFor="deadline" className="block text-sm font-medium leading-6 text-gray-900">
                                Deadline
                            </label>
                            <div className="mt-2">
                                <input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-300 hover:bg-blue-600 focus:ring-2 focus:ring-inset"
                        >
                            Create Project
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectForm;
