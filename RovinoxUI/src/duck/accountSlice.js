import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null
};



export const accountSlicer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      const { user } = payload;
      console.log('from stuser: ', user);
      state.user = user;
    },
  },
});

export const { setUser } = accountSlicer.actions;
export default accountSlicer.reducer;
