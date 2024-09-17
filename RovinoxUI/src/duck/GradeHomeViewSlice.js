import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  gradeHomeView: false,
  batchId: "",
};

export const gradeHomeViewSlicer = createSlice({
  name: "gradeHomeView",
  initialState,
  reducers: {
    changeGradeHomeView: (state) => {
      state.gradeHomeView = !state.gradeHomeView;
    },
  },
});

export const { changeGradeHomeView } = gradeHomeViewSlicer.actions;
export default gradeHomeViewSlicer.reducer;
