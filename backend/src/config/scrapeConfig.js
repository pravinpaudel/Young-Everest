/**
 * Configuration for common football websites and their selectors
 * This will help make the scraper more flexible for different sites
 */
const scrapingConfig = {
  peiSoccer: {
    standings: {
      url: 'https://peisoccer.com/division/1387/34875/standings',
      selector: '#tblStats',
      interactions: [
        {
          type: 'select',
          selector: '#ddlSeason',
          value: '12050',
          waitForNetwork: true
        }
      ],
      selectors: {
        tableSelector: '#tblStats',
        teamNameSelector: 'td[data-title="Team"] a',
        playedSelector: 'td[data-title="GP"]',
        winsSelector: 'td[data-title="W"]',
        drawsSelector: 'td[data-title="T"]',
        lossesSelector: 'td[data-title="L"]',
        goalsForSelector: 'td[data-title="GF"]',
        goalsAgainstSelector: 'td[data-title="GA"]',
        pointsSelector: 'td[data-title="PTS"]'
      }
    },
    fixtures: {
      url: 'https://peisoccer.com/division/1387/34875/games',
      selector: 'body',
      interactions: [
        {
          type: 'select',
          selector: '#ddlSeason',
          value: '12050',
          waitForNetwork: true
        }
      ],
      selectors: {
        fixtureSelector: '#tblSchedule',
        dateSelector: 'td[data-title="Date"]',
        venueSelector: 'td[data-title="Location"] a',
        homeTeamSelector: 'td[data-title="Home"] a',
        awayTeamSelector: 'td[data-title="Visitor"] a',
      }
    }
  },
  
  // Example configuration for FIFA.com
  fifa: {
    standings: {
      url: 'https://www.fifa.com/tournaments/mens/worldcup/qatar2022/standings',
      selector: '.fp-standings-table',
      interactions: [],
      selectors: {
        tableSelector: '.fp-standings-table',
        teamNameSelector: '.fp-standings-table__team-name',
        playedSelector: '.fp-standings-table__played',
        winsSelector: '.fp-standings-table__wins',
        drawsSelector: '.fp-standings-table__draws',
        lossesSelector: '.fp-standings-table__losses',
        goalsForSelector: '.fp-standings-table__goals-for',
        goalsAgainstSelector: '.fp-standings-table__goals-against',
        pointsSelector: '.fp-standings-table__points'
      }
    },
    fixtures: {
      url: 'https://www.fifa.com/tournaments/mens/worldcup/qatar2022/matches',
      selector: '.fp-match-card-list',
      interactions: [
        {
          type: 'click',
          selector: '.fp-filter-button',
          waitForSelector: '.fp-filter-dropdown'
        }
      ],
      selectors: {
        fixtureSelector: '.fp-match-card',
        dateSelector: '.fp-match-card__date',
        timeSelector: '.fp-match-card__time',
        homeTeamSelector: '.fp-match-card__team--home .fp-match-card__team-name',
        awayTeamSelector: '.fp-match-card__team--away .fp-match-card__team-name',
        venueSelector: '.fp-match-card__venue',
        scoreSelector: '.fp-match-card__score'
      }
    }
  }
}
/**
 * Get selectors for a specific website and data type
 * @param {string} domain - Website domain (e.g., 'footballstats.example.com')
 * @param {string} dataType - Type of data ('standings', 'fixtures', or 'stats')
 * @returns {object|null} - Selectors configuration or null if not found
 */
function getSelectorsForWebsite(domain, dataType) {
  if (!scrapingConfig[domain]) {
    return null;
  }

  return scrapingConfig[domain][dataType] || null;
}

/**
 * Detect which website configuration to use based on URL
 * @param {string} url - The URL to analyze
 * @returns {string|null} - Website ID if found, null otherwise
 */
function detectWebsiteFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Map of domains to website IDs
    const domainMappings = {
      'peisoccer.com': 'peiSoccer',
      'fifa.com': 'fifa',
      'espn.com': 'espn'
    };

    // Check for exact domain matches
    for (const [domain, websiteId] of Object.entries(domainMappings)) {
      if (hostname.includes(domain)) {
        console.log(`Detected website: ${websiteId} from domain: ${domain}`);
        return websiteId;
      }
    }

    // If no direct match, check if config exists with the hostname
    if (scrapingConfig[hostname]) {
      return hostname;
    }

    console.log(`No website configuration found for URL: ${url}`);
    return null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}

/**
 * Test function to validate scraping configuration
 * @param {string} websiteId - ID of the website to test
 * @param {string} dataType - Type of data to scrape ('standings', 'fixtures', 'stats')
 * @returns {object} - Test result
 */
async function testScrapeConfig(websiteId, dataType) {
  try {
    if (!scrapingConfig[websiteId]) {
      return { success: false, error: `Website ${websiteId} not found in configuration` };
    }
    
    const config = scrapingConfig[websiteId][dataType];
    if (!config) {
      return { success: false, error: `Data type ${dataType} not found for website ${websiteId}` };
    }
    
    const { url, selector, interactions, selectors } = config;
    
    return {
      success: true,
      config: {
        websiteId,
        dataType,
        url,
        selector,
        interactions: interactions ? interactions.length : 0,
        selectorsCount: Object.keys(selectors || {}).length
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  scrapingConfig,
  getSelectorsForWebsite,
  detectWebsiteFromUrl,
  testScrapeConfig
};
