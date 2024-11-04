import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../api/axios";
const initialState = {
  posts: [],
  postVote:{},
  replierVote:{},

};

export const getPost = createAsyncThunk("getPost", async (curriculumId) => {
  
  const result = await apiService.get(`http://localhost:5122/api/post/curriculumId/${curriculumId}`);

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
  },
});

//export const { } = discussionSlice.actions;
export default discussionSlice.reducer;
