const express = require('express');
const footballController = require('../controllers/footballController');

const router = express.Router();

// Routes for football data
router.post('/standings', footballController.getStandings);
router.post('/fixtures', footballController.getFixtures);
router.post('/stats', footballController.getTeamStats);
router.post('/all', footballController.getAllData);
router.post('/test', footballController.testScraping);
router.get('/clear-cache/:dataType', footballController.clearCache);

module.exports = router;
