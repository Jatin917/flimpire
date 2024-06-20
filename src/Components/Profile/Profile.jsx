/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentData } from '../../firestore';
import { setFvrtList, setWishList } from '../../features/AuthSlice';
import { useGetMovieByIdQuery } from '../../services/TMDB';
import MovieProfileList from '../MovieProfileList/MovieProfileList';

function Profile() {
  const { fvrtList, wishList } = useSelector(((store) => store.userSlice));
  console.log('Favorite list is inside profile', fvrtList);
  // updating the userData
  const uid = localStorage.getItem('uid');
  const dispatch = useDispatch();
  // for fetching data when the uid changes (when new user signed in)
  useEffect(() => {
    if (uid) {
      fetchDocumentData(uid)
        .then((Data) => {
          // console.log('inside app', Data?.fvrtList, Data?.fvrtList !== 'undefined');
          console.log('fvrt movies here ', Data?.fvrtList, Data !== 'undefined');
          // eslint-disable-next-line no-unused-expressions
          Data !== 'undefined' && dispatch(setFvrtList(Data?.fvrtList));
          // eslint-disable-next-line no-unused-expressions
          Data !== 'undefined' && dispatch(setWishList(Data?.wishList));
        })
        .catch((err) => console.log(err));
    }
  }, [uid]); // This effect runs only when `uid` changes.
  return (
    <div className=" min-[h-screen]">
      <div>
        <h1>Favorite movies list here.</h1>
        <div className="border flex flex-wrap">
          {fvrtList?.map((id) => <MovieProfileList id={id} />)}
        </div>
      </div>
      <div>
        <h1>WishList movies list here.</h1>
        <div className="border flex">
          {wishList?.map((id) => <MovieProfileList id={id} />)}
        </div>
      </div>
    </div>
  );
}

export default Profile;
