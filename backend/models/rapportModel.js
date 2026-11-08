const pool = require('../config/db');

const RapportModel = {
  getMonthlyReport: async (agentId, year, month) => {
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;

    const pointages = await pool.query(
      'SELECT * FROM pointages WHERE agent_id = $1 AND date_pointage BETWEEN $2 AND $3',
      [agentId, startDate, endDate]
    );

    const absences = await pool.query(
      'SELECT * FROM absence WHERE agent_id = $1 AND date_debut BETWEEN $2 AND $3',
      [agentId, startDate, endDate]
    );

    const heuresSupp = await pool.query(
      'SELECT * FROM heures_supp WHERE agent_id = $1 AND date_heure_debut BETWEEN $2 AND $3',
      [agentId, startDate, endDate]
    );

    return {
      pointages: pointages.rows,
      absences: absences.rows,
      heuresSupplementaires: heuresSupp.rows,
    };
  },
};

module.exports = RapportModel;