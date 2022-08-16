import './Dashboard.css';
import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import ProjectsList from '../../components/projectsList/ProjectsList';

const Dashboard = () => {
  const { documents, error } = useCollection('projects');

  return (
    <div>
      <h2 className="page-tite">Dashboard</h2>
      {error && <p>{error}</p>}
      {documents && <ProjectsList projects={documents} />}
    </div>
  );
};

export default Dashboard;
