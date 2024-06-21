/* eslint-disable react/button-has-type */
// import React, from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useGetMoviesQuery } from '../../services/TMDB';
// eslint-disable-next-line import/no-cycle
import MovieList from '../MovieList/MovieList';
import FeaturedFilm from '../FeaturedFilm/FeaturedFilm';
// import { MovieList } from '../index.js';

function Movies() {
  const [page, setPage] = useState(1);
  const { category, searchQuery, movieId } = useSelector(
    (store) => store.movieList,
  );
  const { data, isFetching, isError } = useGetMoviesQuery({
    category,
    page,
    searchQuery,
    movieId,
  });

  if (isFetching) {
    return <div className="h-[calc(100vh-100px)]">Loading...</div>;
  }
  if (data && !data.results.length) {
    return (
      <div>
        <h4>
          no movies that match this name <br /> please search for something else
        </h4>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-[calc(100vh-100px)]">
        <div
          className="bg-red-100 border border-red-400 w-[400px] left-[30%] top-[30%] text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">Due to the TMDB API ban in India, you may experience issues with the movie search functionality when using a router network. As a workaround, please try using a mobile network or a VPN.</span>
          <span className="block sm:inline mt-2">
            Thank you for your understanding.
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      {data ? (
        <>
          <FeaturedFilm movie={data.results?.slice(0, 1)[0]} />
          <MovieList Movies={data.results?.slice(1, data.length)} />
          <div className="flex items-center justify-evenly w-[50vh] py-4">
            {/* eslint-disable-next-line react/button-has-type */}
            {page > 1 && (
              <button
                className="bg-blue-800 px-2 py-1 rounded"
                onClick={() => setPage((prevPage) => prevPage - 1)}
              >
                Prev
              </button>
            )}
            <p>Current Page: {data?.page}</p>
            {/* eslint-disable-next-line react/button-has-type */}
            {page < data?.total_pages && (
              <button
                className="bg-blue-800 px-2 py-1 rounded"
                onClick={() => setPage((prevPage) => prevPage + 1)}
              >
                next
              </button>
            )}
          </div>
        </>
      ) : (
        // eslint-disable-next-line operator-linebreak
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Notice:</strong>
          <span className="block sm:inline">Due to the TMDB API ban in India, you may experience issues with the movie search functionality when using a router network. As a workaround, please try using a mobile network or a VPN.</span>
          <span className="block sm:inline mt-2">
            Thank you for your understanding.
          </span>
        </div>
      )}
    </div>
  );
}

export default Movies;
