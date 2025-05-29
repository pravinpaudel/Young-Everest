import { createSlice } from '@reduxjs/toolkit';

interface PlayersState {
    players: any[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PlayersState = {
    players: [],
    isLoading: false,
    error: null,
};

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        // Add players-related reducers here later
    },
});

export default playersSlice.reducer;