import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Ajouter le token dans les en-têtes des requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gérer les erreurs d'authentification (redirection vers /login si 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentAgent');
      window.location.href = '/login'; // Rediriger vers la page de login
    }
    return Promise.reject(error);
  }
);

export const login = (matricule, password) =>
  api.post('/auth/login', { matricule, password });

export const register = (agentData) =>
  api.post('/auth/register', agentData);

export const getAgents = () =>
  api.get('/agents');

export const getPointages = (agentId) =>
  api.get(`/pointages/${agentId}`);

export const addPointage = (pointageData) =>
  api.post('/pointages', pointageData);

export const getWorkingHours = (agentId, startDate, endDate) =>
  api.get(`/pointages/working-hours?agentId=${agentId}&startDate=${startDate}&endDate=${endDate}`);

export const getMonthlyReport = (agentId, year, month) =>
  api.get(`/rapports/monthly?agentId=${agentId}&year=${year}&month=${month}`);

export default api;