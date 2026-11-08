const AgentModel = require('../models/agentModel');

const AgentController = {
  getAllAgents: async (req, res) => {
    try {
      const agents = await AgentModel.getAllAgents();
      res.status(200).json(agents);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAgentById: async (req, res) => {
    try {
      const agent = await AgentModel.getAgentById(req.params.id);
      if (!agent) {
        return res.status(404).json({ error: 'Agent non trouvé' });
      }
      res.status(200).json(agent);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = AgentController;