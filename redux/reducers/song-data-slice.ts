// third party
import { createSlice, Slice } from "@reduxjs/toolkit";

// others
import { SongData } from "../../components/types";

export const songDataSlice: Slice<
  {
    value: SongData;
  },
  {
    setSongData: (
      state: {
        value: SongData;
      },
      action: {
        payload: any;
        type: string;
      }
    ) => void;
  },
  "songData"
> = createSlice({
  name: "songData",
  initialState: { value: {} as SongData },
  reducers: {
    setSongData: (
      state: { value: SongData },
      action: { payload: any; type: string }
    ): void => {
      state.value = action.payload;
    },
  },
});

export const { setSongData } = songDataSlice.actions;

export default songDataSlice.reducer;
