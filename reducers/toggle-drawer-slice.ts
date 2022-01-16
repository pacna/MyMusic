import { createSlice, Slice } from "@reduxjs/toolkit";
export const toggleDrawerSlice: Slice<
  {
    value: boolean;
  },
  {
    closeDrawer: (state: { value: boolean }) => void;
    openDrawer: (state: { value: boolean }) => void;
  },
  "toggleDrawer"
> = createSlice({
  name: "toggleDrawer",
  initialState: { value: false },
  reducers: {
    closeDrawer: (state: { value: boolean }): void => {
      state.value = false;
    },
    openDrawer: (state: { value: boolean }): void => {
      state.value = true;
    },
  },
});

export const { closeDrawer, openDrawer } = toggleDrawerSlice.actions;

export default toggleDrawerSlice.reducer;
