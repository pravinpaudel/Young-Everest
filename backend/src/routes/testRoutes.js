const express = require('express');
const { scrapeDynamicContent, extractStandings, extractFixtures, extractTeamStats } = require('../utils/scraper');
const { scrapingConfig } = require('../config/scrapeConfig');

const router = express.Router();

/**
 * Route for running scraper tests
 * POST /test/run
 * Body:
 *  - websiteId: ID of the website config to use
 *  - type: Type of data to scrape ('standings', 'fixtures', 'stats')
 *  - options: Additional options for the scraper
 */
router.post('/run', async (req, res) => {
  const { websiteId, type, options = {} } = req.body;
  
  try {
    // Validate input
    if (!websiteId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing websiteId parameter' 
      });
    }
    
    if (!type) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing type parameter (standings, fixtures, or stats)' 
      });
    }
    
    // Check if config exists
    if (!scrapingConfig[websiteId] || !scrapingConfig[websiteId][type]) {
      return res.status(404).json({ 
        success: false, 
        error: `Configuration not found for ${websiteId} and type ${type}` 
      });
    }
    
    const config = scrapingConfig[websiteId][type];
    const { url, selector, interactions = [], selectors } = config;
    
    console.log(`Running scraper test for ${websiteId} - ${type}`);
    
    // Configure scraper options
    const scraperOptions = {
      selector: selector,
      timeout: options.timeout || 30000,
      interactions: interactions,
      retryCount: options.retryCount || 1,
      captureScreenshot: options.captureScreenshot || false,
      logOptions: { verbose: options.verbose || false }
    };
    
    // Run the scraper
    console.log(`Starting scrape for ${url}`);
    const startTime = Date.now();
    const html = await scrapeDynamicContent(url, scraperOptions);
    const scrapeTime = Date.now() - startTime;
    
    // Extract data based on type
    let data;
    switch (type) {
      case 'standings':
        data = extractStandings(html, selectors);
        break;
      case 'fixtures':
        data = extractFixtures(html, selectors);
        break;
      case 'stats':
        data = extractTeamStats(html, selectors);
        break;
      default:
        data = { 
          message: 'No data extraction performed - unknown type', 
          htmlPreview: html.substring(0, 500) + '...' 
        };
    }
    
    // Return results
    res.json({
      success: true,
      websiteId,
      type,
      url,
      scrapeTimeMs: scrapeTime,
      dataCount: Array.isArray(data) ? data.length : 1,
      data: data
    });
    
  } catch (error) {
    console.error('Error in test route:', error);
    
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toJSON ? error.toJSON() : undefined,
      websiteId,
      type
    });
  }
});

/**
 * Route to list all available website configurations
 * GET /test/configs
 */
router.get('/configs', (req, res) => {
  try {
    const configs = {};
    
    // Format the configuration data for the response
    Object.keys(scrapingConfig).forEach(websiteId => {
      configs[websiteId] = {};
      
      Object.keys(scrapingConfig[websiteId]).forEach(type => {
        const config = scrapingConfig[websiteId][type];
        configs[websiteId][type] = {
          url: config.url,
          selector: config.selector,
          interactionsCount: config.interactions ? config.interactions.length : 0,
          selectorsCount: config.selectors ? Object.keys(config.selectors).length : 0
        };
      });
    });
    
    res.json({
      success: true,
      configs
    });
    
  } catch (error) {
    console.error('Error listing configurations:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
