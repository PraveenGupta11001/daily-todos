import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: !!localStorage.getItem('token'), // Check token on app load
};

const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = authUserSlice.actions;
export default authUserSlice.reducer;