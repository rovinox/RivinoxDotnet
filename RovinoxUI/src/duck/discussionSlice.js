import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../api/axios";
const initialState = {
  comments: [],
  vote:{upvoted:[],
    downvoted:[]},
};

export const getComments = createAsyncThunk("getComments", async (curriculumId) => {
  
  const result = await apiService.get(`http://localhost:5122/api/comment/curriculumId/${curriculumId}`);

  return result.data;
});
export const getVotes = createAsyncThunk("getVotes", async (curriculumId) => {
  
  const result = await apiService.get(`http://localhost:5122/api/vote/curriculumId/${curriculumId}`);

  return result.data;
});




export const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    updateVote: (state, {payload})=>{
      state.vote = payload;
    }
  },
  extraReducers: {
    // updatecommentId: (state, action) => {
    //   const { commentId } = action.payload;
    //   state.commentId = commentId;
    // },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [getVotes.fulfilled]: (state, action) => {
      if(action.payload.id ){
        state.vote =  action.payload;
      }
      console.log('action', action.payload);
    },
  },
});

export const { updateVote} = discussionSlice.actions;
export default discussionSlice.reducer;
