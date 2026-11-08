import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, currentAgent } = useAuth();

  console.log('LoginPage rendu, currentAgent:', currentAgent);

  const handleLogin = (agent) => {
    console.log('Connexion réussie, agent:', agent);
    login(agent); // Met à jour l'agent dans le contexte
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;