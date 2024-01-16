import { useState, useEffect } from "react";
import {
  UPPER_NOTES,
  LOWER_NOTES,
  NOTE_TO_KEY,
  KEY_TO_NOTE,
} from "../../global/constants";
import { ToneAudioBuffer } from "tone";
import { useCallback } from "react";
import styles from "./Keyboard.module.scss";

export const Keyboard = ({
  instruments,
  activeKeys,
  volume,
  showText,
  setShowText,
}) => {
  const { synth, sampler } = instruments;
  const instrument = false;
  let keyClassName,
    activeSynth = synth;

  const [pressedKeys, setPressedKeys] = useState([]);
  const [hold, setHold] = useState("false");
  const [loading, setLoading] = useState(true);

  const resetSounds = useCallback(() => {
    const buttons = document.querySelectorAll(`[note]`);
    buttons.forEach((button) => {
      button.classList.remove(styles.button_active);
      button.classList.remove(styles.button_sharp_active);
    });

    const allButtons = [...UPPER_NOTES, ...LOWER_NOTES];
    activeSynth.triggerRelease(allButtons);
  }, [activeSynth]);

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
      // extraBindings(code);

      if (activeKeys[e.keyCode]) {
        activeKeys[e.keyCode] = false;

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
    [playNote, activeKeys]
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
      activeKeys[e.keyCode] = true;
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
    <div className={styles.piano}>
      {loading ? (
        <div className={styles.loader}>
          <div className={styles.loader_inside}></div>
        </div>
      ) : (
        <div>
          <div
            className={`${styles.piano_wrapper} ${styles.active} ${
              instrument ? "" : styles.inactive
            }`}
          >
            <div className={styles.upper_keyboard}>
              <div className={styles.upper_buttons}>{upperKeys}</div>
            </div>

            <div className={styles.lower_keyboard}>
              <div className={styles.lower_buttons}>{lowerKeys}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
