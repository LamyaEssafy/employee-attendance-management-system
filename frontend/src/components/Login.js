import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ocpLogo from '../assets/images/ocp-logo.png'; // Import du logo OCP

const Login = () => {
  const navigate = useNavigate();
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricule, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion');
      }

      // Stocker le token dans localStorage (même si tu ne veux pas JWT, je suppose que ton backend renvoie un token)
      localStorage.setItem('token', data.token);

      // Appeler la fonction login du contexte avec l'agent
      login(data.agent);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-card">
      <img src={ocpLogo} alt="OCP Logo" className="logo" />
      <h2>S'inscrire</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matricule</label>
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <div className="register-link">
        <p>Pas encore inscrit ? <Link to="/register">Créer un compte</Link></p>
      </div>
    </div>
  );
};

export default Login;