import { createSlice } from "@reduxjs/toolkit";
import { setThemeAction } from "./themeActions";
const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: localStorage.getItem("theme") || "dark",
    },
    reducers: {
        setTheme: setThemeAction,
    },
})

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;