import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: false,
        font: {
            name: 'Raleway',
            css: "'Raleway', sans-serif"
        }
    },
    reducers: {
        switchTheme: (state) => {
            state.isDark = !state.isDark;
        },
        changeFont: (state, action) => {
            state.font = action.payload;
        }
    }
});

export const { switchTheme, changeFont } = themeSlice.actions;
export const selectTheme = (state) => state.theme.isDark;
export const selectFont = (state) => state.theme.font;

export default themeSlice.reducer;