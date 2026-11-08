const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const RapportController = require('../controllers/rapportController');

router.get('/monthly', RapportController.getMonthlyReport);

module.exports = router;