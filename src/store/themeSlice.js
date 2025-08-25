// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  // check localStorage or system preference
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", state.mode === "dark");
      localStorage.setItem("theme", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      document.documentElement.classList.toggle("dark", state.mode === "dark");
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
