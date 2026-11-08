const Agent = require('../models/agentModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const {
    matricule, password, nom, prenom, cin, date_naissance, date_embauche,
    poste, departement, site, email, telephone
  } = req.body;

  console.log('Données reçues pour l\'inscription:', req.body); // Log pour débogage

  try {
    // Vérifier si l'agent existe déjà (par matricule ou email)
    const existingAgent = await Agent.findByMatricule(matricule);
    if (existingAgent) {
      return res.status(400).json({ error: 'Un agent avec ce matricule existe déjà.' });
    }

    // Créer un nouvel agent
    const agentData = {
      matricule, password, nom, prenom, cin, date_naissance, date_embauche,
      poste, departement, site, email, telephone
    };
    const newAgent = await Agent.create(agentData);

    console.log('Agent inséré dans la base de données:', newAgent); // Log pour débogage

    res.status(201).json({ message: 'Agent créé avec succès', agent: newAgent });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err.message); // Log pour débogage
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { matricule, password } = req.body;

  console.log('Tentative de connexion avec matricule:', matricule, 'et mot de passe:', password); // Log pour débogage

  try {
    // Vérifier si l'agent est déjà inscrit
    const agent = await Agent.findByMatricule(matricule);
    console.log('Agent trouvé:', agent); // Log pour débogage

    if (!agent) {
      return res.status(401).json({ error: 'Agent non trouvé. Veuillez vous inscrire.' });
    }

    // Vérifier que agent.password_hash existe
    if (!agent.password_hash) {
      return res.status(500).json({ error: 'Le mot de passe de l\'agent est manquant dans la base de données.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, agent.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Répondre avec un message de succès et les données de l'agent
    res.status(200).json({ message: 'Connexion réussie', agent });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err.message); // Log pour débogage
    res.status(500).json({ error: err.message });
  }
};