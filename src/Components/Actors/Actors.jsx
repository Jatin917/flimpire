/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetMoviesByActorIdQuery, useGetProfileQuery } from '../../services/TMDB';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';

function Actors() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data: selectedProfile, isFetching, isError } = useGetProfileQuery(id);
  const { data: recommendations, isFetching: isFetchingRecommendation, isError: isErrorRecommendation } = useGetMoviesByActorIdQuery({ id, page });
  if (isFetching) {
    return <Loader />;
  }
  if (isError) {
    return 'Error in Loading data';
  }
  if (isFetchingRecommendation) {
    return <Loader />;
  }
  if (isErrorRecommendation) {
    return 'Error in Loading data';
  }
  return (
    <div>
      <div className="flex items-center justify-center flex-col w-full px-5">
        <div className="flex w-full gap-3 ">
          {/* contianer for image of selected image */}
          <div className="flex items-centerpl-5 border mt-[10px] justify-center">
            <img
              className=" shadow-black rounded-md max-w-[250px]"
              src={`https://image.tmdb.org/t/p/original/${selectedProfile?.profile_path}`}
            />
          </div>
          {/* remaining details of selected image */}
          <div className="flex gap-3 flex-col px-8 mt-[10px]">
            <h1 className="text-4xl text-center font-semibold">
              {selectedProfile?.name}
            </h1>
            <h3 className="text-xl text-center">{`Born: ${selectedProfile?.birthday}`}</h3>

            {/* overview of movie */}
            <div>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p>{selectedProfile?.biography}</p>
            </div>

            {/* buttons for further operations */}
            <div className="flex gap-1 items-center justify-between px-9">
              <Link
                className="text-center w-28 bg-slate-400 rounded"
                to={`https://www.imdb.com/title/${selectedProfile?.imdb_id}`}
              >
                IMDB
              </Link>
              <Link
                className="text-center w-28 bg-slate-400 rounded"
                to={selectedProfile?.homepage}
              >
                Website
              </Link>

              <button
                className="text-center w-28 bg-slate-400 rounded"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl text-center p-4 font-bold">Movies</h1>
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
    </div>
  );
}

export default Actors;
