import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import AppRoutes from './App.routes';
import AuthRoutes from './Auth.routes';

const Routes = () => {
  const { user, authIsReady } = useAuthContext();

  if (authIsReady) {
    return user ? <AppRoutes /> : <AuthRoutes />;
  }
  return null;
};

export default Routes;
