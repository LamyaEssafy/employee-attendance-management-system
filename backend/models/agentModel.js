const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class Agent {
  // Créer un nouvel agent (inscription)
  static async create(agentData) {
    const {
      matricule, password, nom, prenom, cin, date_naissance, date_embauche,
      poste, departement, site, email, telephone
    } = agentData;

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO agents (matricule, password_hash, nom, prenom, cin, date_naissance, date_embauche, poste, departement, site, email, telephone)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
    const values = [
      matricule, hashedPassword, nom, prenom, cin, date_naissance, date_embauche,
      poste, departement, site, email, telephone
    ];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw new Error('Erreur lors de la création de l\'agent : ' + err.message);
    }
  }

  // Trouver un agent par matricule (pour la connexion)
  static async findByMatricule(matricule) {
    const query = 'SELECT * FROM agents WHERE matricule = $1';
    const values = [matricule];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0] || null;
    } catch (err) {
      throw new Error('Erreur lors de la recherche de l\'agent : ' + err.message);
    }
  }
}

module.exports = Agent;