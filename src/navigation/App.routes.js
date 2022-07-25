import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Create from '../pages/create/Create';
import Dashboard from '../pages/dashboard/Dashboard';
import Project from '../pages/project/Project';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<Create />} />
      <Route path="/projects/:id" element={<Project />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
