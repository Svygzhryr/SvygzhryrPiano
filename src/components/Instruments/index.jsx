import React, { useState, useCallback, useEffect } from "react";
import { UPPER_NOTES, LOWER_NOTES } from "../../global/constants";
import * as Tone from "tone";
import { MdPiano } from "react-icons/md";
import { RiSoundModuleFill } from "react-icons/ri";
import styles from "./Instruments.module.scss";

export const Instruments = ({
  instruments,
  activeKeys,
  isInstrumentActive,
  setIsInstrumentActive,
  activeInstrument,
  setActiveInstrument,
  samplePitch,
}) => {
  // const { synth, monosynth, fmsynth, amsynth, membranesynth } = instruments;
  // let { sampler } = instruments;
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

  const equipSample = (event) => {
    // eslint-disable-next-line no-unused-expressions
    // event === undefined ? (event = currentFile) : null;
    handleInstruments("sampler", event.target);
    const sourceAux = URL.createObjectURL(event.target.files[0]);
    const extension = /.((wav)|(ogg)|(mp3))/gi;
    if (event.target.files[0].name.match(extension)) {
      setActiveSample(event.target.files[0].name);
      const sampleKey = "C" + samplePitch;
      // sampler = new Tone.Sampler({
      //   urls: {
      //     [sampleKey]: sourceAux,
      //   },
      // })
      // .connect(FXreverb)
      // .toDestination();
      // setActiveInstrument(sampler);
      resetSounds();
    } else alert("Only files with extentions (.mp3 .ogg .wav) are allowed.");
    // currentFile = event;
  };

  useEffect(() => {
    switch (switchInstrument) {
      default:
        return undefined;
      // case "synth": {
      //   setActiveInstrument(synth);
      //   break;
      // }
      // case "monosynth": {
      //   setActiveInstrument(monosynth);
      //   break;
      // }
      // case "fmsynth": {
      //   setActiveInstrument(fmsynth);
      //   break;
      // }
      // case "amsynth": {
      //   setActiveInstrument(amsynth);
      //   break;
      // }
      // case "membranesynth": {
      //   setActiveInstrument(membranesynth);
      //   break;
      // }
      // case "sampler": {
      //   setActiveInstrument(sampler);
      //   break;
      // }
    }
  }, []);

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
          <input onChange={equipSample} id="sample" type="file" />
        </label>
      </div>
    </>
  );
};
