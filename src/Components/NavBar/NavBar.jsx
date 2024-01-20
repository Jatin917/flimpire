/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-cycle
import { getAuth, signOut } from 'firebase/auth';
// eslint-disable-next-line import/no-cycle
import { FaSearch, MdDarkMode, CiLight } from '../index';
import { setSearchParameter } from '../../features/MovieSlice';
import Search from '../Search/Search';
import { fetchToken } from '../../utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import SignIn from '../firebase/SignIn/SignIn';
import { app } from '../../firebase';
import { setAuthentication } from '../../features/AuthSlice';

const auth = getAuth(app);

function NavBar({ isDarkMode, setDarkMode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // sign out function
  function signout() {
    signOut(auth).then(() => {
      toast.success('Sign Out Successfully');
      console.log('sign out successfully');
      dispatch(setAuthentication(true));
      navigate('/', { replace: true });
      // Sign-out successful.
    }).catch((err) => {
      // An error happened.
      console.log('problem in signing you out successfully');
      toast.error(`Somethign went wrong ${err}`);
    });
  }

  const uid = localStorage.getItem('uid');
  const { searchQuery } = useSelector((store) => store.movieList);
  const { isAuthenticated } = useSelector((store) => store.userSlice);

  return (
    <div
      className={`flex h-[100px] fixed top-0 right-0 w-[86%] z-10 ${
        isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200'
      }`}
    >
      <div className="flex items-center justify-between px-3 font-semibold border-black w-full">
        {/* nav bar netflix logo and links */}
        <div className="flex items-center justify-between w-[40%]">
          <Link to="/"> Home</Link>
          <Link to="/movies">TV Shows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/toprated">Latest</Link>
          <Link to="/whishlist">My List</Link>
        </div>
        {/* dark mode logo and log in and search box */}
        <div className="w-[full] flex bg-inherit items-center gap-2 border-b-2 border-red-400">
          <FaSearch />
          <Search />
        </div>
        <div aria-placeholder="search here" className="flex items-center  justify-between pr-6 w-[20%]">
          <button
            type="button"
            onClick={() => {
              setDarkMode((prev) => !prev);
            }}
          >
            {isDarkMode ? <MdDarkMode /> : <CiLight />}
          </button>
          {isAuthenticated ? <button onClick={() => { navigate('/auth'); }}>New</button> : <button onClick={() => navigate(`/profile/${uid}`)}>My Movies</button>}
          {isAuthenticated || <button className="p-2" onClick={() => signout()}>Log Out</button>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
