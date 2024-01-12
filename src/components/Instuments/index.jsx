import React, { useState, useCallback } from "react";
import { instruments } from "../Keyboard";
import {
  UPPER_NOTES,
  LOWER_NOTES,
  NOTE_TO_KEY,
  KEY_TO_NOTE,
} from "../../global/constants";
import styles from "./Instruments.module.scss";

let activeSynth = "synth";

export const Instruments = ({ instruments, keyEnabledArray }) => {
  const { synth, monosynth, fmsynth, amsynth, membranesynth, sampler } =
    instruments;
  const [switchInstrument, setSwitchInstrument] = useState("synth");
  const [activeSample, setActiveSample] = useState("");
  const [instrument, setInstrument] = useState(false);

  const handleInstruments = (i, e) => {
    setSwitchInstrument(i);
    resetSounds();
    e.classList.add(".instrument_active");
  };

  const resetSounds = useCallback(() => {
    const buttons = document.querySelectorAll(`[note]`);
    buttons.forEach((e) => {
      e.classList.remove(styles.button_active);
      e.classList.remove(styles.button_sharp_active);
    });
    let all = [...UPPER_NOTES, ...LOWER_NOTES];
    activeSynth.triggerRelease(all);
  }, [activeSynth]);

  // const equipSample = (e) => {
  //   e === undefined ? (e = currentFile) : null;
  //   handleInstruments("sampler", e.target);
  //   sourceAux = URL.createObjectURL(e.target.files[0]);
  //   let regex = /.((wav)|(ogg)|(mp3))/gi;
  //   if (e.target.files[0].name.match(regex)) {
  //     setActiveSample(e.target.files[0].name);
  //     let sampleKey = "C" + samplePitch;
  //     sampler = new Tone.Sampler({
  //       urls: {
  //         [sampleKey]: sourceAux,
  //       },
  //     })
  //       .connect(FXreverb)
  //       .toDestination();
  //     activeSynth = sampler;
  //     resetSounds();
  //   } else alert("Only files with extentions (.mp3 .ogg .wav) are allowed.");
  //   currentFile = e;
  // };

  switch (switchInstrument) {
    default:
      return null;
    case "synth": {
      activeSynth = synth;
      break;
    }
    case "monosynth": {
      activeSynth = monosynth;
      break;
    }
    case "fmsynth": {
      activeSynth = fmsynth;
      break;
    }
    case "amsynth": {
      activeSynth = amsynth;
      break;
    }
    case "membranesynth": {
      activeSynth = membranesynth;
      break;
    }
    case "sampler": {
      activeSynth = sampler;
      break;
    }
  }

  return (
    <div
      className={`${styles.instruments} ${instrument ? styles.inactive : ""}`}
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
          switchInstrument === "membranesynth" ? styles.instrument_active : ""
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
        {/* <input onChange={equipSample} id="sample" type="file" /> */}
      </label>
    </div>
  );
};
