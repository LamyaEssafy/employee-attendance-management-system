import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ocpLogo from '../assets/images/ocp-logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={ocpLogo} alt="OCP Logo" className="logo" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">📊 Tableau de bord</Link>
        </li>
        <li>
          <Link to="/pointage">⏰ Pointage</Link>
        </li>
        <li>
          <Link to="/rapport">📈 Rapport</Link>
        </li>
        <li>
          <Link to="/profile">👤 Profil</Link> {/* Nouveau lien */}
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">🚪 Déconnexion</button>
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #0A5C36; /* Vert foncé OCP */
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .logo {
          width: 80px; /* Petit logo */
          height: auto;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
        }

        .sidebar-menu li {
          margin: 15px 0;
        }

        .sidebar-menu a {
          color: #ffffff; /* Texte blanc */
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          display: flex;
          align-items: center;
          padding: 12px;
          border-radius: 8px;
          transition: background-color 0.3s, transform 0.2s;
        }

        .sidebar-menu a:hover {
          background-color: #66BB6A; /* Vert clair OCP */
          transform: translateX(5px);
        }

        .sidebar-menu a::before {
          margin-right: 10px;
        }

        .logout-button {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          padding: 12px;
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.3s, transform 0.2s;
        }

        .logout-button:hover {
          background-color: #D32F2F; /* Rouge pour indiquer la déconnexion */
          transform: translateX(5px);
        }

        .logout-button::before {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;