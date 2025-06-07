// src/features/themes.js
import { createSlice, current } from '@reduxjs/toolkit';
import { themeMap } from '../constants/themeMap';

const initialState = {
    currentTheme: themeMap.light, // Default theme
};

const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        setThemes: (state, action) => {
            state.currentTheme = action.payload;
        },
        clearThemes: (state) => {
            state.currentTheme = themeMap.light; // Reset to default theme
        },
    },
});

export const { setThemes, clearThemes } = themesSlice.actions;
export default themesSlice.reducer;