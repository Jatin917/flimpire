/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  NavBar,
  Movies,
  MovieInformation,
  Actors,
  Profile,
  Sidebar,
} from './index';

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  return (
    <div className="flex w-screen">
      <div className="w-[16%] fixed h-screen">
        {/* side bar */}
        <Sidebar isDarkMode={isDarkMode} />
      </div>
      <div className="w-[86%] ml-[16%]">
        <NavBar isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
        <main className={`mt-[100px] w-[calc(100vh - 16%)] ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element="no page to show" />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
