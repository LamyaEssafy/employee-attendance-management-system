const HoraireModel = require('../models/horaireModel');

const HoraireController = {
  getHorairesByAgent: async (req, res) => {
    try {
      const horaires = await HoraireModel.getHorairesByAgent(req.params.agentId);
      res.status(200).json(horaires);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  addHoraire: async (req, res) => {
    try {
      const horaire = await HoraireModel.addHoraire(req.body);
      res.status(201).json(horaire);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateHoraire: async (req, res) => {
    try {
      const horaire = await HoraireModel.updateHoraire(req.params.horaireId, req.body);
      if (!horaire) {
        return res.status(404).json({ error: 'Horaire non trouvé' });
      }
      res.status(200).json(horaire);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteHoraire: async (req, res) => {
    try {
      const horaire = await HoraireModel.deleteHoraire(req.params.horaireId);
      if (!horaire) {
        return res.status(404).json({ error: 'Horaire non trouvé' });
      }
      res.status(200).json({ message: 'Horaire supprimé' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = HoraireController;