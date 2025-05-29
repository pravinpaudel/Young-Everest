# Redux Store Documentation

## Overview
This Redux store manages the application state for the Young Everest FC website, including fixtures, news, and players data.

## Store Structure

### Fixtures Slice (`fixturesSlice.ts`)
Manages football fixtures data with the following features:

#### State
- `fixtures`: Array of all fixtures
- `filteredFixtures`: Filtered fixtures based on current filter
- `seasonStats`: Calculated season statistics
- `isLoading`: Loading state
- `error`: Error message if any
- `lastFetch`: Timestamp of last successful fetch
- `cacheKey`: Cache key for localStorage

#### Actions
- `fetchFixtures`: Async thunk to fetch fixtures from backend
- `setFilter`: Update the filter for fixtures
- `clearError`: Clear any error state
- `clearFixtures`: Reset all fixtures data

#### Usage Example
```typescript
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchFixtures, setFilter } from '../store/slices/fixturesSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { filteredFixtures, isLoading, error } = useAppSelector(state => state.fixtures);
  
  useEffect(() => {
    dispatch(fetchFixtures({
      url: 'https://example.com/fixtures',
      cacheTimeInMinutes: 60,
      filter: 'all'
    }));
  }, [dispatch]);
  
  // Change filter
  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
  };
};
```

#### Caching
- Fixtures are cached in localStorage with a configurable cache time
- Cache key format: `fixtures_${url}`
- Fallback to cache if network request fails

#### Season Stats Calculation
Automatically calculates:
- Matches played
- Wins, losses, draws
- Clean sheets
- Goals scored

### Selectors (`selectors.ts`)
Pre-built selectors for common data access patterns:
- `selectFixtures`: All fixtures
- `selectFilteredFixtures`: Currently filtered fixtures
- `selectSeasonStats`: Season statistics
- `selectUpcomingFixtures`: Only upcoming fixtures
- `selectCompletedFixtures`: Only completed fixtures

### Typed Hooks (`../hooks/reduxHooks.ts`)
Type-safe hooks for Redux:
- `useAppDispatch`: Typed dispatch hook
- `useAppSelector`: Typed selector hook

## Setup
The store is configured in `index.ts` and connected to the app via React Redux Provider in `main.tsx`.

## Future Enhancements
- Add news slice for managing news articles
- Add players slice for managing player data
- Implement real-time updates for live fixtures
- Add more sophisticated caching strategies