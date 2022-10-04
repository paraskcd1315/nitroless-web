import { configureStore } from '@reduxjs/toolkit';
import reposReducer from '../features/repos/reposSlice';
import emotesReducer from '../features/emotes/emotesSlice';

export const store = configureStore({
  reducer: {
    repos: reposReducer,
    emotes: emotesReducer
  },
});
