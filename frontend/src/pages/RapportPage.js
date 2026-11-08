import React from 'react';
import { useAuth } from '../context/AuthContext';
import Rapport from '../components/Rapport';

const RapportPage = () => {
  const { currentAgent } = useAuth();

  if (!currentAgent) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div>
      <Rapport agentId={currentAgent.id_agent} />
    </div>
  );
};

export default RapportPage;