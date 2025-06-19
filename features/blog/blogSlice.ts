import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogDetails: {
        totalDocs: null,
        limit: 5,
        page: 1,
        totalPages: null,
        hasNextPage: null, // Keep track of next page
        hasPrevPage: null,
        prevPage: null,
        nextPage: null,
        pagingCounter: null
    }
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogDetails: (state, action) => {
            state.blogDetails = action.payload;
        },
        updateCurrentPageToNextPage: (state, action) => {
            // console.log("action.payload  ", action.payload)
            // console.log(action.payload.page, "updateCurrentPageToNextPage");
            state.blogDetails.page = action.payload.page
        },

        resetBlogDetails: () => initialState,

    },
});

export const { setBlogDetails, updateCurrentPageToNextPage, resetBlogDetails } = blogSlice.actions;

export default blogSlice.reducer;
