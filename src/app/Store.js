import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import MovieSlice from '../features/MovieSlice';
import userSlice from '../features/AuthSlice';

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    movieList: MovieSlice,
    userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
