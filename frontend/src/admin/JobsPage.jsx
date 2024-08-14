import React, { useContext, useEffect, useState } from 'react';
import { JobContext } from '../context/JobContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const JobsPage = () => {
    const { jobs, deleteJob } = useContext(JobContext);
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        setJobList(jobs);
    }, [jobs]);

    return (
        <div className="p-6 bg-gray-900 text-white shadow-lg h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Jobs</h2>
            <div className="flex-grow overflow-auto">
                <table className="min-w-full bg-gray-800">
                    <thead className="sticky top-0 bg-gray-700 text-gray-400 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Role</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            {/* <th className="py-3 px-6 text-left">Experience Level</th> */}
                            <th className="py-3 px-6 text-left">Education</th>
                            {/* <th className="py-3 px-6 text-left">Min Salary</th> */}
                            {/* <th className="py-3 px-6 text-left">Max Salary</th> */}
                            <th className="py-3 px-6 text-left">Salary Type</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm font-light">
                        {jobList.map(job => (
                            <tr key={job.id} className="border-b border-gray-700 hover:bg-gray-600">
                                <td className="py-3 px-6 text-left">{job.title}</td>
                                <td className="py-3 px-6 text-left">{job.role}</td>
                                <td className="py-3 px-6 text-left">{job.location}</td>
                                {/* <td className="py-3 px-6 text-left">{job.experience_level}</td> */}
                                <td className="py-3 px-6 text-left">{job.education}</td>
                                {/* <td className="py-3 px-6 text-left">{job.min_salary}</td> */}
                                {/* <td className="py-3 px-6 text-left">{job.max_salary}</td> */}
                                <td className="py-3 px-6 text-left">{job.salary_type}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                            <FaEdit />
                                        </button>
                                        <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                                            onClick={() => deleteJob(job.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex justify-between">
                <h1>@Job Mtaani 2024</h1>
            </div>
        </div>
    );
};

export default JobsPage;
