import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";

import authSlice from "./reducers/auth";
import appSlice from "./reducers/app";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  
  auth: authSlice,
  app: appSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
