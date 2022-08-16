import './ProjectsList.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';

const ProjectsList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && 'No projects!'}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <p className="assigned-to">
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsList;
