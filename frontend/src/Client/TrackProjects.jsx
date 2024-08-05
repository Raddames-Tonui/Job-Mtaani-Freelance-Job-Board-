import React, { useEffect, useState } from 'react';
import {server_url} from "../../config.json"


const TrackProject = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = () => {
        fetch(`${server_url}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }


        )
    .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));
    };
    fetchProjects();
    }, []);


    return (
        <div>
            <h1>Project Tracking</h1>
            <div>
                {projects.map(project => (
                    <Project key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

const Project = ({ project }) => {
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        fetchMilestones(project.id);
    }, [project.id]);

    const fetchMilestones = (projectId) => {
        fetch(`${server_url}/projects/${projectId}/milestones`)
            .then(response => response.json())
            .then(data => setMilestones(data))
            .catch(error => console.error('Error fetching milestones:', error));
    };

    return (
        <div>
            <h2>{project.name}</h2>
            <ul>
                {milestones.map(milestone => (
                    <Milestone key={milestone.id} milestone={milestone} projectId={project.id} />
                ))}
            </ul>
        </div>
    );
};

const Milestone = ({ milestone, projectId }) => {
    const [status, setStatus] = useState(milestone.status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProgress(projectId, milestone.id, status)
            .catch(error => console.error('Error updating progress:', error));
    };

    const updateProgress = (projectId, milestoneId, status) => {
        return fetch(`${server_url}/projects/${projectId}/progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ milestoneId, status })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update progress');
            }
        });
    };

    return (
        <li>
            {milestone.name} - {milestone.status}
            <form onSubmit={handleSubmit}>
                <input type="text" value={status} onChange={handleStatusChange} />
                <button type="submit">Update</button>
            </form>
        </li>
    );
};

export default TrackProject;
