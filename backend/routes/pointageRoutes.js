const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const PointageController = require('../controllers/pointageController');

router.post('/', PointageController.addPointage);
router.get('/:agentId', PointageController.getPointagesByAgent);
router.get('/working-hours', PointageController.getWorkingHours);

module.exports = router;