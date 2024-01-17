import React, { useState, useCallback } from "react";
import {
  UPPER_NOTES,
  LOWER_NOTES,
  NOTE_TO_KEY,
  KEY_TO_NOTE,
} from "../../global/constants";
import { MdPiano } from "react-icons/md";
import { RiSoundModuleFill } from "react-icons/ri";
import styles from "./Instruments.module.scss";

export const Instruments = ({
  instruments,
  keyEnabledArray,
  isInstrumentActive,
  setIsInstrumentActive,
  activeInstrument,
  setActiveInstrument,
}) => {
  const { synth, monosynth, fmsynth, amsynth, membranesynth, sampler } =
    instruments;
  const [switchInstrument, setSwitchInstrument] = useState("synth");
  const [activeSample, setActiveSample] = useState("");

  const handleInstruments = (i, e) => {
    setSwitchInstrument(i);
    resetSounds();
    e.classList.add(".instrumentActive");
  };

  const resetSounds = useCallback(() => {
    const buttons = document.querySelectorAll(`[note]`);
    buttons.forEach((e) => {
      e.classList.remove(styles.button_active);
      e.classList.remove(styles.button_sharp_active);
    });
    let all = [...UPPER_NOTES, ...LOWER_NOTES];
    activeInstrument.triggerRelease(all);
  }, [activeInstrument]);

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
      setActiveInstrument(synth);
      break;
    }
    case "monosynth": {
      setActiveInstrument(monosynth);
      break;
    }
    case "fmsynth": {
      setActiveInstrument(fmsynth);
      break;
    }
    case "amsynth": {
      setActiveInstrument(amsynth);
      break;
    }
    case "membranesynth": {
      setActiveInstrument(membranesynth);
      break;
    }
    case "sampler": {
      setActiveInstrument(sampler);
      break;
    }
  }

  return (
    <>
      <button
        className={styles.instrumentSwitch}
        onClick={() => {
          setIsInstrumentActive(!isInstrumentActive);
        }}
      >
        {isInstrumentActive ? <MdPiano /> : <RiSoundModuleFill />}
      </button>
      <div
        className={`${styles.instruments} ${
          isInstrumentActive ? styles.inactive : ""
        }`}
      >
        <button
          onClick={(e) => {
            handleInstruments("synth", e.target);
          }}
          className={`${styles.instrumentItem} ${
            switchInstrument === "synth" ? styles.instrumentActive : ""
          }`}
        >
          Synth
        </button>
        <button
          onClick={(e) => {
            handleInstruments("monosynth", e.target);
          }}
          className={`${styles.instrumentItem} ${
            switchInstrument === "monosynth" ? styles.instrumentActive : ""
          }`}
        >
          MonoSynth
        </button>
        <button
          onClick={(e) => {
            handleInstruments("fmsynth", e.target);
          }}
          className={`${styles.instrumentItem}  ${
            switchInstrument === "fmsynth" ? styles.instrumentActive : ""
          }`}
        >
          FMSynth
        </button>
        <button
          onClick={(e) => {
            handleInstruments("amsynth", e.target);
          }}
          className={`${styles.instrumentItem}  ${
            switchInstrument === "amsynth" ? styles.instrumentActive : ""
          }`}
        >
          AMSynth
        </button>
        <button
          onClick={(e) => {
            handleInstruments("membranesynth", e.target);
          }}
          className={`${styles.instrumentItem} ${
            switchInstrument === "membranesynth" ? styles.instrumentActive : ""
          }`}
        >
          MemSynth
        </button>
        <label
          htmlFor="sample"
          className={`${styles.instrumentItem} ${styles.inputLabel} ${
            switchInstrument === "sampler" ? styles.instrumentActive : ""
          }`}
        >
          Sampler
          <br />
          {activeSample !== "" ? activeSample : ".mp3/.wav/.ogg files"}
          {/* <input onChange={equipSample} id="sample" type="file" /> */}
        </label>
      </div>
    </>
  );
};
