/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMovieByIdQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import { setFeatured, setType } from '../../features/MovieSlice';
import MovieList from '../MovieList/MovieList';
import Loader from '../Loader/Loader';
import { Modal } from '..';
import StarRating from '../StartRating/StarRating';
import { addToFvrtList, removeFromFvrtList } from '../../firestore';
// import { setFvrtList } from '../../features/AuthSlice';

function MovieInformation({ isDarkMode }) {
  const { fvrtList } = useSelector((store) => store.userSlice);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const featured = useSelector((store) => store.movieList.featured);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: selectedMovie, isFetching, isError } = useGetMovieByIdQuery(id);
  const { data: recommendations, isFetching: isFetchingRecommendation, isError: isErrorRecommendation } = useGetRecommendationsQuery({ list: 'recommendations', id, page });
  // console.log('checking if movie is present', fvrtList.includes(selectedMovie?.id));
  // for toggling the fvrt button
  const [isFvrt, setFvrt] = useState(fvrtList.includes(selectedMovie?.id));
  if (isFetching) {
    return <Loader />;
  }
  if (isError) {
    return 'Some Error in Loading the data';
  }
  if (isFetchingRecommendation) {
    return <Loader />;
  }
  if (isErrorRecommendation) {
    return 'Some Error in Loading the data';
  }
  console.log('selected movie is ', selectedMovie);
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex h-screen">
        {/* contianer for image of selected image */}
        <div className="flex items-center h-1/2 mt-[120px] justify-center">
          <img className={`w-[60%] ${isDarkMode ? 'shadow-white' : 'shadow-black'}  rounded-md`} src={`https://image.tmdb.org/t/p/original/${selectedMovie?.poster_path}`} />
        </div>
        {/* remaining details of selected image */}
        <div className="flex gap-3 flex-col px-8">
          <h1 className="text-4xl text-center font-semibold">{selectedMovie?.original_title}</h1>
          <h3 className="text-xl text-center">{selectedMovie?.tagline}</h3>
          <div className="flex item-center justify-between">
            {/* eslint-disable-next-line no-unsafe-optional-chaining */}
            <StarRating rating={selectedMovie?.vote_average} />
            <div>{`${selectedMovie?.runtime} min / ${selectedMovie?.spoken_languages[0]?.english_name}`}</div>
          </div>

          {/* genres of movie */}
          <div className="items-center flex gap-7 justify-center">
            {selectedMovie?.genres?.map((genre) => (
              <button onClick={() => {
                navigate('/');
                dispatch(setType(genre.id));
              }}
              >{genre?.name}
              </button>
            ))}
          </div>

          {/* overview of movie */}
          <div>
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p>{selectedMovie?.overview}</p>
          </div>

          {/* Top Cast */}
          <h2 className="text-2xl font-semibold">Top Cast</h2>
          <div className="flex gap-1">
            {selectedMovie?.credits?.cast?.slice(0, 6)?.map((actor) => (
              <Link to={`/actors/${actor.id}`} className="flex flex-col items-center">
                <img
                  className="w-20 rounded"
                  src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`}
                />
                <div className="opacity-70 text-sm w-[80%]  text-center">{actor?.character}</div>
                <div className="w-[80%]  text-center">{actor?.original_name}</div>
              </Link>
            ))}
          </div>

          {/* buttons for further operations */}
          <div className="flex gap-1 items-center justify-between px-9">
            <Link
              className="text-center w-28 bg-slate-400 rounded"
              to={`https://www.imdb.com/title/${selectedMovie?.imdb_id}`}
            >
              IMDB
            </Link>
            <Link className="text-center w-28 bg-slate-400 rounded" to={selectedMovie?.homepage}>Website</Link>
            <button className="text-center w-28 bg-slate-400 rounded" onClick={() => setOpen(true)}>Trailer</button>

            <div className="text-center w-28 bg-slate-400 rounded">{!isFvrt ? (
              <button onClick={() => {
                console.log('adding movie', selectedMovie?.id);
                addToFvrtList(selectedMovie?.id);
                setFvrt(true);
              }}
              >Fvrt
              </button>
            ) : <button onClick={() => { console.log('removing movie', selectedMovie.id); removeFromFvrtList(selectedMovie?.id); setFvrt(false); }}>Not Fvrt</button>}
            </div>
            <button className="text-center w-28 bg-slate-400 rounded" onClick={() => {}}>Wishlist</button>
            <button
              className="text-center w-28 bg-slate-400 rounded"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>

          <Modal open={open} setOpen={setOpen} videos={selectedMovie?.videos} />
        </div>
      </div>
      <div>
        <h1>You might also like</h1>
        <MovieList Movies={recommendations?.results} />
      </div>
      <div className="flex items-center justify-evenly w-[50vh] py-4">
        {/* eslint-disable-next-line react/button-has-type */}
        {page > 1 && <button className="bg-blue-800 px-2 py-1 rounded" onClick={() => setPage((prevPage) => prevPage - 1)}>Prev</button>}
        <p>Current Page: {recommendations?.page}</p>
        {/* eslint-disable-next-line react/button-has-type */}
        {page < recommendations?.total_pages && <button className="bg-blue-800 px-2 py-1 rounded" onClick={() => setPage((prevPage) => prevPage + 1)}>next</button>}
      </div>
    </div>
  );
}

export default MovieInformation;
