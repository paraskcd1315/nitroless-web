import { configureStore } from '@reduxjs/toolkit';
import reposReducer from '../features/repos/reposSlice';
import emotesReducer from '../features/emotes/emotesSlice';
import contextMenuReducer from '../features/contextMenu/contextMenuSlice';

export const store = configureStore({
  reducer: {
    repos: reposReducer,
    emotes: emotesReducer,
    contextMenu: contextMenuReducer
  },
});
