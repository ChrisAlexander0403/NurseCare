import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        session: null
    },
    reducers: {
        login: (state, action) => {
            state.session = action.payload;
        },
        logout: (state) => {
            state.session = null
        }
    }
});

export const { login, logout } = sessionSlice.actions;
export const selectSession = (state) => state.session.session;

export default sessionSlice.reducer;