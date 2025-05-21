import { RootState } from "./store";

export const volumeSelector = (state: RootState) => state.keyboard.volume;

export const reverbSelector = (state: RootState) => state.keyboard.reverb;

export const isReverbActiveSelector = (state: RootState) =>
  state.keyboard.isReverbActive;

export const instruments = (state: RootState) => state.keyboard.instruments;

export const isInstrumentActive = (state: RootState) =>
  state.keyboard.isInstrumentActive;

export const effectsSelector = (state: RootState) => state.keyboard.effects;

export const ADSRSelector = (state: RootState) => state.keyboard.ADSR;

export const themeSelector = (state: RootState) => state.theme.theme;
