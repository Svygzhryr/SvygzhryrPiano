import { useCallback } from "react";
import styles from "./VolumeSlider.module.scss";
import { UPPER_NOTES, LOWER_NOTES } from "../../global/constants";

export const VolumeSlider = ({ volume, setVolume }) => {
  const changeVolume = (volume) => {
    setVolume(volume);
    localStorage.setItem("volume", volume);
    // resetSounds();
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
    [volume, setVolume]
  );

  return (
    <div className={styles.sliderWrapper}>
      <input
        step={1}
        min={-30}
        max={20}
        value={volume}
        onChange={(event) => {
          changeVolume(event.target.value);
        }}
        className={styles.range}
        type="range"
      />
    </div>
  );
};
