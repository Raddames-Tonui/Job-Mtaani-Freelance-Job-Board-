import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Projects() {
    const { projects, fetchProjects } = useContext(ProjectContext);

    useEffect(() => {
        fetchProjects(); 
    }, [fetchProjects]);

    return (
        <div className="p-6 bg-gray-100 text-black shadow-lg h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="flex justify-between mb-6">
                <div className="flex items-center gap-4">
                    <NavLink 
                            to="/client/my-projects"
                            className={({ isActive }) => 
                                `py-2 px-4 rounded text-white ${isActive ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`
                            }
                        >
                            My Projects
                        </NavLink>
                        
                        <NavLink 
                            to="/client/projects/create-project"
                            className={({ isActive }) => 
                                `py-2 px-4 rounded text-white ${isActive ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`
                            }
                        >
                            Create Project
                    </NavLink>
                </div>
            </div>

            <div className="flex-grow overflow-auto">
                <table className="min-w-full bg-white">
                    <thead className="sticky top-0 bg-gray-200 text-black uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Freelancer</th>
                            <th className="py-3 px-6 text-left">Milestone</th>
                            <th className="py-3 px-6 text-left">Deadline</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-black text-sm font-light">
                        {projects && projects.map((project) => (
                            <tr key={project.id} className="border-b border-gray-300 hover:bg-gray-200">
                                <td className="py-3 px-6 text-left">{project.title}</td>
                                <td className="py-3 px-6 text-left capitalize">{project.freelancer.firstname}  {project.freelancer.lastname}</td>
                                <td className="py-3 px-6 text-left">
                                    <span className={`py-1 px-3 rounded-full text-sm ${project.status === 'completed' ? 'bg-green-600 text-white' : project.status === 'ongoing' ? 'bg-yellow-500 text-white' : 'bg-red-600 text-white'}`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">{project.deadline}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex justify-center">
                                        <NavLink to={`/client/projects/edit/${project.id}`}>
                                            <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                                <FaEdit />
                                            </button>
                                        </NavLink>
                                        <button
                                            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                                            // onClick={() => deleteProject(project.id)}
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
    );
}

export default Projects;
