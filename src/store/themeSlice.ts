import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: "black" | "purple" | "red" | "blue";
}

const initialState: ThemeState = {
  theme: "black",
};

export const themeSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
