import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../services/TMDB';
import StarRating from '../StartRating/StarRating';
import Loader from '../Loader/Loader';

function MovieProfileList({ id }) {
  const { data: movie, isFetching, isError } = useGetMovieByIdQuery(id);
  if (isFetching) {
    return <Loader />;
  }
  if (isError) {
    return <div>Something went wrong ...</div>;
  }
  return (
    <div className="flex gap-4 items-center flex-wrap justify-center px-4 py-4">
      <Link
        className={`flex flex-col ${'w-[200px] '}`}
        key={id}
        to={`/movie/${movie?.id}`}
      >
        <div className="h-full w-full imgTarggeting ">
          <img
            className={`rounded ${'w-[200px]'}`}
            alt={movie?.title}
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                : 'https://www.fillmurray.com/200/300'
            }
          />
        </div>
        <div>
          {/* eslint-disable-next-line no-nested-ternary */}
          <div key={movie?.id}>{(movie?.title.length > 20 ? `${movie?.title.substring(0, 20)}...` : movie?.title)}</div>
          {/* <div>{ movie.vote_average / 2}</div> */}
          <StarRating rating={movie?.vote_average} />
        </div>
      </Link>
    </div>
  );
}

export default MovieProfileList;
