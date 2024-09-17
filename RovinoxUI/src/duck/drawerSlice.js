import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
};

export const drawerSlicer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.open = true;
      console.log("hit1", state.open);
    },
    closeDrawer: (state) => {
      state.open = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlicer.actions;
export default drawerSlicer.reducer;
