import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../features/auth/authSlice';
import { getRefreshToken, removeRefreshToken, setRefreshToken } from '../features/auth/tokenService';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://thoughts-backend-jxm7.onrender.com/api/v1',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        try {
            const refreshToken = await getRefreshToken();

            const refreshResult = await baseQuery(
                {
                    url: '/users/refresh-token',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                },
                api,
                extraOptions
            );

            if (refreshResult?.data) {
                const { accessToken, refreshToken: newRefreshToken, user } = refreshResult.data;

                api.dispatch(setCredentials({ accessToken, user }));
                await setRefreshToken(newRefreshToken);

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logOut());
                await removeRefreshToken();
            }
        } catch {
            api.dispatch(logOut());
            await removeRefreshToken();
        }
    }

    return result;
};
