import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
