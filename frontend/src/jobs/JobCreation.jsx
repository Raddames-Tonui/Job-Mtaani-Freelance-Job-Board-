import React, { useState } from 'react';

const JobCreation = () => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        tags: '',
        role: '',
        minSalary: '',
        maxSalary: '',
        salaryType: '',
        education: '',
        experience: '',
        jobType: '',
        vacancies: '',
        expirationDate: '',
        jobLevel: '',
        applyOn: 'jobpilot',
        description: '',
        responsibilities: ''
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
        console.log('Job Details:', jobDetails);
    };

    return (
        <form className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Post a Job</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Job Title</label>
                <input type="text" name="title" value={jobDetails.title} onChange={handleChange} placeholder="Add job title, role, vacancies etc" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Tags</label>
                <input type="text" name="tags" value={jobDetails.tags} onChange={handleChange} placeholder="Job keyword, tags etc..." className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Job Role</label>
                <select name="role" value={jobDetails.role} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                    <option value="">Select...</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Salary</label>
                <div className="flex space-x-4">
                    <input type="text" name="minSalary" value={jobDetails.minSalary} onChange={handleChange} placeholder="Minimum salary" className="w-1/2 px-3 py-2 border rounded-lg" />
                    <input type="text" name="maxSalary" value={jobDetails.maxSalary} onChange={handleChange} placeholder="Maximum salary" className="w-1/2 px-3 py-2 border rounded-lg" />
                </div>
                <select name="salaryType" value={jobDetails.salaryType} onChange={handleChange} className="w-full px-3 py-2 mt-2 border rounded-lg">
                    <option value="">Select...</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Advance Information</label>
                <div className="grid grid-cols-2 gap-4">
                    <select name="education" value={jobDetails.education} onChange={handleChange} className="px-3 py-2 border rounded-lg">
                        <option value="">Select Education</option>
                        {/* Add more options as needed */}
                    </select>
                    <select name="experience" value={jobDetails.experience} onChange={handleChange} className="px-3 py-2 border rounded-lg">
                        <option value="">Select Experience</option>
                        {/* Add more options as needed */}
                    </select>
                    <select name="jobType" value={jobDetails.jobType} onChange={handleChange} className="px-3 py-2 border rounded-lg">
                        <option value="">Select Job Type</option>
                        {/* Add more options as needed */}
                    </select>
                    <input type="text" name="vacancies" value={jobDetails.vacancies} onChange={handleChange} placeholder="Vacancies" className="px-3 py-2 border rounded-lg" />
                    <input type="date" name="expirationDate" value={jobDetails.expirationDate} onChange={handleChange} className="px-3 py-2 border rounded-lg" />
                    <select name="jobLevel" value={jobDetails.jobLevel} onChange={handleChange} className="px-3 py-2 border rounded-lg">
                        <option value="">Select Job Level</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Apply Job on:</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="applyOn" value="jobpilot" checked={jobDetails.applyOn === 'jobpilot'} onChange={handleChange} className="mr-2" />
                        On Jobpilot
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="applyOn" value="external" checked={jobDetails.applyOn === 'external'} onChange={handleChange} className="mr-2" />
                        External Platform
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="applyOn" value="email" checked={jobDetails.applyOn === 'email'} onChange={handleChange} className="mr-2" />
                        On Your Email
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea name="description" value={jobDetails.description} onChange={handleChange} placeholder="Add your job description..." className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Responsibilities</label>
                <textarea name="responsibilities" value={jobDetails.responsibilities} onChange={handleChange} placeholder="Add your job responsibilities..." className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Post Job</button>
        </form>
    );
};

export default JobCreation;
