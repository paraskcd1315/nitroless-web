import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: '',
    urlData: {},
    favourites: []
}

const emotesSlice = createSlice({
    name: 'emotes',
    initialState,
    reducers: {
        selectedRepo: (state, action) => {
            const { url, urlData, favourites } = action.payload;

            state.url = url;
            state.urlData = urlData;
            state.favourites = favourites && favourites.length > 0 ? favourites : []
        },
        updateFavourites: (state, action) => {
            state.favourites.push(action.payload); 
        }
    }
});

export const { selectedRepo, updateFavourites } = emotesSlice.actions;

export default emotesSlice.reducer