import { apiSlice } from '@/services/api';

export const likeApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getLiked: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
                url: `/blog/get-liked-blogs?page=${page}&limit=${limit}`,
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
                { type: 'LikedBlogs', id: page },
                { type: 'LikedBlogs' },
            ],
        }),

        toggleBlogLike: builder.mutation<boolean, string>({
            query: ({ blogId }) => {
                // console.log(blogId, "toggleBlogLike");
                return {
                    url: `/blog/toggle-blog-like/${blogId}`,
                    method: "PUT",
                }
            },
            transformResponse: (response) => {
                // response.data is boolean: true = liked, false = unliked
                return response.data;
            },
            invalidatesTags: (result, error, blogId) => [
                { type: "LikedBlogs" }, // if using tags for blog refetch
            ],
        }),
    }),
});

export const { useGetLikedQuery, useToggleBlogLikeMutation } = likeApi;
