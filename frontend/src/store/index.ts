import { configureStore } from '@reduxjs/toolkit';
import fixturesReducer from './slices/fixturesSlice';
import newsReducer from './slices/newsSlice';
import playersReducer from './slices/playersSlice';

export const store = configureStore({
  reducer: {
    fixtures: fixturesReducer,
    news: newsReducer,
    players: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;