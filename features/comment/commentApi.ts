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
                return `${endpointName}-${queryArgs.blogId}`;
            },

            // Append new comments to existing data
            merge: (currentCache, newData) => {
                if (newData.page === 1) {
                    return newData; // replace for page 1
                }

                console.log(currentCache, "currentCache");
                console.log(newData, "newData");

                return {
                    ...currentCache,
                    docs: [...(currentCache.docs || []), ...newData.docs],
                    page: newData.page,
                    totalPages: newData.totalPages,
                    hasNextPage: newData.hasNextPage,
                    nextPage: newData.nextPage,
                };
            },

            // Only refetch when page changes
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page;
            },

            providesTags: (result, error, { blogId, page }) => [
                { type: 'Comments', id: `${blogId}-${page}` },
                { type: 'Comments', id: blogId },
            ],
        }),


        addComment: builder.mutation({
            query: (newComment) => ({
                url: '/blog/add-comment',
                method: 'POST',
                body: newComment,
            }),

            // Optional: Invalidate cache for the blog to refetch updated comments
            // invalidatesTags: (result, error, { blogId }) => [
            //     { type: 'Comments', id: blogId },
            // ],
        }),
    }),
});

export const { useGetBlogCommentsQuery, useAddCommentMutation } = commentApi;
