import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchParameter } from '../../features/MovieSlice';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate('/');
      dispatch(setSearchParameter(query));
      console.log(query);
    }
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className="bg-inherit border-light-gray border-b-yellow-200 outline-0 "
      />
    </div>
  );
}

export default Search;
