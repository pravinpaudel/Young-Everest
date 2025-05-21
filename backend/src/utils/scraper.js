const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');

/**
 * Scrape dynamic content using Puppeteer (headless browser)
 * @param {string} url - URL to scrape
 * @param {object} options - Scraping options
 * @returns {Promise<string>} - HTML content
 */
async function scrapeDynamicContent(url, options = {}) {
  const { 
    selector = 'body', 
    waitTime = 2000,
    timeout = 30000 
  } = options;
  
  console.log(`Starting to scrape: ${url}`);
  const browser = await puppeteer.launch({
    headless: 'new',  // Use new headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a user agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to the page and wait for content
    await page.goto(url, { waitUntil: 'networkidle2', timeout });
    
    // Wait for the specific selector that indicates content has loaded
    await page.waitForSelector(selector, { timeout });
    
    // Optional delay to ensure all dynamic content is loaded
    if (waitTime > 0) {
      await page.waitForTimeout(waitTime);
    }
    
    // Get the final HTML content
    const content = await page.content();
    
    await browser.close();
    return content;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

/**
 * Extract standings data from HTML
 * @param {string} html - HTML content
 * @param {object} selectors - CSS selectors for extracting data
 * @returns {Array} - Standings data
 */
function extractStandings(html, selectors = {}) {
  const $ = cheerio.load(html);
  const standings = [];
  
  // Default selectors
  const {
    tableSelector = 'table.standings',
    rowSelector = 'tr:not(.header-row)',
    teamNameSelector = 'td.team-name',
    positionSelector = 'td.position',
    playedSelector = 'td.played',
    winsSelector = 'td.wins',
    drawsSelector = 'td.draws',
    lossesSelector = 'td.losses',
    goalsForSelector = 'td.goals-for',
    goalsAgainstSelector = 'td.goals-against',
    pointsSelector = 'td.points'
  } = selectors;
  
  $(tableSelector).find(rowSelector).each((index, element) => {
    const team = {
      position: $(element).find(positionSelector).text().trim(),
      name: $(element).find(teamNameSelector).text().trim(),
      played: parseInt($(element).find(playedSelector).text().trim(), 10) || 0,
      wins: parseInt($(element).find(winsSelector).text().trim(), 10) || 0,
      draws: parseInt($(element).find(drawsSelector).text().trim(), 10) || 0,
      losses: parseInt($(element).find(lossesSelector).text().trim(), 10) || 0,
      goalsFor: parseInt($(element).find(goalsForSelector).text().trim(), 10) || 0,
      goalsAgainst: parseInt($(element).find(goalsAgainstSelector).text().trim(), 10) || 0,
      points: parseInt($(element).find(pointsSelector).text().trim(), 10) || 0,
    };
    
    // Calculate goal difference
    team.goalDifference = team.goalsFor - team.goalsAgainst;
    
    standings.push(team);
  });
  
  return standings;
}

/**
 * Extract fixtures data from HTML
 * @param {string} html - HTML content
 * @param {object} selectors - CSS selectors for extracting data
 * @returns {Array} - Fixtures data
 */
function extractFixtures(html, selectors = {}) {
  const $ = cheerio.load(html);
  const fixtures = [];
  
  // Default selectors
  const {
    fixtureSelector = '.fixture-item',
    dateSelector = '.fixture-date',
    timeSelector = '.fixture-time',
    homeTeamSelector = '.home-team',
    awayTeamSelector = '.away-team',
    venueSelector = '.venue',
    competitionSelector = '.competition',
    scoreSelector = '.score'
  } = selectors;
  
  $(fixtureSelector).each((index, element) => {
    const fixture = {
      date: $(element).find(dateSelector).text().trim(),
      time: $(element).find(timeSelector).text().trim(),
      homeTeam: $(element).find(homeTeamSelector).text().trim(),
      awayTeam: $(element).find(awayTeamSelector).text().trim(),
      venue: $(element).find(venueSelector).text().trim(),
      competition: $(element).find(competitionSelector).text().trim(),
      score: $(element).find(scoreSelector).text().trim()
    };
    
    // Parse the date if possible
    try {
      fixture.timestamp = new Date(`${fixture.date} ${fixture.time}`).getTime();
    } catch (e) {
      fixture.timestamp = null;
    }
    
    // Determine if the fixture is upcoming, live, or completed
    const now = Date.now();
    if (fixture.timestamp) {
      if (fixture.timestamp > now) {
        fixture.status = 'upcoming';
      } else {
        // Simple heuristic: if the score has numbers, it's completed
        const scorePattern = /\d+.*\d+/;
        if (scorePattern.test(fixture.score)) {
          fixture.status = 'completed';
        } else {
          fixture.status = 'live';
        }
      }
    } else {
      fixture.status = 'unknown';
    }
    
    fixtures.push(fixture);
  });
  
  return fixtures;
}

/**
 * Extract team stats data from HTML
 * @param {string} html - HTML content
 * @param {object} selectors - CSS selectors for extracting data
 * @returns {object} - Team stats data
 */
function extractTeamStats(html, selectors = {}) {
  const $ = cheerio.load(html);
  
  // Default selectors
  const {
    teamNameSelector = '.team-name',
    teamLogoSelector = '.team-logo img',
    statBlockSelector = '.team-stats .stat-block',
    statLabelSelector = '.stat-label',
    statValueSelector = '.stat-value'
  } = selectors;
  
  const teamName = $(teamNameSelector).text().trim();
  const teamLogo = $(teamLogoSelector).attr('src') || '';
  
  // Extract all available stats
  const stats = {};
  
  $(statBlockSelector).each((index, element) => {
    const label = $(element).find(statLabelSelector).text().trim().toLowerCase().replace(/\s+/g, '_');
    const value = $(element).find(statValueSelector).text().trim();
    
    // Try to convert numeric values to numbers
    const numericValue = parseFloat(value);
    stats[label] = isNaN(numericValue) ? value : numericValue;
  });
  
  // Extract key statistics if available
  const topScorers = extractPlayerStats($, '.top-scorers', selectors.playerSelector);
  const topAssists = extractPlayerStats($, '.top-assists', selectors.playerSelector);
  
  return {
    teamName,
    teamLogo,
    stats,
    topScorers: topScorers || [],
    topAssists: topAssists || []
  };
}

/**
 * Helper function to extract player statistics
 * @param {object} $ - Cheerio instance
 * @param {string} sectionSelector - CSS selector for the section
 * @param {string} playerSelector - CSS selector for player items
 * @returns {Array} - Player stats array
 */
function extractPlayerStats($, sectionSelector, playerSelector = '.player-item') {
  const players = [];
  
  $(`${sectionSelector} ${playerSelector}`).each((index, element) => {
    const player = {
      name: $(element).find('.player-name').text().trim(),
      number: $(element).find('.player-number').text().trim(),
      position: $(element).find('.player-position').text().trim(),
      value: $(element).find('.player-value').text().trim()
    };
    
    players.push(player);
  });
  
  return players;
}

module.exports = {
  scrapeDynamicContent,
  extractStandings,
  extractFixtures,
  extractTeamStats
};