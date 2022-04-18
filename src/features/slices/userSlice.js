import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null
        },
        updateToken: (state, action) => {
            state.user.accessToken = action.payload;
        }
    }
});

export const { login, logout, updateToken } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;