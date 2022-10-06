import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emote: {
        name: "",
        type: ""
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
        }
    }
});

export const { selectedEmote } = contextMenuSlice.actions;

export default contextMenuSlice.reducer