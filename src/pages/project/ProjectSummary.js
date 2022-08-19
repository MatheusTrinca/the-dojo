import React from 'react';
import Avatar from '../../components/avatar/Avatar';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFirebase } from '../../hooks/useFirebase';
import { useNavigate } from 'react-router-dom';

const ProjectSummary = ({ project }) => {
  const { user } = useAuthContext();
  const { deleteDocument } = useFirebase('projects');
  const navigate = useNavigate();

  const handleDelete = id => {
    deleteDocument(project.id);
    navigate('/');
  };

  return (
    <div className="project-summary">
      <h2 className="page-title">{project.name}</h2>
      <p>By {project.createdBy.displayName}</p>
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
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleDelete}>
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
