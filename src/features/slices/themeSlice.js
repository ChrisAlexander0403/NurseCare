import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: false
    },
    reducers: {
        switchTheme: (state) => {
            state.isDark = !state.isDark;
        }
    }
});

export const { switchTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.isDark;

export default themeSlice.reducer;