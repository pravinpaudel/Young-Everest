const express = require('express');
const footballController = require('../controllers/footballController');
const { testScrapeConfig } = require('../config/scrapeConfig');

const router = express.Router();

// Routes for football data
router.post('/standings', footballController.getStandings);
router.post('/fixtures', footballController.getFixtures);
router.post('/stats', footballController.getTeamStats);
router.post('/all', footballController.getAllData);
router.post('/test', footballController.testScraping);
router.get('/clear-cache/:dataType', footballController.clearCache);

// Test route to validate scraping configuration
router.get('/test-config/:websiteId/:dataType', async (req, res) => {
  try {
    const { websiteId, dataType } = req.params;
    const result = await testScrapeConfig(websiteId, dataType);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
