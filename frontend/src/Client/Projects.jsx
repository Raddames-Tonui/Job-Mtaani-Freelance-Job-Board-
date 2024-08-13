import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ProjectUpdateModal from './ProjectUpdateModal';
import ReviewModal from '../components/ReviewModal';

function Projects() {
    const { projects, fetchProjects, updateProject, deleteProject } = useContext(ProjectContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedFreelancerId, setSelectedFreelancerId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleEditClick = (project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProject(null);
    };

    const handleUpdateProject = (projectId, updatedData) => {
        updateProject(projectId, updatedData);
        handleCloseModal(); 
    };

    const handleDelete = (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject(projectId);
        }
    };

    const handleReviewOpen = (freelancerId) => {
        setSelectedFreelancerId(freelancerId);
        setReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setReviewModalOpen(false);
        setSelectedFreelancerId(null);
    };

    return (
        <div className="p-4 md:p-6 min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <div className="inline-flex">
                        <NavLink
                            to="/client/projects/create-project"
                            className={({ isActive }) =>
                                `py-2 px-6 rounded-l-lg text-white ${isActive ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'}`
                            }
                        >
                            Create Project
                        </NavLink>
                        <NavLink
                            to="/client/my-projects"
                            className={({ isActive }) =>
                                `py-2 px-6 rounded-r-lg text-white ${isActive ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'}`
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
                                <th className="py-3 px-6 text-left">Freelancer</th>
                                <th className="py-3 px-6 text-left">Milestone</th>
                                <th className="py-3 px-6 text-left">Deadline</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                                <th className="py-3 px-6 text-center">Review</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-900 text-sm font-light">
                            {projects && projects.map((project) => (
                                <tr key={project.id} className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left capitalize">{project.title}</td>
                                    <td className="py-3 px-6 text-left capitalize">{project.freelancer.firstname} {project.freelancer.lastname}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className={`py-1 px-3 rounded-full text-sm ${project.status === 'completed' ? 'bg-green-600 text-white' : project.status === 'ongoing' ? 'bg-yellow-500 text-white' : 'bg-red-600 text-white'}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">{project.deadline}</td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="text-blue-500 hover:text-blue-600"
                                                onClick={() => handleEditClick(project)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => handleDelete(project.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center cursor-pointer text-blue-500 hover:text-blue-600" onClick={() => handleReviewOpen(project.freelancer_id)}>
                                        Review
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedProject && (
                <ProjectUpdateModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    project={selectedProject}
                    onUpdate={handleUpdateProject}
                    onReviewOpen={handleReviewOpen} 
                />
            )}

            {selectedFreelancerId && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={handleCloseReviewModal}
                    userId={selectedFreelancerId}
                />
            )}
        </div>
    );
}

export default Projects;
