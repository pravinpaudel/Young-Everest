/**
 * Service for interacting with the football data API
 */
import axios from "axios";

// Base URL for the API
const API_BASE_URL = import.meta.env.BASE_URL || "/api";

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interface definitions for football data
 */

export interface TeamStanding {
  position?: string;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Fixture {
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  competition: "League" | "Cup" | "Friendly";
  timestamp: number | null;
  status: "upcoming" | "completed" | "unknown" | "live";
}

export interface PlayerStat {
  name: string;
  number: string;
  position: string;
  value: string;
}

export interface TeamStats {
  teamName: string;
  teamLogo: string;
  stats: Record<string, number | string>;
  topScorers: PlayerStat[];
  topAssists: PlayerStat[];
}

export interface FootballData {
  standings: TeamStanding[];
  fixtures: Fixture[];
  stats: TeamStats;
  fromCache?: boolean;
}

// Selectors configuration for targeted scraping
export interface ScraperSelectors {
  standings?: {
    tableSelector?: string;
    rowSelector?: string;
    teamNameSelector?: string;
    positionSelector?: string;
    playedSelector?: string;
    winsSelector?: string;
    drawsSelector?: string;
    lossesSelector?: string;
    goalsForSelector?: string;
    goalsAgainstSelector?: string;
    pointsSelector?: string;
  };
  fixtures?: {
    fixtureSelector?: string;
    dateSelector?: string;
    timeSelector?: string;
    homeTeamSelector?: string;
    awayTeamSelector?: string;
    venueSelector?: string;
    competitionSelector?: string;
    scoreSelector?: string;
  };
  stats?: {
    teamNameSelector?: string;
    teamLogoSelector?: string;
    statBlockSelector?: string;
    statLabelSelector?: string;
    statValueSelector?: string;
    playerSelector?: string;
  };
}

/**
 * Get league standings
 * @param url - URL to scrape for standings data
 * @param selectors - Optional selectors configuration
 */
export const getStandings = async (
  url: string,
  selectors?: ScraperSelectors["standings"]
): Promise<TeamStanding[]> => {
  try {
    // This is a URL for scraping
    const response = await apiClient.post("/football/standings", {
      url,
      selectors,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error;
  }
};

/**
 * Get fixtures/matches
 * @param url - URL to scrape for fixtures data
 * @param selectors - Optional selectors configuration
 */
export const getFixtures = async (
  url: string,
  selectors?: ScraperSelectors["fixtures"]
): Promise<Fixture[]> => {
  try {
    const response = await apiClient.post("/football/fixtures", {
      url,
      selectors,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    throw error;
  }
};

/**
 * Get team statistics
 * @param url - URL to scrape for team stats data
 * @param selectors - Optional selectors configuration
 */
export const getTeamStats = async (
  url: string,
  selectors?: ScraperSelectors["stats"]
): Promise<TeamStats> => {
  try {
    const response = await apiClient.post("/football/stats", {
      url,
      selectors,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching team stats:", error);
    throw error;
  }
};

/**
 * Get all football data in a single request
 * @param urls - URLs for each type of data
 * @param selectors - Optional selectors configuration
 */
export const getAllFootballData = async (
  urls: {
    standingsUrl: string;
    fixturesUrl: string;
    statsUrl: string;
  },
  selectors?: ScraperSelectors
): Promise<FootballData> => {
  try {
    const response = await apiClient.post("/football/all", {
      ...urls,
      selectors,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all football data:", error);
    throw error;
  }
};

/**
 * Clear the backend cache to force fresh data fetch
 * @param dataType - Type of data to clear from cache ('standings', 'fixtures', 'stats', or 'all')
 */
export const clearCache = async (
  dataType: "standings" | "fixtures" | "stats" | "all"
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.get(`/football/clear-cache/${dataType}`);
    return response.data;
  } catch (error) {
    console.error("Error clearing cache:", error);
    throw error;
  }
};

/**
 * Test scraping with specific URL and selectors
 * Useful for debugging and setup
 */
export const testScraping = async (
  url: string,
  options: {
    selector?: string;
    waitTime?: number;
    type?: "standings" | "fixtures" | "stats";
    selectors?: ScraperSelectors;
  }
): Promise<any> => {
  try {
    const response = await apiClient.post("/football/test", {
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error("Error in test scraping:", error);
    throw error;
  }
};

// Export the football data service
const footballService = {
  getStandings,
  getFixtures,
  getTeamStats,
  getAllFootballData,
  clearCache,
  testScraping,
};

export default footballService;
