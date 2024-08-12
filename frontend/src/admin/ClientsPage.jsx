import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ClientsPage = () => {
    const { users, deleteUser } = useContext(UserContext);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        setClients(users.filter(user => user.is_client));
    }, [users]);

    return (
        <div className="p-6 bg-gray-900 text-white shadow-lg h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Clients</h2>
            <div className="flex-grow overflow-auto">
                <table className="min-w-full bg-gray-800">
                    <thead className="sticky top-0 bg-gray-700 text-gray-400 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">User Name</th>
                            <th className="py-3 px-6 text-left">FirstName</th>
                            <th className="py-3 px-6 text-left">Last Name</th>                            
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-right">Ratings</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm font-light">
                        {clients.map(client => (
                            <tr key={client.id} className="border-b border-gray-700 hover:bg-gray-600">
                                <td className="py-3 px-6 text-left flex items-center capitalize">
                                    <span className="w-8 h-8 bg-green-500 text-white flex justify-center items-center rounded-full mr-3">
                                        {client.firstname.charAt(0)}
                                    </span>
                                    <span>{client.username}</span>
                                </td>
                                <td className="py-3 px-6 text-left">{client.firstname}</td>
                                <td className="py-3 px-6 text-left">{client.lastname || 'N/A'}</td>
                                <td className="py-3 px-6 text-left">{client.email || 'N/A'}</td>
                                <td className="py-3 px-6 text-left">{client.ratings || 'N/A'}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                                            onClick={() => deleteUser(client.id)}
                                        >
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

export default ClientsPage;
