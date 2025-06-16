import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../services/api';
import { setCredentials } from './authSlice';
import { setRefreshToken } from './tokenService';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data?.data);
                    dispatch(setCredentials({ accessToken: data?.data?.accessToken, user: data?.data?.user }));
                    await setRefreshToken(data?.data?.refreshToken);
                } catch (err) {
                    console.error('Login failed:', err);
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
