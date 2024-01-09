import { useState } from "react";
import { UPPER_NOTES, LOWER_NOTES, NOTE_TO_KEY } from "../../global/constants";
import styles from "./Keyboard.module.scss";

export const Keyboard = () => {
  let keyClassName;
  const [showText, setShowText] = useState(false);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 0);

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
