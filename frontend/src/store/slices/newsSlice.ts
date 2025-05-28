import { createSlice } from '@reduxjs/toolkit';

interface NewsState {
    news: any[];
    isLoading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    news: [],
    isLoading: false,
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        // Add news-related reducers here later
    },
});

export default newsSlice.reducer;