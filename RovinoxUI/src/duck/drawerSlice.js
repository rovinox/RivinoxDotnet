import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../api/axios";
const initialState = {
  open: false,
  isNotificationDrawer: false,
  notifications:[],
  notSeenCount: 0,
};


export const getNotification = createAsyncThunk("getNotification", async () => {
  const result = await apiService.get("http://localhost:5122/api/notification");
  return result.data;
})

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
  extraReducers: {
    // updateBatchId: (state, action) => {
    //   const { batchId } = action.payload;
    //   state.batchId = batchId;
    // },
    [getNotification.fulfilled]: (state, action) => {
      state.notifications = action.payload?.notifications;
      state.notSeenCount = action.payload?.notSeenCount;
    },
  },
});

export const { openDrawer, closeDrawer, closeNotificationDrawer, openNotificationDrawer } = drawerSlicer.actions;
export default drawerSlicer.reducer;
