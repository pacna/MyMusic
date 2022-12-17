// Third party
import { createSlice, Slice } from "@reduxjs/toolkit";

export const toggleSearchSlice: Slice<
    {
        value: boolean;
    },
    {
        openSearch: (state: { value: boolean }) => void;
        closeSearch: (state: { value: boolean }) => void;
    },
    "toggleSearch"
> = createSlice({
    name: "toggleSearch",
    initialState: { value: false },
    reducers: {
        openSearch: (state: { value: boolean }): void => {
            state.value = true;
        },
        closeSearch: (state: { value: boolean }): void => {
            state.value = false;
        },
    },
});

export const { openSearch, closeSearch } = toggleSearchSlice.actions;

export default toggleSearchSlice.reducer;
