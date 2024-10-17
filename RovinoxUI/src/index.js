import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.js";
import { Provider } from "react-redux";
import { store } from "./duck/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   
      <Router />
  
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
