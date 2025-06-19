import { apiSlice } from '@/services/api';
import { logOut, setCredentials } from './authSlice';
import { removeRefreshToken, setRefreshToken } from './tokenService';

export const authApi = apiSlice.injectEndpoints({
    overrideExisting: true,
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
                    console.log(data);
                    dispatch(setCredentials({ accessToken: data.data.accessToken, user: data.data.user }));
                    await setRefreshToken(data.data.refreshToken);
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logOut());
                    await removeRefreshToken();
                } catch (err) {
                    console.error('Logout failed:', err);
                }
            },
        }),

        getCurrentUser: builder.query({
            query: () => ({
                url: '/users/current-user',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ user: data.data, accessToken: data.accessToken }));
                } catch (err) {
                    console.error('Fetching current user failed:', err);
                }
            },
        }),
    }),
} as const); // ✅ Required for proper type inference

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
} = authApi;
