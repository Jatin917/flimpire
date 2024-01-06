import { createSlice } from '@reduxjs/toolkit';

const MovieSlice = createSlice({
  name: 'movie',
  initialState: {
    category: 'popular',
    searchQuery: '',
    movieId: null,
    featured: true,
  },
  reducers: {
    setType(state, action) {
      state.category = action.payload;
      state.searchQuery = '';
    },
    setSearchParameter(state, action) {
      state.searchQuery = action.payload;
    },
    setMovieId(state, action) {
      state.movieId = action.payload;
    },
    setFeatured(state, action) {
      state.featured = action.payload;
    },
  },
});

export const { setType, setSearchParameter, setMovieId, setFeatured } = MovieSlice.actions;
export default MovieSlice.reducer;
