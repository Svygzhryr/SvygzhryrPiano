/* eslint-disable no-unused-expressions */
import { React, useState, useEffect } from "react";
import * as Tone from "tone";
import styles from "../styles/piano.module.scss";
import {
  UPPER_NOTES,
  LOWER_NOTES,
  KEY_TO_NOTE,
  NOTE_TO_KEY,
} from "../global/constants";
import UI from "./UI";
import debounce from "lodash/debounce";
import { ToneAudioBuffer } from "tone";
import Instruments from "./Instruments";

Tone.context.lookAhead = 0.02;

let FXreverb = new Tone.Reverb(0.1).toDestination();
// let FXdelay = new Tone.FeedbackDelay("6n", 0.2).toDestination();
// let detune;

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

const instruments = [
  synth,
  monosynth,
  fmsynth,
  amsynth,
  membranesynth,
  sampler,
];
instruments.forEach((e) => {
  e.set({
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
let currentFile = sample2;
let activeSynth;
let sourceAux;
export default function Piano() {
  const [reverb, setReverb] = useState(0.001);
  const [delayDuration, setDelayDuration] = useState(0);
  const [delayFeedback, setDelayFeedback] = useState(0);
  const [detune, setDetune] = useState(1200);
  const [instrument, setInstrument] = useState(false);
  const [attack, setAttack] = useState(0.01);
  const [decay, setDecay] = useState(0.5);
  const [sustain, setSustain] = useState(0.5);
  const [release, setRelease] = useState(0.5);
  const [waveShape, setWaveShape] = useState("sine");
  const [samplePitch, setSamplePitch] = useState(2);

  const debounceReverb = debounce((reverb) => handleReverb(reverb), 300);
  const handleReverb = (reverb) => {
    setReverb(reverb);
    FXreverb.decay = reverb;
  };

  const UIprops = {
    activeSynth,
    volume,
    changeVolume,
    showText,
    setShowText,
    reverb,
    FXreverb,
    debounceReverb,
    delayDuration,
    delayFeedback,
    detune,
    setDetune,
    instrument,
    setInstrument,
    attack,
    decay,
    sustain,
    release,
    setAttack,
    setDecay,
    setSustain,
    setRelease,
    waveShape,
    setWaveShape,
    hold,
    setHold,
    samplePitch,
    setSamplePitch,
    equipSample,
    sourceAux,
    sampler,
  };

  return (
    <div className={styles.piano}>
      {loading ? (
        <div className={styles.loader}>
          <div className={styles.loader_inside}></div>
        </div>
      ) : (
        <div>
          <UI {...UIprops} />
          <div
            className={`${styles.instruments} ${
              instrument ? styles.inactive : ""
            }`}
          >
            <button
              onClick={(e) => {
                handleInstruments("synth", e.target);
              }}
              className={`${styles.instrument_item} ${
                switchInstrument === "synth" ? styles.instrument_active : ""
              }`}
            >
              Synth
            </button>
            <button
              onClick={(e) => {
                handleInstruments("monosynth", e.target);
              }}
              className={`${styles.instrument_item} ${
                switchInstrument === "monosynth" ? styles.instrument_active : ""
              }`}
            >
              MonoSynth
            </button>
            <button
              onClick={(e) => {
                handleInstruments("fmsynth", e.target);
              }}
              className={`${styles.instrument_item}  ${
                switchInstrument === "fmsynth" ? styles.instrument_active : ""
              }`}
            >
              FMSynth
            </button>
            <button
              onClick={(e) => {
                handleInstruments("amsynth", e.target);
              }}
              className={`${styles.instrument_item}  ${
                switchInstrument === "amsynth" ? styles.instrument_active : ""
              }`}
            >
              AMSynth
            </button>
            <button
              onClick={(e) => {
                handleInstruments("membranesynth", e.target);
              }}
              className={`${styles.instrument_item} ${
                switchInstrument === "membranesynth"
                  ? styles.instrument_active
                  : ""
              }`}
            >
              MemSynth
            </button>
            <label
              htmlFor="sample"
              className={`${styles.instrument_item} ${styles.input_label} ${
                switchInstrument === "sampler" ? styles.instrument_active : ""
              }`}
            >
              Sampler
              <br />
              {activeSample !== "" ? activeSample : ".mp3/.wav/.ogg files"}
              <input onChange={equipSample} id="sample" type="file" />
            </label>
          </div>

          <Instruments />
        </div>
      )}
    </div>
  );
}
