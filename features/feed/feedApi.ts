import { apiSlice } from "@/services/api";
import { setFeedDetails } from "./feedSlice";


export const feedApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Login endpoint definition

        getFeed: builder.query({
            query: ({ page = 1, limit = 3 }) => {
                // console.log(page, limit, "feed slice");
                return {
                    url: `/users/get-feed?page=${page}&limit=${limit}`,  // Assuming the endpoint is /auth/me
                    method: 'GET',
                    // credentials: 'include',  // Include cookies automatically
                }
            },

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // console.log("query started");
                    dispatch(setFeedDetails({
                        totalDocs: data.totalDocs,
                        limit: data.limit,
                        page: data.page,
                        totalPages: data.totalPages,
                        hasNextPage: data.hasNextPage, // Keep track of next page
                        hasPrevPage: data.hasPrevPage,
                        prevPage: data.prevPage,
                        nextPage: data.nextPage,
                        pagingCounter: data.pagingCounter
                    }))

                } catch (error) {
                    console.error('Feed fetched failed: ', error);
                }
            },

            // Serialization of query arguments to ensure correct caching
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },

            transformResponse: (response) => {
                // console.log(response, "transformResponse");
                return response.data;
            },

            // Merging data immutably
            merge: (existingCache, newItems) => {
                if (newItems.page === 1) {
                    console.log("not merging this time");
                    return { ...newItems }; // Replace on first page
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
                    pagingCounter: newItems.pagingCounter
                };
            },

            // Only refetch when the page number changes
            forceRefetch({ currentArg, previousArg, }) {
                // console.log(currentArg, previousArg, "forceRefetch");
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
