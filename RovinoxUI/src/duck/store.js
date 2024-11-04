import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import drawerReducer from "./drawerSlice";
import batchReducer from "./batchSlice";
import account from "./accountSlice";
import changeGradeHomeView from "./GradeHomeViewSlice";
import discussion from "./discussionSlice";

import { combineReducers } from "@reduxjs/toolkit";


const reducer = combineReducers({
  changeTheme: themeReducer,
  account,
  discussion,
  drawer: drawerReducer,
  changeGradeHomeView,
  batch:batchReducer
});

export const store = configureStore({
  reducer,

});
