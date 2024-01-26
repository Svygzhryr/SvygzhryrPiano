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
  isInstrumentActive,
  instruments,
  activeKeys,
  volume,
  showText,
  setShowText,
  activeInstrument,
  effects,
}) => {
  const { sampler } = instruments;
  let keyClassName;

  const [pressedKeys, setPressedKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  const resetSounds = useCallback(() => {
    const buttons = document.querySelectorAll(`[note]`);
    buttons.forEach((button) => {
      button.classList.remove(styles.button_active);
      button.classList.remove(styles.button_sharp_active);
    });

    const allButtons = [...UPPER_NOTES, ...LOWER_NOTES];
    activeInstrument.triggerRelease(allButtons);
  }, [activeInstrument]);

  const playNote = useCallback(
    async (note) => {
      if (note === undefined) {
      }
      activeInstrument.volume.value = volume;
      effects.fxHold
        ? activeInstrument.triggerAttack(note)
        : activeInstrument === sampler
        ? activeInstrument.triggerAttackRelease(note)
        : activeInstrument.triggerAttackRelease(note, "8n");
    },
    [activeInstrument, effects.fxHold, volume]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const code = e.keyCode;
      // e.preventDefault();
      // extraBindings(code);
      if (activeKeys[code]) {
        activeKeys[code] = false;
        // setActiveKeys([...activeKeys]);

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
      const code = e.keyCode;
      const shittySharp = CSS.escape(KEY_TO_NOTE[code]);

      if (effects.fxHold) {
        activeInstrument.triggerRelease(KEY_TO_NOTE[code]);
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
      // setActiveKeys([...activeKeys, (activeKeys[e.keycode] = true)]);
    },
    [activeInstrument, effects.fxHold, activeKeys]
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

        activeInstrument.volume.value = volume;
        effects.fxHold
          ? activeInstrument.triggerAttack(note)
          : activeInstrument === sampler
          ? activeInstrument.triggerAttackRelease(note)
          : activeInstrument.triggerAttackRelease(note, "8n");
      }
    },
    [activeInstrument, effects.fxHold, volume]
  );

  const handleMouseUp = useCallback(
    (e) => {
      let note = e.target.getAttribute("note");
      if (effects.fxHold && note) {
        activeInstrument?.triggerRelease(note);
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
    [activeInstrument, effects.fxHold]
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

    setShowText(JSON.parse(localStorage.getItem("text")));

    activeInstrument?.set({
      detune: effects.fxDetune,

      oscillator: {
        type: effects.waveShape,
      },

      // envelope: {
      //   attack: attack,
      //   decay: decay,
      //   sustain: sustain,
      //   release: release,
      // },
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
    effects,
    handleMouseDown,
    handleMouseUp,
    resetSounds,
    downFunc,
    upFunc,
    outFunc,
    loading,
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
              isInstrumentActive ? "" : styles.inactive
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
