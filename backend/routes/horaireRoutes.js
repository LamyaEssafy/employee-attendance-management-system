const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const HoraireController = require('../controllers/horaireController');

router.get('/:agentId', HoraireController.getHorairesByAgent);
router.post('/', HoraireController.addHoraire);
router.put('/:horaireId', HoraireController.updateHoraire);
router.delete('/:horaireId', HoraireController.deleteHoraire);

module.exports = router;