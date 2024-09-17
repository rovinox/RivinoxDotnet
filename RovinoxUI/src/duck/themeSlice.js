import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: "light",
};

export const themeSlicer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeToDark: (state) => {
      state.theme = "dark";
    },
    changeToLight: (state) => {
      state.theme = "light";
    },
  },
});

export const { changeToDark, changeToLight } = themeSlicer.actions;
export default themeSlicer.reducer;
