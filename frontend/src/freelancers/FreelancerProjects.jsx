import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ReviewModal from '../components/ReviewModal';

import "../app.css";

function FreelancerProjects() {
    const { projects, fetchProjects, updateProject } = useContext(ProjectContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [reviewType, setReviewType] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [milestoneStatuses] = useState(['Not Started', 'Ongoing', 'On Hold', 'Cancelled']); // can add 'completed'
    const [selectedStatus, setSelectedStatus] = useState({});

    const statusColors = {
        'Not Started': 'bg-gray-500 text-white',
        'Ongoing': 'bg-yellow-500 text-white',
        'On Hold': 'bg-orange-500 text-white',
        'Completed': 'bg-green-600 text-white',
        'Cancelled': 'bg-red-600 text-white',
    };

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleReviewClick = (projectId, type) => {
        setSelectedProjectId(projectId);
        setReviewType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProjectId(null);
        setReviewType('');
    };

    const handleDropdownClick = (projectId) => {
        setOpenDropdown(openDropdown === projectId ? null : projectId);
    };

    const handleStatusChange = (projectId, status) => {
        setSelectedStatus(prev => ({ ...prev, [projectId]: status }));
        const projectData = { status };
        
        updateProject(projectId, projectData)
            .then(() => {              
                setOpenDropdown(null);  // Close the dropdown after status update
            })
            .catch(error => {
                console.error('Failed to update milestone status:', error);
            });
    };

    return (
        <div className="p-4 md:p-6 min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <div className="flex justify-center mb-6">
                    <div className="inline-flex">
                        <NavLink 
                            to="/freelancer/projects"
                            className={({ isActive }) => 
                                `py-2 px-6 rounded-lg text-white ${isActive ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`
                            }
                        >
                            My Projects
                        </NavLink>
                    </div>
                </div>

                <div className="table-container">
                    <div className="table-content">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead className="bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                                <tr>
                                    <th className="py-3 px-6 text-left">Title</th>
                                    <th className="py-3 px-6 text-left">Client</th>
                                    <th className="py-3 px-6 text-left">Deadline</th>
                                    <th className="py-3 px-6 text-left">Milestone</th>                                
                                    <th className="py-3 px-6 text-center">Review</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900 text-sm font-light">
                                {projects && projects.map((project) => (
                                    <tr key={project.id} className="border-b border-gray-300 hover:bg-gray-50">
                                        <td className="py-3 px-6 text-left capitalize">{project.title}</td>
                                        <td className="py-3 px-6 text-left capitalize">
                                            {project.client.firstname} {project.client.lastname}
                                        </td>
                                        <td className="py-3 px-6 text-left">{project.deadline}</td>
                                        <td className="py-3 px-6 text-left relative">
                                            <button
                                                className={`py-1 px-3 rounded-full text-sm ${statusColors[selectedStatus[project.id] || project.status]}`}
                                                onClick={() => handleDropdownClick(project.id)}
                                            >
                                                {selectedStatus[project.id] || project.status}
                                                {openDropdown === project.id ? <FaChevronUp className="inline ml-2" /> : <FaChevronDown className="inline ml-2" />}
                                            </button>
                                            {openDropdown === project.id && (
                                                <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 shadow-lg w-48 z-10">
                                                    {milestoneStatuses.map(status => (
                                                        <div
                                                            key={status}
                                                            className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                                            onClick={() => handleStatusChange(project.id, status)}
                                                        >
                                                            {status}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center cursor-pointer text-blue-500 hover:text-blue-600" onClick={() => handleReviewClick(project.id, 'client')}>
                                            Review Client
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {isModalOpen && (
                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    projectId={selectedProjectId}
                    reviewType={reviewType}
                />
            )}
        </div>
    );
}

export default FreelancerProjects;
