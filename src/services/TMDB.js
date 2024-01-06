import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbkey = process.env.REACT_APP_TMDB_KEY;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ category, page, searchQuery }) => {
        if (searchQuery && typeof searchQuery === 'string') {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbkey}`;
        }
        if (category && typeof category === 'string') {
          return `/movie/${category}?page=${page}&api_key=${tmdbkey}`;
        }
        if (category && typeof category === 'number') {
          return `discover/movie?with_genres=${category}&page=${page}&api_key=${tmdbkey}`;
        }
        return `/movie/popular?page=${page}&api_key=${tmdbkey}`;
      },
    }),
    // https://api.themoviedb.org/3/genre/movie/list?language=en
    searchMovieGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbkey}`,
    }),

    // Get Movie
    getMovieById: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbkey}`,
    }),
    // Get Recommendations
    getRecommendations: builder.query({
      query: ({ id, list, page }) => `/movie/${id}/${list}?page=${page}&api_key=${tmdbkey}`,
    }),
    // Get Profile
    // https://api.themoviedb.org/3/person/person_id?
    getProfile: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbkey}`,
    }),

    // Get Movies by Actor
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbkey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useSearchMovieGenresQuery,
  useGetMovieByIdQuery,
  useGetRecommendationsQuery,
  useGetProfileQuery,
  useGetMoviesByActorIdQuery,
} = tmdbApi;
