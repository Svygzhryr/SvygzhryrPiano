import { useState, useEffect } from "react";
import {
  UPPER_NOTES,
  LOWER_NOTES,
  NOTE_TO_KEY,
  KEY_TO_NOTE,
} from "../../global/constants";
import * as Tone from "tone";
import { ToneAudioBuffer } from "tone";
import sample2 from "../../samples/harp.wav";
import styles from "./Keyboard.module.scss";
import { useCallback } from "react";

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
let keyEnabledArray = Array(222).fill(true);

export const Keyboard = () => {
  let keyClassName,
    activeSynth = synth;

  const [showText, setShowText] = useState(false);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 0);
  const [hold, setHold] = useState("false");
  const [loading, setLoading] = useState(true);
  // const [switchInstrument, setSwitchInstrument] = useState("synth");

  // switch (switchInstrument) {
  //   default:
  //     return null;
  //   case "synth": {
  //     activeSynth = synth;
  //     break;
  //   }
  //   case "monosynth": {
  //     activeSynth = monosynth;
  //     break;
  //   }
  //   case "fmsynth": {
  //     activeSynth = fmsynth;
  //     break;
  //   }
  //   case "amsynth": {
  //     activeSynth = amsynth;
  //     break;
  //   }
  //   case "membranesynth": {
  //     activeSynth = membranesynth;
  //     break;
  //   }
  //   case "sampler": {
  //     activeSynth = sampler;
  //     break;
  //   }
  // }

  const resetSounds = useCallback(() => {
    const buttons = document.querySelectorAll(`[note]`);
    buttons.forEach((e) => {
      e.classList.remove(styles.button_active);
      e.classList.remove(styles.button_sharp_active);
    });
    let all = [...UPPER_NOTES, ...LOWER_NOTES];
    activeSynth.triggerRelease(all);
  }, [activeSynth]);

  const changeVolume = (volume) => {
    setVolume(volume);
    localStorage.setItem("volume", volume);
    resetSounds();
  };

  const extraBindings = useCallback(
    (code) => {
      switch (code) {
        default:
          return null;
        case 61: {
          if (+volume < 20) {
            setVolume(+volume + 1);
          }
          break;
        }
        case 173: {
          if (+volume > -30) {
            setVolume(+volume - 1);
          }
          break;
        }
      }
    },
    [volume]
  );

  const playNote = useCallback(
    async (note) => {
      if (note === undefined) {
      }

      activeSynth.volume.value = volume;
      hold
        ? activeSynth.triggerAttack(note)
        : activeSynth === sampler
        ? activeSynth.triggerAttackRelease(note)
        : activeSynth.triggerAttackRelease(note, "8n");
    },
    [activeSynth, hold, volume]
  );

  const handleKeyDown = useCallback(
    (e) => {
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
    },
    [extraBindings, playNote]
  );

  const handleKeyUp = useCallback(
    (e) => {
      const code = e.which;
      const shittySharp = CSS.escape(KEY_TO_NOTE[code]);

      if (hold) {
        activeSynth.triggerRelease(KEY_TO_NOTE[code]);
      }

      const button = document.querySelector(`[note=${shittySharp}]`);
      try {
        button.classList.contains(styles.button_active)
          ? button.classList.remove(styles.button_active)
          : button.classList.remove(styles.button_sharp_active);
      } catch {
        return null;
      }
      keyEnabledArray[e.keyCode] = true;
    },
    [activeSynth, hold]
  );

  const handleMouseDown = useCallback(
    (e) => {
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
    },
    [activeSynth, hold, volume]
  );

  const handleMouseUp = useCallback(
    (e) => {
      let note = e.target.getAttribute("note");
      if (hold) {
        activeSynth.triggerRelease(note);
      }
      let shittynote = CSS.escape(note);
      const button = document.querySelector(`[note=${shittynote}]`);
      try {
        button.classList.contains(styles.button_active)
          ? button.classList.remove(styles.button_active)
          : button.classList.remove(styles.button_sharp_active);
      } catch {
        return null;
      }
    },
    [activeSynth, hold]
  );

  const downFunc = useCallback(
    (e) => {
      handleMouseDown(e);
      window.addEventListener("mouseover", handleMouseDown);
    },
    [handleMouseDown]
  );

  const upFunc = useCallback(
    (e) => {
      window.removeEventListener("mouseover", handleMouseDown);
      window.removeEventListener("mousedown", handleMouseDown);
      handleMouseUp(e);
    },
    [handleMouseDown, handleMouseUp]
  );

  const outFunc = useCallback(
    (e) => {
      handleMouseUp(e);
    },
    [handleMouseUp]
  );

  // const altEquip = () => {
  //   let sampleKey = "C" + samplePitch;
  //   sampler = new Tone.Sampler({
  //     urls: {
  //       [sampleKey]: sourceAux,
  //     },
  //   })
  //     .connect(FXreverb)
  //     .toDestination();
  // };

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

    // altEquip();

    setShowText(JSON.parse(localStorage.getItem("text")));
    // activeSynth.set({
    //   detune: detune,

    //   oscillator: {
    //     type: waveShape,
    //   },

    //   envelope: {
    //     attack: attack,
    //     decay: decay,
    //     sustain: sustain,
    //     release: release,
    //   },
    // });
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
    // detune,
    handleMouseDown,
    handleMouseUp,
    resetSounds,
    downFunc,
    upFunc,
    outFunc,
    loading,
    // waveShape,
    // attack,
    // decay,
    // sustain,
    // release,
  ]);

  const upperKeys = UPPER_NOTES.map((note, index) => {
    const generateText = (note) => {
      return showText ? NOTE_TO_KEY[note] : null;
    };

    if (
      note.length > 2
        ? (keyClassName = styles.button_sharp)
        : (keyClassName = styles.button)
    )
      return (
        <button
          tabIndex="-1"
          key={index}
          note={note}
          className={keyClassName}
          pressedkeys={pressedKeys}
          volume={volume}
        >
          {generateText(note)}
        </button>
      );
  });

  const lowerKeys = LOWER_NOTES.map((note, index) => {
    const generateText = (note) => {
      return showText ? NOTE_TO_KEY[note] : null;
    };

    if (
      note.length > 2
        ? (keyClassName = styles.button_sharp)
        : (keyClassName = styles.button)
    )
      return (
        <button
          tabIndex="-1"
          key={index}
          note={note}
          className={keyClassName}
          pressedkey={pressedKeys}
          volume={volume}
        >
          {generateText(note)}
        </button>
      );
  });

  return (
    <div
      className={`${styles.piano_wrapper} ${styles.active} ${
        null
        // instrument ? "" : styles.inactive
      }`}
    >
      <div className={styles.upper_keyboard}>
        <div className={styles.upper_buttons}>{upperKeys}</div>
      </div>

      <div className={styles.lower_keyboard}>
        <div className={styles.lower_buttons}>{lowerKeys}</div>
      </div>
    </div>
  );
};
