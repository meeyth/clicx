import { createSlice } from '@reduxjs/toolkit';




const initialState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
