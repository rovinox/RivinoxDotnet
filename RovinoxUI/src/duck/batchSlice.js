import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../api/axios";
const initialState = {
  batches: [],
  batchId: null,
  errorMessage: "",
};

export const getBatch = createAsyncThunk("getBatch", async () => {
  const result = await apiService.get("http://localhost:5122/api/batch");

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
  },
});

export const { updateBatchId } = batchSlicer.actions;
export default batchSlicer.reducer;
