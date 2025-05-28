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

// Helper selector to get completed fixtures
export const selectCompletedFixtures = (state: RootState) =>
  state.fixtures.fixtures.filter(fixture => fixture.status === 'completed');
