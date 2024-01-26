import React, { useState, useCallback, useEffect } from "react";
import * as Tone from "tone";
import { UPPER_NOTES, LOWER_NOTES } from "../../global/constants";
import { MdPiano } from "react-icons/md";
import { RiSoundModuleFill } from "react-icons/ri";
import styles from "./Instruments.module.scss";
import { sample } from "lodash";

export const Instruments = ({
  instruments,
  setInstruments,
  activeKeys,
  isInstrumentActive,
  setIsInstrumentActive,
  activeInstrument,
  setActiveInstrument,
  fxReverb,
  effects,
}) => {
  const { synth, monosynth, fmsynth, amsynth, membranesynth } = instruments;
  let { sampler } = instruments;
  const [activeSample, setActiveSample] = useState(null);

  // const handleInstruments = (i, e) => {
  //   resetSounds();
  //   e.classList.add(".instrumentActive");
  // };

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
    const sourceAux = URL.createObjectURL(event.target.files[0]);
    const extension = /.((wav)|(ogg)|(mp3))/gi;
    if (event.target.files[0].name.match(extension)) {
      setActiveSample(event.target.files[0]);
      const sampleKey = "C" + effects.samplePitch;
      const newSampler = new Tone.Sampler({
        urls: {
          [sampleKey]: sourceAux,
        },
      })
        .connect(fxReverb)
        .toDestination();
      setInstruments({ ...instruments, sampler: newSampler });
      setActiveInstrument(newSampler);
      resetSounds();
    } else alert("Only files with extentions (.mp3 .ogg .wav) are allowed.");
    // currentFile = event;
  };

  useEffect(() => {
    const sampleKey = "C" + effects.samplePitch;
    const newSampler = new Tone.Sampler({
      urls: {
        [sampleKey]: URL.createObjectURL(activeSample),
      },
    });
  }, [effects.samplePitch]);

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
          onClick={() => setActiveInstrument(synth)}
          className={`${styles.instrumentItem} ${
            activeInstrument === synth ? styles.instrumentActive : ""
          }`}
        >
          Synth
        </button>
        <button
          onClick={() => setActiveInstrument(monosynth)}
          className={`${styles.instrumentItem} ${
            activeInstrument === monosynth ? styles.instrumentActive : ""
          }`}
        >
          MonoSynth
        </button>
        <button
          onClick={() => setActiveInstrument(fmsynth)}
          className={`${styles.instrumentItem}  ${
            activeInstrument === fmsynth ? styles.instrumentActive : ""
          }`}
        >
          FMSynth
        </button>
        <button
          onClick={() => setActiveInstrument(amsynth)}
          className={`${styles.instrumentItem}  ${
            activeInstrument === amsynth ? styles.instrumentActive : ""
          }`}
        >
          AMSynth
        </button>
        <button
          onClick={() => setActiveInstrument(membranesynth)}
          className={`${styles.instrumentItem} ${
            activeInstrument === membranesynth ? styles.instrumentActive : ""
          }`}
        >
          MemSynth
        </button>
        <label
          htmlFor="sample"
          className={`${styles.instrumentItem} ${styles.inputLabel} ${
            activeInstrument === sampler ? styles.instrumentActive : ""
          }`}
        >
          Sampler
          <br />
          {activeSample ? activeSample : ".mp3/.wav/.ogg files"}
          <input onChange={equipSample} id="sample" type="file" />
        </label>
      </div>
    </>
  );
};
