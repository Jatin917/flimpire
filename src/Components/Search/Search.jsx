import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParameter } from '../../features/MovieSlice';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(setSearchParameter(query));
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
