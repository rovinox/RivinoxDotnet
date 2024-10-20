import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
  isNotificationDrawer: false,
};

export const drawerSlicer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.open = true;
    
    },
    closeDrawer: (state) => {
      state.open = false;
    },
    openNotificationDrawer: (state) => {
      state.isNotificationDrawer = true;
    
    },
    closeNotificationDrawer: (state) => {
      state.isNotificationDrawer = false;
    },
  },
});

export const { openDrawer, closeDrawer, closeNotificationDrawer, openNotificationDrawer } = drawerSlicer.actions;
export default drawerSlicer.reducer;
