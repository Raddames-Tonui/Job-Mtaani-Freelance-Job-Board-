import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

function FreelancerProjects() {
    const { projects, fetchProjects } = useContext(ProjectContext);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className="p-4 md:p-6 min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <div className="inline-flex">
                    
                        <NavLink 
                            to="/freelancers/projects"
                            className={({ isActive }) => 
                                `py-2 px-6 rounded-lg text-white ${isActive ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`
                            }
                        >
                            My Projects
                        </NavLink>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                            <tr>
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Client</th>
                                <th className="py-3 px-6 text-left">Milestone</th>
                                <th className="py-3 px-6 text-left">Deadline</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-900 text-sm font-light">
                            {projects && projects.map((project) => (
                                <tr key={project.id} className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left capitalize">{project.title}</td>
                                    <td className="py-3 px-6 text-left capitalize">{project.client.firstname} {project.client.lastname}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className={`py-1 px-3 rounded-full text-sm ${project.status === 'completed' ? 'bg-green-600 text-white' : project.status === 'ongoing' ? 'bg-yellow-500 text-white' : 'bg-red-600 text-white'}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">{project.deadline}</td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex justify-center gap-2">
                                            <NavLink to={`/client/projects/edit/${project.id}`}>
                                                <button className="text-blue-500 hover:text-blue-600">
                                                    <FaEdit />
                                                </button>
                                            </NavLink>
                                            <button
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => handleDelete(project.id)}
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
            </div>
        </div>
    );
}

export default FreelancerProjects;
