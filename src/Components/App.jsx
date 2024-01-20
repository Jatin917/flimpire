/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  NavBar,
  Movies,
  MovieInformation,
  Actors,
  Profile,
  Sidebar,
} from './index';
import Auth from './Auth/Auth';
import { docChecker, fetchDocumentData } from '../firestore';
import { setFvrtList, setWishList } from '../features/AuthSlice';

function App() {
  const [isDarkMode, setDarkMode] = useState(true);
  return (
    <div className="flex w-screen">
      <div className="w-[16%] fixed h-screen">
        {/* side bar */}
        <Sidebar isDarkMode={isDarkMode} />
      </div>
      <div className="w-[86%] ml-[16%]">
        <NavBar isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
        <main className={`mt-[100px] pt-5  w-[calc(100vh - 16%)] ${isDarkMode ? 'bg-black text-white ' : 'bg-slate-200'}`}>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieInformation isDarkMode={isDarkMode} />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element="no page to show" />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
