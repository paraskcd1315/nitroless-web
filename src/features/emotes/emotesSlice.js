import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: '',
    urlData: {}
}

const emotesSlice = createSlice({
    name: 'emotes',
    initialState,
    reducers: {
        selectedRepo: (state, action) => {
            const { url, urlData } = action.payload;

            state.url = url;
            state.urlData = urlData;
        }
    }
});

export const { selectedRepo } = emotesSlice.actions;

export default emotesSlice.reducer