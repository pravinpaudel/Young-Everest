const { 
  scrapeDynamicContent,
  extractStandings, 
  extractFixtures, 
  extractTeamStats 
} = require('../utils/scraper');
const { 
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

    // Get URL from request body or use default
    const { url = 'https://example.com/football/standings' } = req.body;
    
    // Try to detect website and get appropriate selectors
    const detectedDomain = detectWebsiteFromUrl(url);
    let selectors = req.body.selectors || {};
    
    if (detectedDomain) {
      const configSelectors = getSelectorsForWebsite(detectedDomain, 'standings');
      if (configSelectors) {
        // Merge with any user-provided selectors, prioritizing user selectors
        selectors = { ...configSelectors, ...selectors };
        console.log(`Using predefined selectors for ${detectedDomain}`);
      }
    }
    
    // Scrape the website
    const html = await scrapeDynamicContent(url, {
      selector: selectors.tableSelector || 'table.standings', 
      waitTime: req.body.waitTime || 3000
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

    // Get URL from request body or use default
    const { url = 'https://example.com/football/fixtures' } = req.body;
    
    // Try to detect website and get appropriate selectors
    const detectedDomain = detectWebsiteFromUrl(url);
    let selectors = req.body.selectors || {};
    
    if (detectedDomain) {
      const configSelectors = getSelectorsForWebsite(detectedDomain, 'fixtures');
      if (configSelectors) {
        // Merge with any user-provided selectors, prioritizing user selectors
        selectors = { ...configSelectors, ...selectors };
        console.log(`Using predefined selectors for ${detectedDomain}`);
      }
    }
    
    // Scrape the website
    const html = await scrapeDynamicContent(url, {
      selector: selectors.fixtureSelector || '.fixture-item', 
      waitTime: req.body.waitTime || 3000
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

    // Get URL from request body or use default
    const { url = 'https://example.com/football/team-stats' } = req.body;
    
    // Try to detect website and get appropriate selectors
    const detectedDomain = detectWebsiteFromUrl(url);
    let selectors = req.body.selectors || {};
    
    if (detectedDomain) {
      const configSelectors = getSelectorsForWebsite(detectedDomain, 'stats');
      if (configSelectors) {
        // Merge with any user-provided selectors, prioritizing user selectors
        selectors = { ...configSelectors, ...selectors };
        console.log(`Using predefined selectors for ${detectedDomain}`);
      }
    }
    
    // Scrape the website
    const html = await scrapeDynamicContent(url, {
      selector: selectors.teamNameSelector || '.team-name', 
      waitTime: req.body.waitTime || 3000
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
    // URLs for scraping
    const { 
      standingsUrl = 'https://example.com/football/standings',
      fixturesUrl = 'https://example.com/football/fixtures',
      statsUrl = 'https://example.com/football/team-stats'
    } = req.body;
    
    // Custom selectors
    const selectors = req.body.selectors || {};
    
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
    if (!cache.standings.data || (now - cache.standings.timestamp >= CACHE_DURATION)) {
      promises.push(
        scrapeDynamicContent(standingsUrl, {
          selector: selectors.tableSelector || 'table.standings',
          waitTime: 3000
        }).then(html => {
          const data = extractStandings(html, selectors);
          cache.standings = { data, timestamp: now };
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(cache.standings.data));
    }
    
    // Fixtures
    if (!cache.fixtures.data || (now - cache.fixtures.timestamp >= CACHE_DURATION)) {
      promises.push(
        scrapeDynamicContent(fixturesUrl, {
          selector: selectors.fixtureSelector || '.fixture-item',
          waitTime: 3000
        }).then(html => {
          const data = extractFixtures(html, selectors);
          cache.fixtures = { data, timestamp: now };
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(cache.fixtures.data));
    }
    
    // Stats
    if (!cache.stats.data || (now - cache.stats.timestamp >= CACHE_DURATION)) {
      promises.push(
        scrapeDynamicContent(statsUrl, {
          selector: selectors.teamNameSelector || '.team-name',
          waitTime: 3000
        }).then(html => {
          const data = extractTeamStats(html, selectors);
          cache.stats = { data, timestamp: now };
          return data;
        })
      );
    } else {
      promises.push(Promise.resolve(cache.stats.data));
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
 * Test scraping with provided URL and selectors
 * Used for debugging and setting up scraping
 */
async function testScraping(req, res) {
  try {
    const { url, selector, waitTime = 3000, type } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    const html = await scrapeDynamicContent(url, {
      selector: selector || 'body',
      waitTime
    });
    
    let data;
    if (type === 'standings') {
      data = extractStandings(html, req.body.selectors);
    } else if (type === 'fixtures') {
      data = extractFixtures(html, req.body.selectors);
    } else if (type === 'stats') {
      data = extractTeamStats(html, req.body.selectors);
    } else {
      // Just return a sample of the HTML if no type specified
      data = {
        htmlPreview: html.substring(0, 1000) + '...',
        message: 'No extraction type specified. Showing HTML preview only.'
      };
    }
    
    res.json({ success: true, data });
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
