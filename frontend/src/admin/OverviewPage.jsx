import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { JobContext } from '../context/JobContext';
import { Link } from 'react-router-dom';

const Overview = () => {
    const { users } = useContext(UserContext);
    const { jobs, fetchJobs } = useContext(JobContext);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const totalFreelancers = users.filter(user => user.is_freelancer).length;
    const totalClients = users.filter(user => user.is_client).length;
    const totalUsers = totalFreelancers + totalClients;
    const totalJobPostings = jobs.length;

    return (
        <div className=" p-6 bg-gray-900 text-white  shadow-lg h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-400 mb-6">Users Summary</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/admin/freelancers" className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-semibold">{totalFreelancers}</p>
                    <p className="text-gray-400">Total Freelancers</p>
                </Link>
                <Link to="/admin/clients" className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-semibold">{totalClients}</p>
                    <p className="text-gray-400">Total Clients</p>
                </Link>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-semibold">{totalUsers}</p>
                    <p className="text-gray-400">Total Users</p>
                </div>
                <div><p className="text-gray-400 mb-6">Job Posting Summary</p></div>
                <div></div>
                <div></div>

                
                <Link to="/admin/jobs" className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-semibold">{totalJobPostings}</p>
                    <p className="text-gray-400">Total Job Postings</p>
                </Link>
                
            </div>
        </div>
    );
};

export default Overview;
