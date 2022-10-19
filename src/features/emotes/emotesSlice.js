import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    url: '',
    urlData: {},
    favourites: []
}

const emotesSlice = createSlice({
    name: 'emotes',
    initialState,
    reducers: {
        selectedRepo: (state, action) => {
            const { url, urlData, favourites, active } = action.payload;

            state.active = active;
            state.url = url;
            state.urlData = urlData;
            state.favourites = favourites && favourites.length > 0 ? favourites : []
        },
        updateFavourites: (state, action) => {
            state.favourites = action.payload;
        }
    }
});

export const { selectedRepo, updateFavourites } = emotesSlice.actions;

export default emotesSlice.reducer