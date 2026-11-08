import React from 'react';
import { useAuth } from '../context/AuthContext';
import Pointage from '../components/Pointage';

const PointagePage = () => {
  const { currentAgent } = useAuth();

  if (!currentAgent) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div>
      <Pointage agentId={currentAgent.id_agent} />
    </div>
  );
};

export default PointagePage;