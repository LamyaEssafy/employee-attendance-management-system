import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PointagePage from './pages/PointagePage';
import RapportPage from './pages/RapportPage';
import ProfilPage from './pages/ProfilPage'; // Importer la page de profil
import Sidebar from './components/Sidebar';
import './assets/styles/App.css';

// Sous-composant pour gérer la navigation et la logique
const AppContent = () => {
  const { currentAgent } = useAuth();
  const location = useLocation();

  // Masquer la sidebar sur les pages de connexion et d'inscription
  const showSidebar = location.pathname !== '/login' && location.pathname !== '/' && location.pathname !== '/register';

  return (
    <div className="app-container">
      {showSidebar && currentAgent && <Sidebar />}
      <div className={showSidebar && currentAgent ? 'main-content-with-sidebar' : ''}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={currentAgent ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/pointage" element={currentAgent ? <PointagePage /> : <Navigate to="/login" />} />
          <Route path="/rapport" element={currentAgent ? <RapportPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={currentAgent ? <ProfilPage /> : <Navigate to="/login" />} /> {/* Nouvelle route */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;