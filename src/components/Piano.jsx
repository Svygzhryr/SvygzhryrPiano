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
import sample2 from "../samples/harp.wav";
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
let keyEnabledArray = Array(222).fill(true);
export default function Piano() {
  const [reverb, setReverb] = useState(0.001);
  const [delayDuration, setDelayDuration] = useState(0);
  const [delayFeedback, setDelayFeedback] = useState(0);
  const [detune, setDetune] = useState(1200);
  const [instrument, setInstrument] = useState(false);
  const [switchInstrument, setSwitchInstrument] = useState("synth");
  const [attack, setAttack] = useState(0.01);
  const [decay, setDecay] = useState(0.5);
  const [sustain, setSustain] = useState(0.5);
  const [release, setRelease] = useState(0.5);
  const [hold, setHold] = useState("false");
  const [activeSample, setActiveSample] = useState("");
  const [waveShape, setWaveShape] = useState("sine");
  const [loading, setLoading] = useState(true);
  const [samplePitch, setSamplePitch] = useState(2);

  const handleInstruments = (i, e) => {
    setSwitchInstrument(i);
    resetSounds();
    e.classList.add(".instrument_active");
  };

  const debounceReverb = debounce((reverb) => handleReverb(reverb), 300);
  const handleReverb = (reverb) => {
    setReverb(reverb);
    FXreverb.decay = reverb;
  };

  const handleKeyDown = (e) => {
    const code = e.which;
    extraBindings(code);

    if (keyEnabledArray[e.keyCode]) {
      keyEnabledArray[e.keyCode] = false;

      const shittySharp = CSS.escape(KEY_TO_NOTE[code]);
      const button = document.querySelector(`[note=${shittySharp}]`);

      try {
        button.classList.contains(styles.button)
          ? button.classList.add(styles.button_active)
          : button.classList.add(styles.button_sharp_active);
      } catch {
        return null;
      }
      playNote(KEY_TO_NOTE[code]);
    }
  };

  const extraBindings = (code) => {
    switch (code) {
      default:
        return null;
      case 61: {
        +volume < 20 ? setVolume(+volume + 1) : null;
        break;
      }
      case 173: {
        +volume > -30 ? setVolume(+volume - 1) : null;
        break;
      }
    }
  };

  async function playNote(note) {
    if (note === undefined) {
    }

    activeSynth.volume.value = volume;
    hold
      ? activeSynth.triggerAttack(note)
      : activeSynth === sampler
      ? activeSynth.triggerAttackRelease(note)
      : activeSynth.triggerAttackRelease(note, "8n");
  }

  const handleKeyUp = (e) => {
    const code = e.which;
    const shittySharp = CSS.escape(KEY_TO_NOTE[code]);

    hold ? activeSynth.triggerRelease(KEY_TO_NOTE[code]) : null;

    const button = document.querySelector(`[note=${shittySharp}]`);
    try {
      button.classList.contains(styles.button_active)
        ? button.classList.remove(styles.button_active)
        : button.classList.remove(styles.button_sharp_active);
    } catch {
      return null;
    }
    keyEnabledArray[e.keyCode] = true;
  };

  const handleMouseDown = (e) => {
    let note = e.target.getAttribute("note");
    let shittynote = CSS.escape(note);

    const button = document.querySelector(`[note=${shittynote}]`);

    if (true) {
      try {
        button.classList.contains(styles.button)
          ? button.classList.add(styles.button_active)
          : button.classList.add(styles.button_sharp_active);
      } catch {
        return null;
      }

      if (note === undefined) {
        return;
      }

      activeSynth.volume.value = volume;
      hold
        ? activeSynth.triggerAttack(note)
        : activeSynth === sampler
        ? activeSynth.triggerAttackRelease(note)
        : activeSynth.triggerAttackRelease(note, "8n");
    }
  };

  const handleMouseUp = (e) => {
    let note = e.target.getAttribute("note");
    hold ? activeSynth.triggerRelease(note) : null;
    let shittynote = CSS.escape(note);
    const button = document.querySelector(`[note=${shittynote}]`);
    try {
      button.classList.contains(styles.button_active)
        ? button.classList.remove(styles.button_active)
        : button.classList.remove(styles.button_sharp_active);
    } catch {
      return null;
    }
  };

  const resetSounds = () => {
    const buttons = document.querySelectorAll(`[note]`);
    buttons.forEach((e) => {
      e.classList.remove(styles.button_active);
      e.classList.remove(styles.button_sharp_active);
    });
    let all = [...UPPER_NOTES, ...LOWER_NOTES];
    activeSynth.triggerRelease(all);
  };

  const downFunc = (e) => {
    handleMouseDown(e);
    window.addEventListener("mouseover", handleMouseDown);
  };
  const upFunc = (e) => {
    window.removeEventListener("mouseover", handleMouseDown);
    window.removeEventListener("mousedown", handleMouseDown);
    handleMouseUp(e);
  };
  const outFunc = (e) => {
    handleMouseUp(e);
  };

  useEffect(() => {
    setLoading(true);
    ToneAudioBuffer.loaded(setLoading(false));
    return () => {};
  }, []);

  useEffect(() => {
    if (!loading) {
      window.addEventListener(
        "contextmenu",
        function (evt) {
          evt.preventDefault();
        },
        false
      );
      window.addEventListener("keydown", handleKeyDown, false);
      window.addEventListener("keyup", handleKeyUp, false);
      window.addEventListener("blur", resetSounds);

      window.addEventListener("mousedown", downFunc);
      window.addEventListener("mouseup", upFunc);
      window.addEventListener("mouseout", outFunc);
    }

    altEquip();

    setShowText(JSON.parse(localStorage.getItem("text")));
    activeSynth.set({
      detune: detune,

      oscillator: {
        type: waveShape,
      },

      envelope: {
        attack: attack,
        decay: decay,
        sustain: sustain,
        release: release,
      },
    });
    return () => {
      window.removeEventListener(
        "contextmenu",
        function (evt) {
          evt.preventDefault();
        },
        false
      );
      window.removeEventListener("keydown", handleKeyDown, false);
      window.removeEventListener("keyup", handleKeyUp, false);
      window.removeEventListener("blur", resetSounds);

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseDown);

      window.removeEventListener("mousedown", downFunc);
      window.removeEventListener("mouseup", upFunc);
      window.removeEventListener("mouseout", outFunc);
    };
  }, [
    handleKeyDown,
    handleKeyUp,
    detune,
    handleMouseDown,
    handleMouseUp,
    resetSounds,
    downFunc,
    upFunc,
    outFunc,
    loading,
    waveShape,
    attack,
    decay,
    sustain,
    release,
  ]);

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

  const changeVolume = (volume) => {
    setVolume(volume);
    localStorage.setItem("volume", volume);
    resetSounds();
  };

  const altEquip = () => {
    let sampleKey = "C" + samplePitch;
    sampler = new Tone.Sampler({
      urls: {
        [sampleKey]: sourceAux,
      },
    })
      .connect(FXreverb)
      .toDestination();
  };

  const equipSample = (e) => {
    e === undefined ? (e = currentFile) : null;
    handleInstruments("sampler", e.target);
    sourceAux = URL.createObjectURL(e.target.files[0]);
    let regex = /.((wav)|(ogg)|(mp3))/gi;
    if (e.target.files[0].name.match(regex)) {
      setActiveSample(e.target.files[0].name);
      let sampleKey = "C" + samplePitch;
      sampler = new Tone.Sampler({
        urls: {
          [sampleKey]: sourceAux,
        },
      })
        .connect(FXreverb)
        .toDestination();
      activeSynth = sampler;
      resetSounds();
    } else alert("Only files with extentions (.mp3 .ogg .wav) are allowed.");
    currentFile = e;
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
