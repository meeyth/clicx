// features/blog/blogApi.ts
import { apiSlice } from '@/services/api';

export const blogApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getSpecificBlog: builder.query({
            query: ({ blogId }: { blogId: string }) => ({
                url: `/blog/get-blog/${blogId}`,
                method: 'GET',
                // Optional if you’re using cookies for auth
                // credentials: 'include',
            }),

            transformResponse: (response) => {
                // console.log(response, "getSpecificBlog");
                return response.data; // the actual blog document
            },

            providesTags: (result, error, { blogId }) => [{ type: 'Blog', id: blogId }],
        }),

        createBlog: builder.mutation({
            query: (formData) => ({
                url: '/blog/add-blog',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['UserBlogs'],
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

        deleteBlog: builder.mutation({
            query: ({ blogId }) => ({
                url: '/blog/delete-blog',
                method: 'DELETE', // or POST if your backend expects it (currently it's POST)
                body: { blogId },
            }),

            // Invalidate the blog list or user profile cache if needed
            invalidatesTags: (result, error, { blogId }) => [
                { type: 'UserBlogs' },
            ],
        }),

        updateBlog: builder.mutation({
            query: (formData) => ({
                url: '/blog/update-blog',
                method: 'PUT',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['UserBlogs'],
        }),
    }),
});

export const { useCreateBlogMutation, useGetUserBlogsQuery, useGetSpecificBlogQuery, useDeleteBlogMutation, useUpdateBlogMutation } = blogApi;
