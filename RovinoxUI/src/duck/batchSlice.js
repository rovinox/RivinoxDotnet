import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../api/axios";
const initialState = {
  batches: [],
  enrollments: [],
  batchId: null,
  errorMessage: "",
};

export const getBatch = createAsyncThunk("getBatch", async () => {
  const result = await apiService.get("http://localhost:5122/api/batch");

  return result.data;
});
export const getEnrollment = createAsyncThunk("getEnrollment", async () => {
  const result = await apiService.get("http://localhost:5122/api/enrollment");

  return result.data;
});

export const batchSlicer = createSlice({
  name: "batch",
  initialState,
  reducers: {
    updateBatchId: (state, action) => {
      const { batchId } = action.payload;
      state.batchId = batchId;
    },
  },
  extraReducers: {
    // updateBatchId: (state, action) => {
    //   const { batchId } = action.payload;
    //   state.batchId = batchId;
    // },
    [getBatch.fulfilled]: (state, action) => {
      state.batches = action.payload;
    },
    [getEnrollment.fulfilled]: (state, action) => {
      state.enrollments = action.payload;
    },
  },
});

export const { updateBatchId } = batchSlicer.actions;
export default batchSlicer.reducer;
