import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import AppRoutes from './App.routes';
import AuthRoutes from './Auth.routes';

const Routes = () => {
  const { user } = useAuthContext();

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
