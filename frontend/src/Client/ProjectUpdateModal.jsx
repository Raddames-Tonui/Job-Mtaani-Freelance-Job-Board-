// ProjectUpdateModal.js

import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';

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

const ProjectUpdateModal = ({ isOpen, onClose, project }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    deadline: '',
    milestoneState: '' // Add this field to track milestone state
  });

  const { updateProject } = useContext(ProjectContext);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        status: project.status || '',
        deadline: project.deadline || '',
        milestoneState: project.milestoneState || '' // Initialize milestone state
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-6">
          Update Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
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
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md shadow-sm ring-1 ring-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-inset">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm ring-1 ring-gray-300 hover:bg-blue-600 focus:ring-2 focus:ring-inset">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectUpdateModal;
