import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../reducers/tab-slice";

export default configureStore({
  reducer: {
    tab: tabReducer,
  },
});
