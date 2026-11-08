const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const AgentController = require('../controllers/agentController');

router.get('/', AgentController.getAllAgents);
router.get('/:id', AgentController.getAgentById);

module.exports = router;