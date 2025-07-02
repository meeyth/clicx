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

        getUsersSortedByBlogs: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/users/get-users?page=${page}&limit=${limit}`,
                method: "GET",
            }),

            transformResponse: (response) => response.data,

            serializeQueryArgs: ({ endpointName }) => endpointName,

            merge: (existingCache, newItems) => {
                if (newItems.page === 1) {
                    return { ...newItems };
                }

                return {
                    ...existingCache,
                    docs: [...(existingCache?.docs || []), ...newItems.docs],
                    totalDocs: newItems.totalDocs,
                    limit: newItems.limit,
                    page: newItems.page,
                    totalPages: newItems.totalPages,
                    hasNextPage: newItems.hasNextPage,
                    hasPrevPage: newItems.hasPrevPage,
                    prevPage: newItems.prevPage,
                    nextPage: newItems.nextPage,
                    pagingCounter: newItems.pagingCounter,
                };
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.page !== previousArg?.page;
            },

            providesTags: (result, error, { page }) => [
                { type: 'UserList', id: page },
                { type: 'UserList' },
            ],
        }),

    }),
});

export const { useGetUserQuery, useGetUsersSortedByBlogsQuery } = userApi;
