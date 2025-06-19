// src/hooks/useAuthInit.ts
import { getRefreshToken, removeRefreshToken, setRefreshToken } from '@/features/auth/tokenService';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut, setCredentials } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://thoughts-backend-jxm7.onrender.com/api/v1', });

export const useAuthInit = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                console.log("started authinit");
                const refreshToken = await getRefreshToken();
                // console.log(refreshToken, "ref token");


                if (!refreshToken) throw new Error('No refresh token found');

                // 1. Refresh the access token using refresh token nad save new refresh token to async storage
                const refreshResult = await baseQuery(
                    {
                        url: 'users/refresh-token',
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    },
                    // @ts-ignore
                    {}, // api (empty context)
                    {}  // extraOptions
                );
                // @ts-ignore

                // console.log(refreshResult, "ref res");

                const newAccessToken = refreshResult?.data?.data?.accessToken;
                await setRefreshToken(refreshResult?.data?.data?.refreshToken);


                // console.log(refreshResult?.data?.data?.refreshToken, "new ref token");

                if (!newAccessToken) throw new Error('Access token refresh failed');

                // 2. Use the new access token to get user details
                const userResult = await baseQuery(
                    {
                        url: '/users/current-user',
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    },
                    // @ts-ignore
                    {},
                    {}
                );
                // @ts-ignore
                const user = userResult?.data?.data;
                if (!user) throw new Error('User fetch failed');

                // 3. Update the Redux store
                dispatch(setCredentials({ accessToken: newAccessToken, user }));
            } catch (err) {
                console.error('Auth initialization failed:', err);
                dispatch(logOut());
                await removeRefreshToken();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [dispatch]);

    return { loading };
};
