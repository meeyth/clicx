import { apiSlice } from '@/services/api';

export const commentApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getBlogComments: builder.query({
            query: ({ blogId, page = 1, limit = 5 }) => ({
                url: `/blog/blog-comment/${blogId}?page=${page}&limit=${limit}`,
                method: 'GET',
            }),

            // Handle transformation of response
            transformResponse: (response) => response.data,

            // Cache by blog
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                console.log("hello");
                console.log(endpointName, queryArgs);
                return `${endpointName}-${queryArgs.blogId}`;
            },

            // Append new comments to existing data
            merge: (existingCache, newItems) => {
                if (newItems.page === 1) {
                    return { ...newItems }; // replace for page 1
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

            // Only refetch when page changes
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page;
            },

            providesTags: (result, error, { blogId, page }) => [
                { type: 'Comments', id: `${blogId}-${page}` },
                // { type: 'Comments', id: page },
                // { type: 'Comments' },
            ],
        }),


        addComment: builder.mutation({
            query: (newComment) => ({
                url: '/blog/add-comment',
                method: 'POST',
                body: newComment,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

            },

            // Optional: Invalidate cache for the blog to refetch updated comments
            invalidatesTags: (result, error, { blogId, page }) => [
                // { type: 'Comments', id: `${blogId}` },
            ],
        }),
    }),
});

export const { useGetBlogCommentsQuery, useAddCommentMutation } = commentApi;
