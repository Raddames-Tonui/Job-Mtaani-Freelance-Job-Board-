
import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';

const JobCreation = () => {
    const { createJob } = useContext(JobContext);

    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        requirements: '',
        client_id: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails({
            ...jobDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, requirements, client_id } = jobDetails;
        createJob(title, description, client_id, requirements);
    };

    return (
        <form className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Post a Job</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Job Title</label>
                <input type="text" name="title" value={jobDetails.title} onChange={handleChange} placeholder="Add job title, role, vacancies etc" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">

                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea name="description" value={jobDetails.description} onChange={handleChange} placeholder="Add your job description..." className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <div className="mb-4">

                <label className="block text-gray-700 font-bold mb-2">Requirements</label>
                <textarea name="requirements" value={jobDetails.requirements} onChange={handleChange} placeholder="Add your job requirements..." className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Post Job</button>
        </form>
    );
};

export default JobCreation;