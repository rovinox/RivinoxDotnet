import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
  batchId: null,
};

export const drawerSlicer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.open = true;
    
    },
    upDateBatchId: (state,payload) => {
      const {batchId} = payload.payload
      console.log("hit1", payload, "batchId", batchId);
      state.batchId = batchId;
    
    },
    closeDrawer: (state) => {
      state.open = false;
    },
  },
});

export const { openDrawer, closeDrawer, upDateBatchId } = drawerSlicer.actions;
export default drawerSlicer.reducer;
