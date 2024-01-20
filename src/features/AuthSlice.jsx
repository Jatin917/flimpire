import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isAuthenticated: true,
    email: '',
    password: '',
    fvrtList: [],
    wishList: [],
    uId: '',
  },
  reducers: {
    // setUserData(state, action) {
    //   state.isAuthenticated = false;
    //   state.user = action.payload;
    //   state.sessionId = localStorage.getItem('session_id');

    //   localStorage.setItem('account_id', action.payload.id);
    // },
    setEmail(state, action) {
      state.email = action.payload;
      state.isAuthenticated = false;
      state.uId = localStorage.getItem('uid');
    },
    setPswd(state, action) {
      state.password = action.payload;
    },
    setWishList(state, action) {
      state.wishList = action.payload;
    },
    setFvrtList(state, action) {
      state.fvrtList = action.payload;
    },
    // addToFvrtList(state, action) {
    //   const size = state.fvrtList.length;
    //   state.fvrtList[size] = action.payload;
    // },
  },
});

export const { setEmail, setPswd, setFvrtList, setWishList } = userSlice.actions;
export default userSlice.reducer;
