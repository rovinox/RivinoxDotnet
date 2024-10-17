import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import drawerReducer from "./drawerSlice";
import batchReducer from "./batchSlice";
import changeGradeHomeView from "./GradeHomeViewSlice";

import { combineReducers } from "@reduxjs/toolkit";


const reducer = combineReducers({
  changeTheme: themeReducer,
  drawer: drawerReducer,
  changeGradeHomeView,
  batch:batchReducer
});

export const store = configureStore({
  reducer,

});
