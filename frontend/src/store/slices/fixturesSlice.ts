import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import footballService from '../../utils/footballService';
import type { Fixture } from '../../utils/footballService';

export type SeasonStats = {
    matchesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    cleanSheets: number;
    goalScored: number;
};

interface FixturesState {
    fixtures: Fixture[];
    filteredFixtures: Fixture[];
    seasonStats: SeasonStats;
    isLoading: boolean;
    error: string | null;
    lastFetch: number | null;
    cacheKey: string | null;
}

interface FetchFixturesParams {
    url: string;
    cacheTimeInMinutes: number;
    filter: string;
}

const initialState: FixturesState = {
    fixtures: [],
    filteredFixtures: [],
    seasonStats: {
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        cleanSheets: 0,
        goalScored: 0,
    },
    isLoading: false,
    error: null,
    lastFetch: null,
    cacheKey: null,
};

// Helper function to calculate season stats
const calculateSeasonStats = (fixtures: Fixture[]): SeasonStats => {
    let matchesPlayed = 0;
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let cleanSheets = 0;
    let goalScored = 0;

    fixtures.forEach(fixture => {
        if (fixture.status === 'completed') {
            matchesPlayed++;

            // Check if Young Everest is home or away
            const isHome = fixture.homeTeam.includes('Young Everest');
            const isAway = fixture.awayTeam.includes('Young Everest');

            // Convert scores to numbers to ensure proper addition
            const homeScoreNum = fixture.homeScore !== undefined && fixture.homeScore !== null ?
                parseInt(fixture.homeScore.toString(), 10) : 0;
            const awayScoreNum = fixture.awayScore !== undefined && fixture.awayScore !== null ?
                parseInt(fixture.awayScore.toString(), 10) : 0;

            if (isHome) {
                if (homeScoreNum > awayScoreNum) wins++;
                else if (homeScoreNum === awayScoreNum) draws++;
                else losses++;

                if (awayScoreNum === 0) cleanSheets++;
                goalScored += homeScoreNum;
            } else if (isAway) {
                if (awayScoreNum > homeScoreNum) wins++;
                else if (homeScoreNum === awayScoreNum) draws++;
                else losses++;

                if (homeScoreNum === 0) cleanSheets++;
                goalScored += awayScoreNum;
            }
        }
    });

    return {
        matchesPlayed,
        wins,
        losses,
        draws,
        cleanSheets,
        goalScored
    };
};

// Helper function to filter and sort fixtures
const filterFixtures = (fixtures: Fixture[], filter: string): Fixture[] => {
    let filtered = fixtures;
    
    if (filter === "upcoming") {
        filtered = fixtures.filter(fixture => fixture.status === "upcoming");
    } else if (filter === "past") {
        filtered = fixtures.filter(fixture => fixture.status === "completed");
    }

    if (filter === "all" || filter === "past") {
        filtered.sort((a, b) => {
            const dateA = new Date(a.timestamp || 0);
            const dateB = new Date(b.timestamp || 0);
            return dateB.getTime() - dateA.getTime(); // Sort by most recent first
        });
    }
    
    return filtered;
};

// Async thunk for fetching fixtures
export const fetchFixtures = createAsyncThunk(
    'fixtures/fetchFixtures',
    async ({ url, cacheTimeInMinutes, filter }: FetchFixturesParams, { rejectWithValue }) => {
        try {
            const cacheKey = `fixtures_${url}`;
            const cachedData = localStorage.getItem(cacheKey);

            // Check cache first
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                const now = new Date().getTime();

                // Check if cache is still valid
                if (now - timestamp < cacheTimeInMinutes * 60 * 1000) {
                    return {
                        fixtures: data,
                        fromCache: true,
                        filter,
                        cacheKey
                    };
                }
            }

            // Fetch fresh data
            const response = await footballService.getFixtures(url, {
                fixtureSelector: '#tblSchedule',
                dateSelector: 'td[data-title="Date"]',
                venueSelector: 'td[data-title="Location"] a',
                homeTeamSelector: 'td[data-title="Home"] a',
                awayTeamSelector: 'td[data-title="Visitor"] a',
            });

            // Cache the fresh data
            localStorage.setItem(cacheKey, JSON.stringify({
                data: response,
                timestamp: new Date().getTime(),
            }));

            return {
                fixtures: response,
                fromCache: false,
                filter,
                cacheKey
            };

        } catch (error) {
            // Try fallback to cache if available
            const cacheKey = `fixtures_${url}`;
            const cachedData = localStorage.getItem(cacheKey);
            
            if (cachedData) {
                try {
                    const { data } = JSON.parse(cachedData);
                    return {
                        fixtures: data,
                        fromCache: true,
                        filter,
                        cacheKey,
                        error: 'Using cached data due to fetch error'
                    };
                } catch (e) {
                    return rejectWithValue('Failed to load fixtures and cache is invalid');
                }
            }
            
            return rejectWithValue('Failed to load fixtures');
        }
    }
);

const fixturesSlice = createSlice({
    name: 'fixtures',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filteredFixtures = filterFixtures(state.fixtures, action.payload);
        },
        clearError: (state) => {
            state.error = null;
        },
        clearFixtures: (state) => {
            state.fixtures = [];
            state.filteredFixtures = [];
            state.seasonStats = initialState.seasonStats;
            state.lastFetch = null;
            state.cacheKey = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFixtures.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFixtures.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fixtures = action.payload.fixtures;
                state.filteredFixtures = filterFixtures(action.payload.fixtures, action.payload.filter);
                state.seasonStats = calculateSeasonStats(action.payload.fixtures);
                state.lastFetch = new Date().getTime();
                state.cacheKey = action.payload.cacheKey;
                
                if (action.payload.error) {
                    state.error = action.payload.error;
                }
            })
            .addCase(fetchFixtures.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setFilter, clearError, clearFixtures } = fixturesSlice.actions;
export default fixturesSlice.reducer;