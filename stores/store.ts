import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../reducers/tab-slice";
import songDataReducer from "../reducers/song-data-slice";
import toggleDrawerReducer from "../reducers/toggle-drawer-slice";

export default configureStore({
  reducer: {
    tab: tabReducer,
    songData: songDataReducer,
    toggleDrawer: toggleDrawerReducer,
  },
});
