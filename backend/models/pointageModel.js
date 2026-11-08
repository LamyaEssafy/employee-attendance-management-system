const pool = require('../config/db');

const PointageModel = {
  addPointage: async (pointageData) => {
    const { agent_id, date_pointage, heure_entree, heure_sortie, type_pointage, localisation } = pointageData;
    const result = await pool.query(
      'INSERT INTO pointages (agent_id, date_pointage, heure_entree, heure_sortie, type_pointage, localisation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [agent_id, date_pointage, heure_entree, heure_sortie, type_pointage, localisation]
    );
    return result.rows[0];
  },

  getPointagesByAgent: async (agentId) => {
    const result = await pool.query(
      'SELECT * FROM pointages WHERE agent_id = $1 ORDER BY date_pointage DESC',
      [agentId]
    );
    return result.rows;
  },

  calculateWorkingHours: async (agentId, startDate, endDate) => {
    const result = await pool.query(
      'SELECT heure_entree, heure_sortie FROM pointages WHERE agent_id = $1 AND date_pointage BETWEEN $2 AND $3 AND heure_entree IS NOT NULL AND heure_sortie IS NOT NULL',
      [agentId, startDate, endDate]
    );

    let totalHours = 0;
    result.rows.forEach((pointage) => {
      const [entryHours, entryMinutes] = pointage.heure_entree.split(':').map(Number);
      const [exitHours, exitMinutes] = pointage.heure_sortie.split(':').map(Number);

      const entryTime = new Date(0, 0, 0, entryHours, entryMinutes);
      const exitTime = new Date(0, 0, 0, exitHours, exitMinutes);
      const diffMs = exitTime - entryTime;
      const diffHours = diffMs / (1000 * 60 * 60);
      totalHours += diffHours;
    });

    return totalHours;
  },
};

module.exports = PointageModel;