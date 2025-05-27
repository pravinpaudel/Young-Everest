const { 
  scrapeDynamicContent,
  extractStandings, 
  extractFixtures, 
  extractTeamStats 
} = require('../utils/scraper');
const { 
  scrapingConfig,
  getSelectorsForWebsite, 
  detectWebsiteFromUrl 
} = require('../config/scrapeConfig');

// Cache for storing scraped data to reduce scraping frequency
// This simple in-memory cache will be reset when server restarts
const cache = {
  standings: { data: null, timestamp: 0 },
  fixtures: { data: null, timestamp: 0 },
  stats: { data: null, timestamp: 0 }
};

// Cache duration in milliseconds (6 hours)
const CACHE_DURATION = 6 * 60 * 60 * 1000;

/**
 * Get team standings
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function getStandings(req, res) {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cache.standings.data && (now - cache.standings.timestamp) < CACHE_DURATION) {
      return res.json({ data: cache.standings.data, fromCache: true });
    }

    // Get website ID or URL from request body
    const { websiteId, url } = req.body;
    let scrapingUrl, selectors, interactions;
    
    // If websiteId is provided, use predefined configuration
    if (websiteId && scrapingConfig[websiteId] && scrapingConfig[websiteId].standings) {
      const config = scrapingConfig[websiteId].standings;
      scrapingUrl = config.url;
      selectors = config.selectors;
      interactions = config.interactions || [];
      console.log(`Using predefined configuration for ${websiteId}`);
    } else if (url) {
      // If no websiteId but URL is provided, try to detect website
      scrapingUrl = url;
      const detectedDomain = detectWebsiteFromUrl(url);
      
      if (detectedDomain && scrapingConfig[detectedDomain] && scrapingConfig[detectedDomain].standings) {
        const config = scrapingConfig[detectedDomain].standings;
        selectors = config.selectors;
        interactions = config.interactions || [];
        console.log(`Detected and using configuration for ${detectedDomain}`);
      } else {
        // No configuration found, use user-provided or default selectors
        selectors = req.body.selectors || {};
        interactions = req.body.interactions || [];
      }
    } else {
      return res.status(400).json({ 
        error: 'Either websiteId or url must be provided in the request body' 
      });
    }

    // Merge with any user-provided selectors, prioritizing user selectors
    if (req.body.selectors) {
      selectors = { ...selectors, ...req.body.selectors };
    }

    // Merge with any user-provided interactions, prioritizing user interactions
    if (req.body.interactions) {
      interactions = [...interactions, ...req.body.interactions];
    }
    
    // Scrape the website using the new configuration approach
    const html = await scrapeDynamicContent(scrapingUrl, {
      selector: selectors.tableSelector || 'table.standings', 
      timeout: req.body.timeout || 30000,
      interactions: interactions
    });
    
    // Extract data
    const standings = extractStandings(html, selectors);
    
    // Update cache
    cache.standings = {
      data: standings,
      timestamp: now
    };
    
    res.json({ data: standings, fromCache: false });
  } catch (error) {
    console.error('Error getting standings:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get fixtures/matches
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function getFixtures(req, res) {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cache.fixtures.data && (now - cache.fixtures.timestamp) < CACHE_DURATION) {
      return res.json({ data: cache.fixtures.data, fromCache: true });
    }

    // Get website ID or URL from request body
    const { websiteId, url } = req.body;
    let scrapingUrl, selectors, interactions;
    
    // If websiteId is provided, use predefined configuration
    if (websiteId && scrapingConfig[websiteId] && scrapingConfig[websiteId].fixtures) {
      const config = scrapingConfig[websiteId].fixtures;
      scrapingUrl = config.url;
      selectors = config.selectors;
      interactions = config.interactions || [];
      console.log(`Using predefined configuration for ${websiteId}`);
    } else if (url) {
      // If no websiteId but URL is provided, try to detect website
      scrapingUrl = url;
      const detectedDomain = detectWebsiteFromUrl(url);
      
      if (detectedDomain && scrapingConfig[detectedDomain] && scrapingConfig[detectedDomain].fixtures) {
        const config = scrapingConfig[detectedDomain].fixtures;
        selectors = config.selectors;
        interactions = config.interactions || [];
        console.log(`Detected and using configuration for ${detectedDomain}`);
      } else {
        // No configuration found, use user-provided or default selectors
        selectors = req.body.selectors || {};
        interactions = req.body.interactions || [];
      }
    } else {
      return res.status(400).json({ 
        error: 'Either websiteId or url must be provided in the request body' 
      });
    }
    
    // Merge with any user-provided selectors, prioritizing user selectors
    if (req.body.selectors) {
      selectors = { ...selectors, ...req.body.selectors };
    }

    // Merge with any user-provided interactions, prioritizing user interactions
    if (req.body.interactions) {
      interactions = [...interactions, ...req.body.interactions];
    }
    
    // Scrape the website
    const html = await scrapeDynamicContent(scrapingUrl, {
      selector: selectors.fixtureSelector || '.fixture-item', 
      timeout: req.body.timeout || 30000,
      interactions: interactions
    });
    
    // Extract data
    const fixtures = extractFixtures(html, selectors);
    
    // Update cache
    cache.fixtures = {
      data: fixtures,
      timestamp: now
    };
    
    res.json({ data: fixtures, fromCache: false });
  } catch (error) {
    console.error('Error getting fixtures:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get team statistics
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function getTeamStats(req, res) {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cache.stats.data && (now - cache.stats.timestamp) < CACHE_DURATION) {
      return res.json({ data: cache.stats.data, fromCache: true });
    }

    // Get website ID or URL from request body
    const { websiteId, url } = req.body;
    let scrapingUrl, selectors, interactions;
    
    // If websiteId is provided, use predefined configuration
    if (websiteId && scrapingConfig[websiteId] && scrapingConfig[websiteId].stats) {
      const config = scrapingConfig[websiteId].stats;
      scrapingUrl = config.url;
      selectors = config.selectors;
      interactions = config.interactions || [];
      console.log(`Using predefined configuration for ${websiteId}`);
    } else if (url) {
      // If no websiteId but URL is provided, try to detect website
      scrapingUrl = url;
      const detectedDomain = detectWebsiteFromUrl(url);
      
      if (detectedDomain && scrapingConfig[detectedDomain] && scrapingConfig[detectedDomain].stats) {
        const config = scrapingConfig[detectedDomain].stats;
        selectors = config.selectors;
        interactions = config.interactions || [];
        console.log(`Detected and using configuration for ${detectedDomain}`);
      } else {
        // No configuration found, use user-provided or default selectors
        selectors = req.body.selectors || {};
        interactions = req.body.interactions || [];
      }
    } else {
      return res.status(400).json({ 
        error: 'Either websiteId or url must be provided in the request body' 
      });
    }
    
    // Merge with any user-provided selectors, prioritizing user selectors
    if (req.body.selectors) {
      selectors = { ...selectors, ...req.body.selectors };
    }

    // Merge with any user-provided interactions, prioritizing user interactions
    if (req.body.interactions) {
      interactions = [...interactions, ...req.body.interactions];
    }
    
    // Scrape the website
    const html = await scrapeDynamicContent(scrapingUrl, {
      selector: selectors.teamNameSelector || '.team-name', 
      timeout: req.body.timeout || 30000,
      interactions: interactions
    });
    
    // Extract data
    const stats = extractTeamStats(html, selectors);
    
    // Update cache
    cache.stats = {
      data: stats,
      timestamp: now
    };
    
    res.json({ data: stats, fromCache: false });
  } catch (error) {
    console.error('Error getting team stats:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Clear cache to force fresh data fetch
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
function clearCache(req, res) {
  try {
    const { dataType } = req.params;
    
    if (dataType === 'all') {
      // Clear all cache
      cache.standings = { data: null, timestamp: 0 };
      cache.fixtures = { data: null, timestamp: 0 };
      cache.stats = { data: null, timestamp: 0 };
      
      return res.json({ message: 'All cache cleared successfully' });
    } else if (cache[dataType]) {
      // Clear specific cache
      cache[dataType] = { data: null, timestamp: 0 };
      return res.json({ message: `${dataType} cache cleared successfully` });
    } else {
      return res.status(400).json({ error: 'Invalid data type' });
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get all football data in a single request
 * @param {object} req - Express request object
 * @param {object} res - Express response object 
 */
async function getAllData(req, res) {
  try {
    const { websiteId } = req.body;
    let standingsConfig, fixturesConfig, statsConfig;
    
    // Check if we're using a predefined website configuration
    if (websiteId && scrapingConfig[websiteId]) {
      const config = scrapingConfig[websiteId];
      standingsConfig = config.standings || null;
      fixturesConfig = config.fixtures || null;
      statsConfig = config.stats || null;
      console.log(`Using predefined configuration for ${websiteId}`);
    } else {
      // If no websiteId, use URL-based configuration
      standingsConfig = {
        url: req.body.standingsUrl || null,
        selectors: req.body.standingsSelectors || {},
        interactions: req.body.standingsInteractions || []
      };
      
      fixturesConfig = {
        url: req.body.fixturesUrl || null,
        selectors: req.body.fixturesSelectors || {},
        interactions: req.body.fixturesInteractions || []
      };
      
      statsConfig = {
        url: req.body.statsUrl || null,
        selectors: req.body.statsSelectors || {},
        interactions: req.body.statsInteractions || []
      };
    }
    
    // Check if all data is cached
    const now = Date.now();
    const allCached = 
      cache.standings.data && (now - cache.standings.timestamp < CACHE_DURATION) &&
      cache.fixtures.data && (now - cache.fixtures.timestamp < CACHE_DURATION) &&
      cache.stats.data && (now - cache.stats.timestamp < CACHE_DURATION);
    
    if (allCached) {
      return res.json({
        standings: cache.standings.data,
        fixtures: cache.fixtures.data,
        stats: cache.stats.data,
        fromCache: true
      });
    }
    
    // If not all cached, fetch missing data
    const promises = [];
    
    // Standings
    if (standingsConfig && standingsConfig.url && (!cache.standings.data || (now - cache.standings.timestamp >= CACHE_DURATION))) {
      promises.push(
        scrapeDynamicContent(standingsConfig.url, {
          selector: (standingsConfig.selectors && standingsConfig.selectors.tableSelector) || 'table.standings',
          timeout: req.body.timeout || 30000,
          interactions: standingsConfig.interactions || []
        }).then(html => {
          const data = extractStandings(html, standingsConfig.selectors || {});
          cache.standings = { data, timestamp: now };
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(cache.standings.data || []));
    }
    
    // Fixtures
    if (fixturesConfig && fixturesConfig.url && (!cache.fixtures.data || (now - cache.fixtures.timestamp >= CACHE_DURATION))) {
      promises.push(
        scrapeDynamicContent(fixturesConfig.url, {
          selector: (fixturesConfig.selectors && fixturesConfig.selectors.fixtureSelector) || '.fixture-item',
          timeout: req.body.timeout || 30000,
          interactions: fixturesConfig.interactions || []
        }).then(html => {
          const data = extractFixtures(html, fixturesConfig.selectors || {});
          cache.fixtures = { data, timestamp: now };
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(cache.fixtures.data || []));
    }
    
    // Stats
    if (statsConfig && statsConfig.url && (!cache.stats.data || (now - cache.stats.timestamp >= CACHE_DURATION))) {
      promises.push(
        scrapeDynamicContent(statsConfig.url, {
          selector: (statsConfig.selectors && statsConfig.selectors.teamNameSelector) || '.team-name',
          timeout: req.body.timeout || 30000,
          interactions: statsConfig.interactions || []
        }).then(html => {
          const data = extractTeamStats(html, statsConfig.selectors || {});
          cache.stats = { data, timestamp: now };
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(cache.stats.data || {}));
    }
    
    // Wait for all promises to resolve
    const [standings, fixtures, stats] = await Promise.all(promises);
    
    res.json({
      standings,
      fixtures,
      stats,
      fromCache: false
    });
  } catch (error) {
    console.error('Error getting all data:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Test scraping with provided URL, selectors, and interactions
 * Used for debugging and setting up scraping
 */
async function testScraping(req, res) {
  try {
    const { 
      url, 
      selector, 
      timeout = 30000, 
      type, 
      interactions = [],
      websiteId
    } = req.body;
    
    let scrapingUrl, scrapingSelector, scrapingInteractions, selectors;
    
    // If websiteId is provided, use the predefined configuration
    if (websiteId && scrapingConfig[websiteId]) {
      if (type && scrapingConfig[websiteId][type]) {
        const config = scrapingConfig[websiteId][type];
        scrapingUrl = config.url;
        selectors = config.selectors || {};
        scrapingSelector = (selectors.tableSelector || selectors.fixtureSelector || selectors.teamNameSelector) || 'body';
        scrapingInteractions = config.interactions || [];
        console.log(`Using predefined configuration for ${websiteId}`);
      } else {
        return res.status(400).json({ 
          error: `Configuration not found for type '${type}' in website '${websiteId}'` 
        });
      }
    } else if (url) {
      // URL-based scraping
      scrapingUrl = url;
      selectors = req.body.selectors || {};
      scrapingSelector = selector || 'body';
      scrapingInteractions = interactions || [];
    } else {
      return res.status(400).json({ 
        error: 'Either websiteId or url must be provided in the request body' 
      });
    }
    
    // Merge with any user-provided selectors, prioritizing user selectors
    if (req.body.selectors) {
      selectors = { ...selectors, ...req.body.selectors };
    }
    
    // Perform the scraping
    console.log(`Testing scraping for URL: ${scrapingUrl}`);
    const html = await scrapeDynamicContent(scrapingUrl, {
      selector: scrapingSelector,
      timeout: timeout,
      interactions: scrapingInteractions
    });
    
    let data;
    if (type === 'standings') {
      data = extractStandings(html, selectors);
    } else if (type === 'fixtures') {
      data = extractFixtures(html, selectors);
    } else if (type === 'stats') {
      data = extractTeamStats(html, selectors);
    } else {
      // Just return a sample of the HTML if no type specified
      data = {
        htmlPreview: html.substring(0, 1000) + '...',
        message: 'No extraction type specified. Showing HTML preview only.'
      };
    }
    
    // Include metadata about the scraping process
    const metadata = {
      url: scrapingUrl,
      selector: scrapingSelector,
      interactionsPerformed: scrapingInteractions.map(i => i.type),
      timestamp: new Date().toISOString()
    };
    
    res.json({ success: true, data, metadata });
  } catch (error) {
    console.error('Error in test scraping:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getStandings,
  getFixtures,
  getTeamStats,
  clearCache,
  getAllData,
  testScraping
};
