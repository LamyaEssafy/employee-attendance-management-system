const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const agentRoutes = require('./routes/agentRoutes');
const pointageRoutes = require('./routes/pointageRoutes');
const horaireRoutes = require('./routes/horaireRoutes');
const rapportRoutes = require('./routes/rapportRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes publiques
app.use('/api/auth', authRoutes);

// Routes protégées par le middleware d'authentification
app.use('/api/agents', authMiddleware, agentRoutes);
app.use('/api/pointages', authMiddleware, pointageRoutes);
app.use('/api/horaires', authMiddleware, horaireRoutes);
app.use('/api/rapports', authMiddleware, rapportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});