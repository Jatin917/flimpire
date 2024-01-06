import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import MovieSlice from '../features/MovieSlice';

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    movieList: MovieSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
