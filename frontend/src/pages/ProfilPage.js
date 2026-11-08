import React from 'react';
import { useAuth } from '../context/AuthContext';
import Profil from '../components/Profil'; // Mise à jour de l'import

const ProfilPage = () => {
  const { currentAgent } = useAuth();

  if (!currentAgent) {
    window.location.href = '/login';
    return null;
  }

  return <Profil agent={currentAgent} />;
};

export default ProfilPage;