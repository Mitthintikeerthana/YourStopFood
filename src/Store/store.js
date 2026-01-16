import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app.js";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
