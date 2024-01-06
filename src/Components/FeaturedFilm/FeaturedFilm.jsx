import React from 'react';
import { Link } from 'react-router-dom';

function FeaturedFilm({ movie }) {
  return (
    <div>
      <Link
        className={`flex flex-col ${'w-full h-[400px] mb-8 relative  link'}`}
        to={`/movie/${movie?.id}`}
      >
        <div
          className={`h-full w-full imgTarggeting ${'relative'}`}
        >
          <img
            className={`rounded ${'w-full h-full'}`}
            alt={movie?.title}
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` : 'https://www.fillmurray.com/200/300'
            }
          />
          <div
            className={`${'absolute inset-0 bg-black opacity-50'}`}
          />
        </div>
        <div
          className={`${'absolute bottom-10 text-white left-4 w-1/2'}`}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          <div
            className={`${' text-2xl font-semibold'}`}
            key={movie?.id}
          >
            {movie?.title }
          </div>
          <div>{movie?.overview}</div>
        </div>
      </Link>
    </div>
  );
}

export default FeaturedFilm;
