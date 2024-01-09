import React from "react";
import styles from "./Knob.module.scss";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";

export const CustomKnob = ({ ...props }) => {
  return (
    <div className={styles.envelopeKnob}>
      <div className={styles.knobValue}>{Math.round(props.value * 10)}</div>
      <CircularInput
        radius={25}
        className={styles.input}
        value={props.value}
        onChange={props.setValue}
      >
        <CircularTrack
          stroke={props.trackColor}
          strokeWidth={10}
          className={styles.track}
        />
        <CircularProgress
          stroke={props.progressColor}
          strokeLinecap="0"
          strokeWidth={5}
          className={styles.progress}
        />
        <CircularThumb
          stroke={props.progressColor}
          strokeWidth={2}
          fill={props.thumbColor}
          r={8}
          className={styles.thumb}
        />
      </CircularInput>
      <h1 className={styles.type}>{props.enType}</h1>
    </div>
  );
};
