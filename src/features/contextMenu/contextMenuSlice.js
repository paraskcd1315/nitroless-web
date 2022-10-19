import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emote: {
        name: "",
        type: ""
    },
    repo: {
        url: "",
        icon: "",
        name: ""
    }
}

const contextMenuSlice = createSlice({
    name: 'emotes',
    initialState,
    reducers: {
        selectedEmote: (state, action) => {
            const { name, type } = action.payload;

            state.emote.name = name;
            state.emote.type = type;
        },
        selectedRepoContext: (state, action) => {
            const { url, icon, name } = action.payload;

            state.repo.url = url;
            state.repo.icon = icon;
            state.repo.name = name
        }
    }
});

export const { selectedEmote, selectedRepoContext } = contextMenuSlice.actions;

export default contextMenuSlice.reducer