import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Projects() {
    const { projects, fetchProjects } = useContext(ProjectContext);

    useEffect(() => {
        fetchProjects(); 
    }, [fetchProjects]);

    return (
        <div className="p-6 bg-gray-900 text-white shadow-lg h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Projects </h2>
            <div className="flex justify-between mb-6">
                <div className="flex items-center gap-4">
                    {/* <input
                        type="text"
                        placeholder="Search for..."
                        className="p-2 rounded bg-gray-800 text-white"
                    />
                    */}
                    <Link to="/client/projects/create-project">
                        <button className="bg-purple-500 text-white py-2 px-4 rounded">Create Project</button>
                    </Link>
                </div>
                
            </div>

            <div className="flex-grow overflow-auto">
                <table className="min-w-full bg-gray-800">
                    <thead className="sticky top-0 bg-gray-700 text-gray-400 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Freelancer</th>
                            <th className="py-3 px-6 text-left">Milestone</th>
                            <th className="py-3 px-6 text-left">Deadline</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm font-light">
                        {projects && projects.map((project) => (
                            <tr key={project.id} className="border-b border-gray-700 hover:bg-gray-600">
                                <td className="py-3 px-6 text-left">{project.title}</td>
                                <td className="py-3 px-6 text-left">{project.freelancer_id}</td>
                                <td className="py-3 px-6 text-left">
                                    <span className={`py-1 px-3 rounded-full text-sm ${project.status === 'completed' ? 'bg-green-600' : project.status === 'ongoing' ? 'bg-yellow-500' : 'bg-red-600'}`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">{project.deadline}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex justify-center">
                                        <Link to={`/client/projects/edit/${project.id}`}>
                                            <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                                <FaEdit />
                                            </button>
                                        </Link>
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
