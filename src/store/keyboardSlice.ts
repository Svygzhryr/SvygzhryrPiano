import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import sample2 from "../samples/harp.wav";

import * as Tone from "tone";

export interface ADSR {
  attack: number;
  sustain: number;
  decay: number;
  release: number;
}

export interface Effects {
  fxDetune: number;
  fxHold: boolean;
  fxReverb: number;
  samplePitch: number;
  waveShape: string;
}

export interface Instruments {
  synth: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;
  monosynth: Tone.PolySynth<Tone.MonoSynth>;
  fmsynth: Tone.PolySynth<Tone.FMSynth>;
  amsynth: Tone.PolySynth<Tone.AMSynth>;
  membranesynth: Tone.PolySynth<Tone.MembraneSynth>;
  sampler: Tone.Sampler;
}

export interface KeyboardState {
  volume: number;
  activeKeys: number[];
  showText: boolean;
  isInstrumentActive: boolean;
  instruments: Instruments;
  effects: Effects;
  ADSR: ADSR;
}

const initialState: KeyboardState = {
  volume: +(localStorage.getItem("volume") ?? 0),
  activeKeys: Array(222).fill(true),
  showText: true,
  isInstrumentActive: false,
  instruments: {
    synth: new Tone.PolySynth(Tone.Synth).toDestination(),
    monosynth: new Tone.PolySynth(Tone.MonoSynth).toDestination(),
    fmsynth: new Tone.PolySynth(Tone.FMSynth).toDestination(),
    amsynth: new Tone.PolySynth(Tone.AMSynth).toDestination(),
    membranesynth: new Tone.PolySynth(Tone.MembraneSynth).toDestination(),
    sampler: new Tone.Sampler({
      urls: {
        A3: sample2,
      },
    }).toDestination(),
  },
  effects: {
    fxDetune: 1200,
    fxHold: true,
    fxReverb: 0.1,
    samplePitch: 2,
    waveShape: "sine",
  },
  ADSR: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0.5,
    release: 0.5,
  },
};

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    volumeUp: (state) => {
      state.volume++;
    },
    volumeDown: (state) => {
      state.volume--;
    },
  },
});

// Action creators are generated for each case reducer function
export const { volumeUp, volumeDown } = keyboardSlice.actions;

export default keyboardSlice.reducer;
