import * as Tone from "tone";
import { Keyboard } from "../Keyboard";
import sample2 from "../../samples/harp.wav";
import "../../styles/app.scss";

export const App = () => {
  Tone.context.lookAhead = 0.02;

  let FXreverb = new Tone.Reverb(0.1).toDestination();

  let synth = new Tone.PolySynth(Tone.Synth).connect(FXreverb).toDestination();
  let monosynth = new Tone.PolySynth(Tone.MonoSynth)
    .connect(FXreverb)
    .toDestination();
  let fmsynth = new Tone.PolySynth(Tone.FMSynth)
    .connect(FXreverb)
    .toDestination();
  let amsynth = new Tone.PolySynth(Tone.AMSynth)
    .connect(FXreverb)
    .toDestination();
  let membranesynth = new Tone.PolySynth(Tone.MembraneSynth)
    .connect(FXreverb)
    .toDestination();

  let sampler = new Tone.Sampler({
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

  let keyEnabledArray = Array(222).fill(true);

  const props = { instruments, keyEnabledArray };

  return (
    <div className="app">
      <Keyboard {...props} />
    </div>
  );
};
