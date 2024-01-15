import { useState } from "react";
import * as Tone from "tone";
import { Keyboard } from "../Keyboard";
import sample2 from "../../samples/harp.wav";
import "../../styles/app.scss";
import { VolumeSlider } from "../VolumeSlider";

Tone.context.lookAhead = 0.02;

const FXreverb = new Tone.Reverb(0.1).toDestination();

const synth = new Tone.PolySynth(Tone.Synth).connect(FXreverb).toDestination();
const monosynth = new Tone.PolySynth(Tone.MonoSynth)
  .connect(FXreverb)
  .toDestination();
const fmsynth = new Tone.PolySynth(Tone.FMSynth)
  .connect(FXreverb)
  .toDestination();
const amsynth = new Tone.PolySynth(Tone.AMSynth)
  .connect(FXreverb)
  .toDestination();
const membranesynth = new Tone.PolySynth(Tone.MembraneSynth)
  .connect(FXreverb)
  .toDestination();

const sampler = new Tone.Sampler({
  urls: {
    A3: sample2,
  },
})
  .connect(FXreverb)
  .toDestination();

const instruments = {
  synth,
  monosynth,
  fmsynth,
  amsynth,
  membranesynth,
  sampler,
};

Object.values(instruments).forEach((instrument) => {
  instrument.set({
    oscillator: {
      type: "sine",
    },

    detune: 1200,
    // portamento: Seconds;
    // onsilence: onSilenceCallback;

    envelope: {
      atatck: 0.01,
      sustain: 0.5,
      decay: 0.5,
      release: 0.5,
    },
  });
});

Tone.start();

let activeKeys = Array(222).fill(true);

export const App = () => {
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 0);
  const props = { instruments, activeKeys, volume };

  return (
    <div className="app">
      <Keyboard {...props} />
      <VolumeSlider volume={volume} setVolume={setVolume} />
    </div>
  );
};
