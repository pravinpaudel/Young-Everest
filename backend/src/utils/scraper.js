const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');

/**
 * Custom error class for scraper errors
 */
class ScraperError extends Error {
  constructor(message, url, originalError, operationId) {
    super(message);
    this.name = 'ScraperError';
    this.url = url;
    this.originalError = originalError;
    this.operationId = operationId;
    this.timestamp = new Date().toISOString();
  }
  
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      operationId: this.operationId,
      timestamp: this.timestamp,
      originalError: this.originalError ? this.originalError.message : null
    };
  }
}

/**
 * Scrape dynamic content using Puppeteer (headless browser)
 * @param {string} url - URL to scrape
 * @param {object} options - Scraping options
 * @returns {Promise<string>} - HTML content
 */
async function scrapeDynamicContent(url, options = {}) {
  const {
    selector = 'body', // Default selector to wait for
    timeout = 30000,
    interactions = [], // Array of interactions to perform after loading the page
    //captureScreenshot = false, // Whether to capture screenshot on error for debugging
  } = options;

  console.log(`Starting to scrape: ${url}`);
  let browser = null;

    try {
      browser = await puppeteer.launch({
        headless: 'new',  // Use new headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        timeout: timeout
      });

      const page = await browser.newPage();

      // Set a user agent to avoid being blocked
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      // Set a reasonable viewport size
      await page.setViewport({ width: 1366, height: 768 });

      
      const response = await page.goto(url, { 
        waitUntil: 'networkidle2', 
        timeout: timeout 
      });
      
      // Check if the page loaded successfully
      if (!response.ok() && response.status() !== 304) {  // 304 is Not Modified, which is OK
        throw new Error(`Failed to load page: HTTP status ${response.status()}`);
      }

      // Wait for the body to be available
      console.log(`Waiting for the body to load...`);
      await page.waitForSelector('body', { visible: true, timeout });

      // Wait for the main selector to be available (if different from 'body')
      if (selector !== 'body') {
        console.log(`Waiting for selector: ${selector}`);
        await page.waitForSelector(selector, { timeout: timeout })
          .catch(error => {
            console.warn(`❌ Selector ${selector} not found, continuing anyway: ${error.message}`);
          });
      }

      // Perform interactions specified in options
      if (interactions && interactions.length > 0) {
        console.log(`Starting ${interactions.length} interaction(s)...`);
        
        for (let i = 0; i < interactions.length; i++) {
          const interaction = interactions[i];
          try {
            await processInteraction(page, interaction, timeout);
            console.log(`Processed interaction ${i + 1}/${interactions.length}`);
          } catch (interactionError) {
            console.error(`Error during interaction ${i + 1}/${interactions.length}:`, interactionError);
            console.log(`Continuing despite interaction error`);
          }
        }
      }
      
      // Get the final HTML content
      const content = await page.content();

      console.log(`✅ Successfully scraped content from: ${url}`);

      if (browser) {
        await browser.close();
        browser = null;
      }

      return content;
      
    } catch (error) {
      console.error(`❌ Error during scraping:`, error);
      
      // Capture screenshot for debugging if enabled
      // if (captureScreenshot && browser) {
      //   try {
      //     const pages = await browser.pages();
      //     if (pages.length > 0) {
      //       const screenshotPath = `./${operationId}_error_${retryAttempt}.png`;
      //       await pages[0].screenshot({ path: screenshotPath, fullPage: true });
      //       console.log(`[${operationId}] Error screenshot saved to ${screenshotPath}`);
      //     }
      //   } catch (screenshotError) {
      //     console.error(`[${operationId}] Error capturing screenshot:`, screenshotError);
      //   }
      // }
      
      if (browser) {
        await browser.close();
        browser = null;
      }
    }
  
  
  // If we reach here, all attempts failed
  throw new ScraperError('Scraping attempt failed', url);
}

/**
 * Helper function to process different types of interactions with a web page
 * @param {object} page - Puppeteer page object
 * @param {object} interaction - Interaction configuration
 * @param {number} timeout - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
async function processInteraction(page, interaction, timeout = 30000) {
  const { 
    type, 
    selector, 
    value, 
    waitForSelector, 
    waitForNetwork = True,
    options = {}
  } = interaction;

  console.log(`Processing ${type} interaction on selector: ${selector}`);
  
  let success = false;
  
    try {
      // Wait for selector if provided
      if (selector) {
        console.log(`Waiting for selector: ${selector}`);
        await page.waitForSelector(selector, { 
          visible: true, 
          timeout: timeout 
        });
      }

      // Perform the interaction based on type
      switch (type) {
        case 'click':
          console.log(`Clicking on: ${selector}`);
          await page.click(selector, options);
          break;
          
        case 'select':
          if (value !== undefined) {
            console.log(`Selecting value: ${value} in dropdown: ${selector}`);
            await page.select(selector, value);
          } else {
            throw new Error('Value must be provided for select interaction');
          }
          break;
          
        case 'type':
          if (value !== undefined) {
            console.log(`Typing "${value}" into: ${selector}`);
            // Clear input first if specified in options
            if (options.clearFirst) {
              await page.click(selector, { clickCount: 3 }); // Triple-click to select all text
              await page.keyboard.press('Backspace');
            }
            await page.type(selector, value, { delay: options.typeDelay || 0 });
          } else {
            throw new Error('Value must be provided for type interaction');
          }
          break;
          
        case 'fileUpload':
          if (value) {
            console.log(`Uploading file to: ${selector}`);
            const inputElement = await page.$(selector);
            await inputElement.uploadFile(value);
          } else {
            throw new Error('File path must be provided for fileUpload interaction');
          }
          break;
          
        default:
          throw new Error(`Unknown interaction type: ${type}`);
      }

      // Wait for network to be idle after interaction if specified
      if (waitForNetwork) {
        console.log(`Waiting for network to be idle after interaction...`);
        await page.waitForNetworkIdle({ idleTime: 1000, timeout: 5000 }).catch(e => {
          console.log(`Network didn't reach idle state after interaction, continuing anyway`);
        });
      }

      // Wait for a specific selector to appear after the interaction
      if (waitForSelector) {
        console.log(`Waiting for selector to appear: ${waitForSelector}`);
        await page.waitForSelector(waitForSelector, { timeout }).catch(e => {
          console.log(`Selector ${waitForSelector} didn't appear, continuing anyway`);
        });
      }

      success = true;
      console.log(`Interaction completed successfully`);
      
    } catch (error) {
      console.error(`Error during interaction:`, error.message);
    }
  
  return success;
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
    tableSelector = '#tblStats',
    teamNameSelector = 'td[data-title="Team"] a', // finds a <td> (table cell) with the attribute data-title="GP".
    playedSelector = 'td[data-title="GP"]',
    winsSelector = 'td[data-title="W"]',
    drawsSelector = 'td[data-title="T"]',
    lossesSelector = 'td[data-title="L"]',
    goalsForSelector = 'td[data-title="GF"]',
    goalsAgainstSelector = 'td[data-title="GA"]',
    pointsSelector = 'td[data-title="PTS"]'
  } = selectors;

  // Track the current pool
  let currentPool = '';

  // Find the table rows containing standings data
  $(`${tableSelector} tbody tr`).each((index, element) => {
    // Check if the row has a pool name (e.g., "Pool A")
    // Check if this is a pool header row
    if ($(element).hasClass('avoid-sort')) {
      currentPool = $(element).text().trim();
      return; // Skip this row as it is a header or separator
    }

    // This is a regular team row, so we extract the data
    const team = {
      pool: currentPool, // Assign the current pool to the team
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

    // Get the team's URL for potential future use
    const teamUrl = $(element).find('td[data-title="Team"] a').attr('href');
    if (teamUrl) {
      team.url = teamUrl;
    }

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
    fixtureSelector = '#tblSchedule',
        dateSelector = 'td[data-title="Date"]',
        venueSelector = 'td[data-title="Location"] a',
        homeTeamSelector = 'td[data-title="Home"] a',
        awayTeamSelector = 'td[data-title="Visitor"] a',
  } = selectors;

  $(`${fixtureSelector} tbody tr`).each((index, element) => {
    // Extract fixture details
    const dateAndTime = $(element).find(dateSelector).text().trim();
    const homeTeamRaw = $(element).find(homeTeamSelector).text().trim();
    const awayTeamRaw = $(element).find(awayTeamSelector).text().trim();
    const venue = $(element).find(venueSelector).text().trim();
    
    // Parse scores - extract numbers from parentheses
    const homeScore = homeTeamRaw.match(/\((\d+)\)$/);
    const awayScore = awayTeamRaw.match(/\((\d+)\)$/);

    // Clean team names (remove score in parentheses)
    const homeTeam = homeTeamRaw.replace(/\s*\(\d+\)$/, '').trim();
    const awayTeam = awayTeamRaw.replace(/\s*\(\d+\)$/, '').trim();

    // Skip fixtures not involving "Young Everest"
    if(!(homeTeam.includes("Young Everest") || awayTeam.includes("Young Everest"))) 
      return; 

    const fixture = {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      venue: venue,
      homeScore: homeScore ? parseInt(homeScore[1], 10) : null,
      awayScore: awayScore ? parseInt(awayScore[1], 10) : null,
    }

    // Parse the date if possible
    try {
      fixture.timestamp = new Date(`${dateAndTime}`).getTime();
    } catch (e) {
      fixture.timestamp = null;
    }

    // Determine if the fixture is upcoming, live, or completed
    const now = Date.now();
    if (fixture.timestamp) {
      if (fixture.timestamp > now) {
        fixture.status = 'upcoming';
      } else {
        // // Simple heuristic: if the score has numbers, it's completed
        // const scorePattern = /\d+.*\d+/;
        // if (scorePattern.test(fixture.score)) {
        //   fixture.status = 'completed';
        // } else {
        //   fixture.status = 'live';
        // }
        fixture.status = 'completed'; // Default to completed if no score is available
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
  extractTeamStats,
  processInteraction,
  ScraperError
}; 

async function runTest() {
  try {
    const url = 'https://www.peisoccer.com/division/1387/31540/standings'; // Replace with a real URL
    const options = {
      selector: '#tblStats',
      interactions: [
        {
          type: 'select',
          selector: '#ddlSeason',
          value: '9443',
          waitForNetwork: true
        }
      ]
    };

    const content = await scrapeDynamicContent(url, options);
    console.log('Standings content:', extractStandings(content));

  } catch (error) {
    console.error('Test failed:', error);
  }
} 

//runTest()