import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    feedDetails: {
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

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeedDetails: (state, action) => {
            state.feedDetails = action.payload;
        },
        updateCurrentPageToNextPage: (state, action) => {
            // console.log("action.payload  ", action.payload)
            // console.log(action.payload.page, "updateCurrentPageToNextPage");
            state.feedDetails.page = action.payload.page
        },

        resetFeedDetails: () => initialState,

    },
});

export const { setFeedDetails, updateCurrentPageToNextPage, resetFeedDetails } = feedSlice.actions;

export default feedSlice.reducer;
