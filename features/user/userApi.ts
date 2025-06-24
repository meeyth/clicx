import { apiSlice } from "@/services/api";


export const userApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({

        getUser: builder.query({
            query: ({ username }) => ({
                url: `/users/profile/${username}`,
                method: 'GET',
            }),

            transformResponse: (response) => {
                // console.log(response, "trans");
                return response.data;
            },
        }),

    }),
});

export const { useGetUserQuery } = userApi;
