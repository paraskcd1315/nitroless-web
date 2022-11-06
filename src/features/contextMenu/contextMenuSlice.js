import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    emote: {
        name: "",
        type: ""
    },
    repo: {
        url: "",
        icon: "",
        name: ""
    },
    favouriteEmote: {
        url: "",
        path: "",
        emoteName: "",
        emoteType: ""
    }
}

const contextMenuSlice = createSlice({
    name: 'emotes',
    initialState,
    reducers: {
        selectedEmote: (state, action) => {
            const { active, name, type } = action.payload;

            state.active = active
            state.emote.name = name;
            state.emote.type = type;
        },
        selectedRepoContext: (state, action) => {
            const { active, url, icon, name } = action.payload;

            state.active = active
            state.repo.url = url;
            state.repo.icon = icon;
            state.repo.name = name
        },
        selectedFavouriteEmote: (state, action) => {
            const { active, url, name, type, path } = action.payload;

            state.active = active
            state.favouriteEmote.url = url;
            state.favouriteEmote.path = path;
            state.favouriteEmote.emoteName = name;
            state.favouriteEmote.emoteType = type;
        }
    }
});

export const { selectedEmote, selectedRepoContext, selectedFavouriteEmote } = contextMenuSlice.actions;

export default contextMenuSlice.reducer