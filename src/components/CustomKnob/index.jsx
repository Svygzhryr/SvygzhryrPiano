import React from "react";
import styles from "./Knob.module.scss";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";

export const CustomKnob = ({
  value,
  setValue,
  trackColor,
  progressColor,
  thumbColor,
  enType,
}) => {
  console.log(trackColor);
  return (
    <div className={styles.envelopeKnob}>
      <div className={styles.knobValue}>{Math.round(value * 10)}</div>
      <CircularInput
        radius={25}
        className={styles.input}
        value={value}
        onChange={setValue}
      >
        <CircularTrack
          stroke={trackColor}
          strokeWidth={10}
          className={styles.track}
        />
        <CircularProgress
          stroke={progressColor}
          strokeLinecap="0"
          strokeWidth={5}
          className={styles.progress}
        />
        <CircularThumb
          stroke={progressColor}
          strokeWidth={2}
          fill={thumbColor}
          r={8}
          className={styles.thumb}
        />
      </CircularInput>
      <h1 className={styles.type}>{enType}</h1>
    </div>
  );
};
