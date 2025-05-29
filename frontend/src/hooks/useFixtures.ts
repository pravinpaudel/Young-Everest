import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { fetchFixtures, setFilter } from '../store/slices/fixturesSlice';
import type { SeasonStats } from '../store/slices/fixturesSlice';

interface UseFixturesOptions {
  url?: string;
  filter?: string;
  cacheTimeInMinutes?: number;
  autoFetch?: boolean;
}

interface UseFixturesReturn {
  fixtures: any[];
  filteredFixtures: any[];
  seasonStats: SeasonStats;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  setFilterValue: (filter: string) => void;
}

/**
 * Custom hook for managing fixtures data with Redux
 * Provides an easy interface for components to access and manage fixtures
 */
export const useFixtures = ({
  url = "https://www.peisoccer.com/division/1387/31540/games",
  filter = "all",
  cacheTimeInMinutes = 60,
  autoFetch = true
}: UseFixturesOptions = {}): UseFixturesReturn => {
  const dispatch = useAppDispatch();
  const { 
    fixtures, 
    filteredFixtures, 
    seasonStats, 
    isLoading, 
    error 
  } = useAppSelector((state) => state.fixtures);

  const refetch = () => {
    dispatch(fetchFixtures({ url, cacheTimeInMinutes, filter }));
  };

  const setFilterValue = (newFilter: string) => {
    dispatch(setFilter(newFilter));
  };

  useEffect(() => {
    if (autoFetch) {
      refetch();
    }
  }, [url, cacheTimeInMinutes, filter, autoFetch]);

  useEffect(() => {
    // Update filter when prop changes
    setFilterValue(filter);
  }, [filter]);

  return {
    fixtures,
    filteredFixtures,
    seasonStats,
    isLoading,
    error,
    refetch,
    setFilterValue
  };
};
