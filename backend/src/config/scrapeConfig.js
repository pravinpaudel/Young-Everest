/**
 * Configuration for common football websites and their selectors
 * This will help make the scraper more flexible for different sites
 */

// const scrapingConfig = {
//   // Configuration for popular football statistics websites
//   // These are example selectors - adjust based on actual target websites

//   // Example config for a fictional football statistics site
//   'https://www.peisoccer.com/division/1387/31540/standings': {
//     standings: {
//       tableSelector: '#tblStats',
//       teamNameSelector: 'td[data-title="Team"] a', // finds a <td> (table cell) with the attribute data-title="GP".
//       playedSelector: 'td[data-title="GP"]',
//       winsSelector: 'td[data-title="W"]',
//       drawsSelector: 'td[data-title="T"]',
//       lossesSelector: 'td[data-title="L"]',
//       goalsForSelector: 'td[data-title="GF"]',
//       goalsAgainstSelector: 'td.goals-against',
//       pointsSelector: 'td[data-title="GA"]'
//     },
//     fixtures: {
//       fixtureSelector: '.fixture-list .fixture',
//       dateSelector: '.fixture-date',
//       timeSelector: '.fixture-time',
//       homeTeamSelector: '.home-team',
//       awayTeamSelector: '.away-team',
//       venueSelector: '.venue',
//       competitionSelector: '.competition',
//       scoreSelector: '.score'
//     },
//     stats: {
//       teamNameSelector: '.team-profile-header .team-name',
//       teamLogoSelector: '.team-profile-header .team-logo img',
//       statBlockSelector: '.team-stats .stat-item',
//       statLabelSelector: '.stat-label',
//       statValueSelector: '.stat-value',
//       playerSelector: '.player-stats .player'
//     }
//   },

//   // Configuration for another example site
//   'soccerdata.example.org': {
//     standings: {
//       tableSelector: '.standings-table',
//       rowSelector: '.team-standings-row',
//       positionSelector: '.team-position',
//       teamNameSelector: '.team-name',
//       playedSelector: '.matches-played',
//       winsSelector: '.matches-won',
//       drawsSelector: '.matches-drawn',
//       lossesSelector: '.matches-lost',
//       goalsForSelector: '.goals-scored',
//       goalsAgainstSelector: '.goals-conceded',
//       pointsSelector: '.team-points'
//     },
//     fixtures: {
//       fixtureSelector: '.match-card',
//       dateSelector: '.match-date',
//       timeSelector: '.match-time',
//       homeTeamSelector: '.team-home',
//       awayTeamSelector: '.team-away',
//       venueSelector: '.match-venue',
//       competitionSelector: '.match-competition',
//       scoreSelector: '.match-score'
//     },
//     stats: {
//       teamNameSelector: '.team-header-name',
//       teamLogoSelector: '.team-header-logo img',
//       statBlockSelector: '.team-stat-block',
//       statLabelSelector: '.stat-name',
//       statValueSelector: '.stat-value',
//       playerSelector: '.player-stat-item'
//     }
//   }
// };

const scrapingConfig = {
  peiSoccer: {
    standings: {
      url: 'https://www.peisoccer.com/division/1387/31540/standings',
      selector: '#tblStats',
      interactions: [
        {
          type: 'select',
          selector: '#ddlSeason',
          value: '9443',
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
        goalsAgainstSelector: 'td.goals-against',
        pointsSelector: 'td[data-title="GA"]'
      }
    },
    fixtures: {
      url: 'https://www.peisoccer.com/division/1387/31540/schedule',
      selector: '.matches',
      interactions: [
        {
          type: 'select',
          selector: '#ddlSeason',
          value: '9443',
          waitForNetwork: true
        }
      ],
      selectors: {
        fixtureSelector: '.match-item',
        dateSelector: '.match-date',
        timeSelector: '.match-time',
        homeTeamSelector: '.team-home',
        awayTeamSelector: '.team-away',
        venueSelector: '.match-venue',
        scoreSelector: '.match-score'
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
  },
  
  // Example configuration for ESPN
  espn: {
    standings: {
      url: 'https://www.espn.com/soccer/standings/_/league/eng.1',
      selector: '.standings__table',
      interactions: [],
      selectors: {
        tableSelector: '.Table__TBODY',
        teamNameSelector: '.team-link',
        playedSelector: 'td:nth-child(3)',
        winsSelector: 'td:nth-child(4)',
        drawsSelector: 'td:nth-child(5)',
        lossesSelector: 'td:nth-child(6)',
        goalsForSelector: 'td:nth-child(7)',
        goalsAgainstSelector: 'td:nth-child(8)',
        pointsSelector: 'td:nth-child(10)'
      }
    },
    fixtures: {
      url: 'https://www.espn.com/soccer/fixtures/_/league/eng.1',
      selector: '.schedule',
      interactions: [],
      selectors: {
        fixtureSelector: '.schedule__item',
        dateSelector: '.schedule__date',
        timeSelector: '.schedule__time',
        homeTeamSelector: '.schedule__team--home',
        awayTeamSelector: '.schedule__team--away',
        venueSelector: '.schedule__venue',
        scoreSelector: '.schedule__score'
      }
    },
    stats: {
      url: 'https://www.espn.com/soccer/team/stats/_/id/360/league/eng.1',
      selector: '.stats__table',
      interactions: [],
      selectors: {
        teamNameSelector: '.stats__team-name',
        teamLogoSelector: '.stats__team-logo img',
        statBlockSelector: '.stats__item',
        statLabelSelector: '.stats__label',
        statValueSelector: '.stats__value',
        playerSelector: '.stats__player'
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
