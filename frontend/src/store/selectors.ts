import type { RootState } from '../store';

// Selectors for fixtures
export const selectFixtures = (state: RootState) => state.fixtures.fixtures;
export const selectFilteredFixtures = (state: RootState) => state.fixtures.filteredFixtures;
export const selectSeasonStats = (state: RootState) => state.fixtures.seasonStats;
export const selectFixturesLoading = (state: RootState) => state.fixtures.isLoading;
export const selectFixturesError = (state: RootState) => state.fixtures.error;

// Helper selector to get fixtures by status
export const selectFixturesByStatus = (status: string) => (state: RootState) =>
  state.fixtures.fixtures.filter(fixture => fixture.status === status);

// Helper selector to get upcoming fixtures
export const selectUpcomingFixtures = (state: RootState) =>
  state.fixtures.fixtures.filter(fixture => fixture.status === 'upcoming');

// Helper selector to get limited upcoming fixtures for homepage
export const selectUpcomingFixturesLimited = (limit: number = 3) => (state: RootState) =>
  state.fixtures.fixtures
    .filter(fixture => fixture.status === 'upcoming')
    .slice(0, limit);

// Helper selector to get completed fixtures
export const selectCompletedFixtures = (state: RootState) =>
  state.fixtures.fixtures.filter(fixture => fixture.status === 'completed');

// Selector to check if fixtures data is fresh (within cache time)
export const selectIsFixturesDataFresh = (cacheTimeMinutes: number = 30) => (state: RootState) => {
  if (!state.fixtures.lastFetch) return false;
  const now = new Date().getTime();
  return (now - state.fixtures.lastFetch) < (cacheTimeMinutes * 60 * 1000);
};

// Selector to get fixtures cache info
export const selectFixturesCacheInfo = (state: RootState) => ({
  lastFetch: state.fixtures.lastFetch,
  cacheKey: state.fixtures.cacheKey,
  hasData: state.fixtures.fixtures.length > 0
});
