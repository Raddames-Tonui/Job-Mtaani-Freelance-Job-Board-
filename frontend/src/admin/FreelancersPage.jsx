import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const FreelancersPage = () => {
    const { users } = useContext(UserContext);
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        setFreelancers(users.filter(user => user.is_freelancer));
    }, [users]);

    return (
        <div className="p-6 bg-gray-900 text-white  shadow-lg h-full ">
            <h2 className="text-2xl font-bold mb-4">Freelancers</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800">
                    <thead>
                        <tr className="w-full bg-gray-700 text-gray-400 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            {/* <th className="py-3 px-6 text-left">Experience</th> */}
                            <th className="py-3 px-6 text-left">Username</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm font-light">
                        {freelancers.map(freelancer => (
                            <tr key={freelancer.id} className="border-b border-gray-700 hover:bg-gray-600">
                                <td className="py-3 px-6 text-left flex items-center">
                                    <span className="w-8 h-8 bg-green-500 text-white flex justify-center items-center rounded-full mr-3">
                                        {freelancer.firstname.charAt(0)}
                                    </span>
                                    <span>{freelancer.firstname} {freelancer.lastname}</span>
                                </td>
                                <td className="py-3 px-6 text-left">{freelancer.email}</td>
                                {/* <td className="py-3 px-6 text-left">{freelancer.experience || 'N/A'}</td> */}
                                <td className="py-3 px-6 text-left">{freelancer.username || 'N/A'}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                            <FaEdit />
                                        </button>
                                        <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between">
                <span>Showing 1-{freelancers.length} out of {freelancers.length} data</span>
                <div className="flex space-x-2">
                    <button className="bg-gray-700 px-3 py-1 rounded-lg">Previous</button>
                    <button className="bg-green-500 px-3 py-1 rounded-lg">1</button>
                    <button className="bg-gray-700 px-3 py-1 rounded-lg">2</button>
                    <button className="bg-gray-700 px-3 py-1 rounded-lg">3</button>
                    <button className="bg-gray-700 px-3 py-1 rounded-lg">Next</button>
                </div>
            </div>
        </div>
    );
};

export default FreelancersPage;
