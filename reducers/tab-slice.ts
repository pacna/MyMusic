import { createSlice, Slice } from "@reduxjs/toolkit";

export const tabSlice: Slice<
  {
    value: number;
  },
  {
    changeToDifferentTab: (
      state: {
        value: number;
      },
      action: {
        payload: any;
        type: string;
      }
    ) => void;
  },
  "tab"
> = createSlice({
  name: "tab",
  initialState: { value: 0 },
  reducers: {
    changeToDifferentTab: (
      state: { value: number },
      action: { payload: any; type: string }
    ): void => {
      state.value = action.payload;
    },
  },
});

export const { changeToDifferentTab } = tabSlice.actions;

export default tabSlice.reducer;
