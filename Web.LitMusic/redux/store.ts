// Third party
import { configureStore } from "@reduxjs/toolkit";

// Self
import songDataReducer from "./reducers/song-data-slice";
import toggleDrawerReducer from "./reducers/toggle-drawer-slice";
import toggleSoundWaveReducer from "./reducers/toggle-soundwave-slice";
import toggleSearchReducer from "./reducers/toggle-search-slice";

export default configureStore({
    reducer: {
        songData: songDataReducer,
        toggleDrawer: toggleDrawerReducer,
        toggleSoundWave: toggleSoundWaveReducer,
        toggleSearch: toggleSearchReducer,
    },
});
