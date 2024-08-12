import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { NavLink } from 'react-router-dom';

const FreelancerProjects = () => {
    const { freelancerProjects, fetchFreelancerProjects, updateMilestoneStatus } = useContext(ProjectContext);

    useEffect(() => {
        if (fetchFreelancerProjects) {
            fetchFreelancerProjects();
        }
    }, [fetchFreelancerProjects]);

    const handleStatusChange = (milestoneId, status) => {
        const completed = status === 'completed';
        updateMilestoneStatus(milestoneId, { completed });
    };

    return (
        <div className="p-6 bg-gray-100 text-black shadow-lg h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">My Projects</h2>
            <div className="flex-grow overflow-auto">
                <table className="min-w-full bg-white">
                    <thead className="sticky top-0 bg-gray-200 text-black uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Client</th>
                            <th className="py-3 px-6 text-left">Milestone</th>
                            <th className="py-3 px-6 text-left">Deadline</th>
                        </tr>
                    </thead>
                    <tbody className="text-black text-sm font-light">
                        {freelancerProjects && freelancerProjects.length > 0 ? (
                            freelancerProjects.map((project) => (
                                <tr key={project.id} className="border-b border-gray-300 hover:bg-gray-200">
                                    <td className="py-3 px-6 text-left">{project.title}</td>
                                    <td className="py-3 px-6 text-left">
                                        {project.client 
                                            ? `${project.client.firstname} ${project.client.lastname}` 
                                            : 'Unknown Client'}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {/* Always show the dropdown */}
                                        <select
                                            defaultValue={project.milestones && project.milestones.length > 0 ? project.milestones[0].status : 'started'}
                                            onChange={(e) => {
                                                if (project.milestones && project.milestones.length > 0) {
                                                    project.milestones.forEach(milestone => {
                                                        handleStatusChange(milestone.id, e.target.value);
                                                    });
                                                }
                                            }}
                                            className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        >
                                            <option value="started">Started</option>
                                            <option value="ongoing">Ongoing</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-6 text-left">{project.deadline}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-3 px-6 text-center">No projects available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FreelancerProjects;
