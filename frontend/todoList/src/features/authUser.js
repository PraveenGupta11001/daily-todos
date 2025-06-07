// src/features/authUser.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
};

const authUserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const {setUser, clearUser} = authUserSlice.actions;
export default authUserSlice.reducer;