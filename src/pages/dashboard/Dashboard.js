import './Dashboard.css';
import React, { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ProjectsList from '../../components/projectsList/ProjectsList';
import ProjectFilter from './ProjectFilter';
import { useAuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');

  const { user } = useAuthContext();

  const changeFilter = newFilter => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter(project => {
        switch (currentFilter) {
          case 'all':
            return project;
          case 'mine':
            let assignedToMe = false;
            project.assignedUsersList.forEach(u => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            return project.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-tite">Dashboard</h2>
      {error && <p>{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <ProjectsList projects={projects} />}
    </div>
  );
};

export default Dashboard;
