import React from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const { currentAgent } = useAuth();

  if (!currentAgent) {
    window.location.href = '/login';
    return null;
  }

  return <Dashboard agent={currentAgent} />;
};

export default DashboardPage;