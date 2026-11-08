const pool = require('../config/db');

const HoraireModel = {
  getHorairesByAgent: async (agentId) => {
    const result = await pool.query(
      'SELECT * FROM horaires WHERE agent_id = $1 ORDER BY jour_semaine',
      [agentId]
    );
    return result.rows;
  },

  addHoraire: async (horaireData) => {
    const { agent_id, jour_semaine, type, heure_debut, heure_fin } = horaireData;
    const result = await pool.query(
      'INSERT INTO horaires (agent_id, jour_semaine, type, heure_debut, heure_fin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [agent_id, jour_semaine, type, heure_debut, heure_fin]
    );
    return result.rows[0];
  },

  updateHoraire: async (horaireId, horaireData) => {
    const { jour_semaine, type, heure_debut, heure_fin } = horaireData;
    const result = await pool.query(
      'UPDATE horaires SET jour_semaine = $1, type = $2, heure_debut = $3, heure_fin = $4 WHERE horaire_id = $5 RETURNING *',
      [jour_semaine, type, heure_debut, heure_fin, horaireId]
    );
    return result.rows[0];
  },

  deleteHoraire: async (horaireId) => {
    const result = await pool.query(
      'DELETE FROM horaires WHERE horaire_id = $1 RETURNING *',
      [horaireId]
    );
    return result.rows[0];
  },
};

module.exports = HoraireModel;