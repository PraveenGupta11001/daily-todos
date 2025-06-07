// src/app/store/userStore.js
import { configureStore } from '@reduxjs/toolkit';
import themesSlice from '../../features/themes';
import authUserSlice from '../../features/authUser';

export const store = configureStore({
    reducer: {
        theme: themesSlice,
        auth: authUserSlice,
    },
});