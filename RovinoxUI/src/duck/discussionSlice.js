import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../api/axios";
const initialState = {
  posts: [],
  postVote:{},
  replierVote:{},

};

export const getPost = createAsyncThunk("getPost", async (curriculumId) => {
  
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
  },
  extraReducers: {
    // updatepostId: (state, action) => {
    //   const { postId } = action.payload;
    //   state.postId = postId;
    // },
    [getPost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getVotes.fulfilled]: (state, action) => {
      //state.posts = action.payload;
      console.log(action.payload);
    },
  },
});

//export const { } = discussionSlice.actions;
export default discussionSlice.reducer;
