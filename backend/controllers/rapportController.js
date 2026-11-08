const RapportModel = require('../models/rapportModel');

const RapportController = {
  getMonthlyReport: async (req, res) => {
    const { agentId, year, month } = req.query;
    try {
      const report = await RapportModel.getMonthlyReport(agentId, year, month);
      res.status(200).json(report);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = RapportController;