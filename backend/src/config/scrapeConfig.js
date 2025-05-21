/**
 * Configuration for common football websites and their selectors
 * This will help make the scraper more flexible for different sites
 */

const scrapingConfig = {
  // Configuration for popular football statistics websites
  // These are example selectors - adjust based on actual target websites
  
  // Example config for a fictional football statistics site
  'footballstats.example.com': {
    standings: {
      tableSelector: 'table.league-table',
      rowSelector: 'tr.team-row',
      positionSelector: 'td.position',
      teamNameSelector: 'td.team-name',
      playedSelector: 'td.played',
      winsSelector: 'td.wins',
      drawsSelector: 'td.draws',
      lossesSelector: 'td.losses',
      goalsForSelector: 'td.goals-for',
      goalsAgainstSelector: 'td.goals-against',
      pointsSelector: 'td.points'
    },
    fixtures: {
      fixtureSelector: '.fixture-list .fixture',
      dateSelector: '.fixture-date',
      timeSelector: '.fixture-time',
      homeTeamSelector: '.home-team',
      awayTeamSelector: '.away-team',
      venueSelector: '.venue',
      competitionSelector: '.competition',
      scoreSelector: '.score'
    },
    stats: {
      teamNameSelector: '.team-profile-header .team-name',
      teamLogoSelector: '.team-profile-header .team-logo img',
      statBlockSelector: '.team-stats .stat-item',
      statLabelSelector: '.stat-label',
      statValueSelector: '.stat-value',
      playerSelector: '.player-stats .player'
    }
  },
  
  // Configuration for another example site
  'soccerdata.example.org': {
    standings: {
      tableSelector: '.standings-table',
      rowSelector: '.team-standings-row',
      positionSelector: '.team-position',
      teamNameSelector: '.team-name',
      playedSelector: '.matches-played',
      winsSelector: '.matches-won',
      drawsSelector: '.matches-drawn',
      lossesSelector: '.matches-lost',
      goalsForSelector: '.goals-scored',
      goalsAgainstSelector: '.goals-conceded',
      pointsSelector: '.team-points'
    },
    fixtures: {
      fixtureSelector: '.match-card',
      dateSelector: '.match-date',
      timeSelector: '.match-time',
      homeTeamSelector: '.team-home',
      awayTeamSelector: '.team-away',
      venueSelector: '.match-venue',
      competitionSelector: '.match-competition',
      scoreSelector: '.match-score'
    },
    stats: {
      teamNameSelector: '.team-header-name',
      teamLogoSelector: '.team-header-logo img',
      statBlockSelector: '.team-stat-block',
      statLabelSelector: '.stat-name',
      statValueSelector: '.stat-value',
      playerSelector: '.player-stat-item'
    }
  }
};

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
 * @returns {string|null} - Domain key if found, null otherwise
 */
function detectWebsiteFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Check if we have configuration for this hostname
    if (scrapingConfig[hostname]) {
      return hostname;
    }
    
    // Try to match by partial domain
    for (const domain of Object.keys(scrapingConfig)) {
      if (hostname.includes(domain) || domain.includes(hostname)) {
        return domain;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}

module.exports = {
  scrapingConfig,
  getSelectorsForWebsite,
  detectWebsiteFromUrl
};
