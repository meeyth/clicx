import { apiSlice } from '@/services/api';

export const feedApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getFeed: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
                url: `/users/get-feed?page=${page}&limit=${limit}`,
                method: 'GET',
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
                { type: 'Blogs', id: page },
                { type: 'Blogs' },
            ],
        }),
    }),
});

export const { useGetFeedQuery } = feedApi;
