import { apiSlice } from "@/services/api";


export const followApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Login endpoint definition

        getFollowing: builder.query({
            query: ({ userId, page = 1, limit = 10 }) => ({
                url: `/users/get-following/${userId}?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            transformResponse: (response) => response.data,

            // Optional caching + pagination handling
            serializeQueryArgs: ({ endpointName }) => endpointName,

            merge: (currentCache, newData) => {
                if (newData.page === 1) return newData;

                return {
                    ...newData,
                    docs: [...(currentCache?.docs || []), ...newData.docs],
                };
            },

            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page;
            },

            providesTags: (result, error, { userId, page }) => [
                { type: 'Following', id: `${userId}-${page}` },
            ],
        }),

        toggleFollow: builder.mutation({
            query: ({ userId }) => {
                // console.log("Called toggleFollow", userId);
                return {
                    url: `/users/toggle-follow/${userId}`, // assuming this is your route
                    method: "PUT", // or POST if you're using POST instead
                }
            },

            transformResponse: (response) => {
                // console.log("Follow/unfollow result:", response);
                return response.data; // returns true or false (followed or unfollowed)
            },

            invalidatesTags: (result, error, userId) => [
                { type: "User", id: userId }, // Invalidate if you cache user's profile
                { type: "FollowStatus", id: userId } // Optional: if you tag follow status separately
            ],
        }),

    }),
});

export const { useGetFollowingQuery, useToggleFollowMutation } = followApi;
