import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import appSlice from "./reducers/app";

const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
});

export default store;
