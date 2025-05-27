import { createSlice } from "@reduxjs/toolkit";

export interface Adsr {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const initialState: Adsr = {
  attack: 0.01,
  decay: 0.2,
  sustain: 0.5,
  release: 0.5,
};

export const adsrSlice = createSlice({
  name: "adsr",
  initialState,
  reducers: {
    changeAttack: (state, action) => {
      state.attack = action.payload;
    },
    changeDecay: (state, action) => {
      state.decay = action.payload;
    },
    changeSustain: (state, action) => {
      state.sustain = action.payload;
    },
    changeRelease: (state, action) => {
      state.release = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAttack, changeDecay, changeSustain, changeRelease } =
  adsrSlice.actions;

export default adsrSlice.reducer;
