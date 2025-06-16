import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.user = payload.user;
        },
        logOut: (state) => {
            state.accessToken = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
