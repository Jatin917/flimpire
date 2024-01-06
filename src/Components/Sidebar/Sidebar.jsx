/* eslint-disable import/newline-after-import */
import React from 'react';
// eslint-disable-next-line import/no-cycle
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { netflix } from '..';
import { useSearchMovieGenresQuery } from '../../services/TMDB';
import { setType } from '../../features/MovieSlice';

const categories = [
  { label: 'Popular', key: 'popular' },
  { label: 'Top Rated', key: 'top_rated' },
  { label: 'Upcoming', key: 'upcoming' },
];

function Sidebar({ isDarkMode }) {
  const navigate = useNavigate();
  const { data: GenresData, isFetching, isError } = useSearchMovieGenresQuery();
  const dispatch = useDispatch();
  if (isError) {
    return 'error in loading data of genres';
  }
  return (
    <div className={`overflow-y-scroll flex items-center justify-between flex-col w-full h-full ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>
      <img src={netflix} className="w-[150px]" />
      <div className="  flex gap-4 flex-col w-full py-3">
        <div className="text-sm font-extrathin border-t px-12 pt-4">Categories</div>
        <div className="flex items-center justify-center flex-col gap-2 ">
          {categories.map((category, i) => (
            // eslint-disable-next-line react/jsx-key
            <button
              onClick={() => {
                navigate('/');
                dispatch(setType(categories[i].key));
              }}
              type="button"
              key={i}
              className="hover:bg-slate-200 hover:text-black w-full p-2"
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="text-sm font-extrathin border-t px-12 pt-4">Genres</div>
        <div className="flex items-center justify-center flex-col gap-2">
          {isFetching ? (
            <div>loading...</div>
          ) : (
            GenresData.genres.map((genre) => (
              // eslint-disable-next-line react/jsx-key
              <button
                onClick={() => {
                  navigate('/');
                  dispatch(setType(genre.id));
                }}
                type="button"
                key={genre.id}
                className="hover:bg-slate-200 w-full p-2 hover:text-black"
              >
                {genre.name}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
