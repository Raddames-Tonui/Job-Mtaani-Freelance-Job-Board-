import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { FaTimes } from 'react-icons/fa';

const milestoneStates = {
  notStarted: "Not Started",
  inProgress: "In Progress",
  onHold: "On Hold",
  completed: "Completed",
  cancelled: "Cancelled"
};

const stateColors = {
  notStarted: "bg-gray-300",
  inProgress: "bg-yellow-300",
  onHold: "bg-orange-300",
  completed: "bg-green-300",
  cancelled: "bg-red-300"
};

const ProjectUpdateModal = ({ isOpen, onClose, project, onReviewOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    deadline: '',
    milestoneState: '' 
  });

  const { updateProject } = useContext(ProjectContext);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        status: project.status || '',
        deadline: project.deadline || '',
        milestoneState: project.milestoneState || '' 
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(project.id, formData);

    // Check if status is completed and open review modal
    if (formData.status === 'Completed') {
      onReviewOpen(project.client_id);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-full max-w-lg mx-4 md:max-w-sm sm:max-w-xs">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Update Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Project Title"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Project Description"
              />
            </div>
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
              Status
            </label>
            <div className="mt-2">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Deadline Field */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium leading-6 text-gray-900">
              Deadline
            </label>
            <div className="mt-2">
              <input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Milestone State Display */}
          <div>
            <label htmlFor="milestoneState" className="block text-sm font-medium leading-6 text-gray-900">
              Milestone State
            </label>
            <div className={`mt-2 rounded-md p-2 text-white ${stateColors[formData.milestoneState]}`}>
              {milestoneStates[formData.milestoneState] || "Select a state"}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-900 px-3 py-1.5 rounded-md shadow-sm ring-1 ring-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-inset">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-3 py-1.5 rounded-md shadow-sm ring-1 ring-gray-300 hover:bg-blue-600 focus:ring-2 focus:ring-inset">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectUpdateModal;
