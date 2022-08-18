import React from 'react';
import Avatar from '../../components/avatar/Avatar';

const ProjectSummary = ({ project }) => {
  return (
    <div className="project-summary">
      <h2 className="page-title">{project.name}</h2>
      <p className="due-date">
        Project due by{project.dueDate.toDate().toLocaleDateString()}
      </p>
      <p className="details">{project.details}</p>
      <h4>This project is assigned to:</h4>
      <div className="assigned-users">
        {project.assignedUsersList.map(user => (
          <div key={user.id}>
            <Avatar src={user.photoURL} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSummary;
