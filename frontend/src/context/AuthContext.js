import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Restaurer currentAgent depuis localStorage au démarrage
  const [currentAgent, setCurrentAgent] = useState(() => {
    const savedAgent = localStorage.getItem('currentAgent');
    return savedAgent ? JSON.parse(savedAgent) : null;
  });

  // Mettre à jour localStorage à chaque changement de currentAgent
  useEffect(() => {
    if (currentAgent) {
      localStorage.setItem('currentAgent', JSON.stringify(currentAgent));
    } else {
      localStorage.removeItem('currentAgent');
    }
  }, [currentAgent]);

  const login = (agent) => {
    setCurrentAgent(agent);
  };

  const logout = () => {
    setCurrentAgent(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentAgent');
  };

  return (
    <AuthContext.Provider value={{ currentAgent, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);