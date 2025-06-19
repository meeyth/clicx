import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blog/blogSlice';
import feedReducer from '../features/feed/feedSlice';
import { apiSlice } from './api';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feed: feedReducer,
        blog: blogReducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
