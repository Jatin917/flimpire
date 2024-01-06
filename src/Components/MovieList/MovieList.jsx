/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './MovieList.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFeatured } from '../../features/MovieSlice';
import StarRating from '../StartRating/StarRating';
// eslint-disable-next-line import/no-cycle
// import { useDispatch } from 'react-redux';
// import { setMovieId } from '../../features/MovieSlice';
function MovieList({ Movies }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 items-center flex-wrap justify-center px-4 py-4">
      {Movies?.map((movie, i) => (
        <Link
          className={`flex flex-col ${'w-[200px] '}`}
          key={i}
          to={`/movie/${movie.id}`}
        >
          <div className="h-full w-full imgTarggeting ">
            <img
              className={`rounded ${'w-[200px]'}`}
              alt={movie.title}
              src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://www.fillmurray.com/200/300'
            }
            />
          </div>
          <div>
            {/* eslint-disable-next-line no-nested-ternary */}
            <div key={movie.id}>{(movie.title.length > 20 ? `${movie.title.substring(0, 20)}...` : movie.title)}</div>
            {/* <div>{ movie.vote_average / 2}</div> */}
            <StarRating rating={movie.vote_average} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
