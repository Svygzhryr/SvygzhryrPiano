import { RootState } from "./store";
// keyboard
export const volumeSelector = (state: RootState) => state.keyboard.volume;

export const reverbSelector = (state: RootState) => state.keyboard.reverb;

export const isReverbActiveSelector = (state: RootState) =>
  state.keyboard.isReverbActive;

export const instruments = (state: RootState) => state.keyboard.instruments;

export const isInstrumentActive = (state: RootState) =>
  state.keyboard.isInstrumentActive;

export const effectsSelector = (state: RootState) => state.keyboard.effects;
// theme
export const themeSelector = (state: RootState) => state.theme.theme;
// adsr
export const attackSelector = (state: RootState) => state.adsr.attack;

export const decaySelector = (state: RootState) => state.adsr.decay;

export const sustainSelector = (state: RootState) => state.adsr.sustain;

export const releaseSelector = (state: RootState) => state.adsr.release;
