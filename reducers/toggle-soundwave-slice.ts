import { createSlice, Slice } from "@reduxjs/toolkit";

export const toggleSoundWaveSlice: Slice<
  {
    value: boolean;
  },
  {
    showSoundWave: (state: { value: boolean }) => void;
    hideSoundWave: (state: { value: boolean }) => void;
  },
  "toggleSoundWave"
> = createSlice({
  name: "toggleSoundWave",
  initialState: { value: false },
  reducers: {
    showSoundWave: (state: { value: boolean }): void => {
      state.value = true;
    },
    hideSoundWave: (state: { value: boolean }): void => {
      state.value = false;
    },
  },
});

export const { showSoundWave, hideSoundWave } = toggleSoundWaveSlice.actions;

export default toggleSoundWaveSlice.reducer;
