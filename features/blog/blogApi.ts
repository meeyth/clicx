// features/blog/blogApi.ts
import { apiSlice } from '@/services/api';

export const blogApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createBlog: builder.mutation({
            query: (formData) => ({
                url: '/blog/add-blog',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
                try {
                    await queryFulfilled;
                    const userId = getState().auth.user._id;
                    dispatch(blogApi.util.invalidateTags([{ type: 'UserBlogs' }]));
                } catch (err) {
                    console.error('Blog creation failed', err);
                }
            },
        }),

        getUserBlogs: builder.query({
            query: ({ userId, page = 1, limit = 10 }) => ({
                url: `/blog/user-blog/${userId}?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                // console.log(response, "trans");
                return response.data;
            },

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

            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page;
            },

            providesTags: (result, error, { userId, page }) => [
                { type: 'UserBlogs', id: `${userId}-${page}` },
                { type: 'UserBlogs' },
            ],
        }),
    }),
});

export const { useCreateBlogMutation, useGetUserBlogsQuery } = blogApi;
