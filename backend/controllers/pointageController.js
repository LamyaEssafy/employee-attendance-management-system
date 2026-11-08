const PointageModel = require('../models/pointageModel');

const PointageController = {
  addPointage: async (req, res) => {
    try {
      const pointage = await PointageModel.addPointage(req.body);
      res.status(201).json(pointage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getPointagesByAgent: async (req, res) => {
    try {
      const pointages = await PointageModel.getPointagesByAgent(req.params.agentId);
      res.status(200).json(pointages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getWorkingHours: async (req, res) => {
    const { agentId, startDate, endDate } = req.query;
    try {
      const totalHours = await PointageModel.calculateWorkingHours(agentId, startDate, endDate);
      res.status(200).json({ totalHours });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = PointageController;