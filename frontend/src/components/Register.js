import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ocpLogo from '../assets/images/ocp-logo.png'; // Import du logo OCP

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matricule: '',
    password: '',
    nom: '',
    prenom: '',
    cin: '',
    date_naissance: '',
    date_embauche: '',
    poste: '',
    departement: '',
    site: '',
    email: '',
    telephone: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Données envoyées au backend:', formData); // Log pour débogage
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', { // Changement du port à 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      alert('Agent créé avec succès !');
      navigate('/login'); // Rediriger vers la page de connexion après inscription
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-card">
      <img src={ocpLogo} alt="OCP Logo" className="logo" />
      <h2>S'inscrire</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matricule</label>
          <input name="matricule" value={formData.matricule} onChange={handleChange} required />
        </div>
        <div>
          <label>Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Nom</label>
          <input name="nom" value={formData.nom} onChange={handleChange} required />
        </div>
        <div>
          <label>Prénom</label>
          <input name="prenom" value={formData.prenom} onChange={handleChange} required />
        </div>
        <div>
          <label>CIN</label>
          <input name="cin" value={formData.cin} onChange={handleChange} required />
        </div>
        <div>
          <label>Date de naissance</label>
          <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
        </div>
        <div>
          <label>Date d'embauche</label>
          <input type="date" name="date_embauche" value={formData.date_embauche} onChange={handleChange} required />
        </div>
        <div>
          <label>Poste</label>
          <input name="poste" value={formData.poste} onChange={handleChange} required />
        </div>
        <div>
          <label>Département</label>
          <input name="departement" value={formData.departement} onChange={handleChange} required />
        </div>
        <div>
          <label>Site</label>
          <input name="site" value={formData.site} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Téléphone</label>
          <input name="telephone" value={formData.telephone} onChange={handleChange} required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <div className="login-link">
        <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
      </div>
    </div>
  );
};

export default Register;