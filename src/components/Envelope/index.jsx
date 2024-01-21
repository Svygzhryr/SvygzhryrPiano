import React from "react";
import { CustomKnob } from "../CustomKnob";
import { TbWaveSawTool, TbWaveSine, TbWaveSquare } from "react-icons/tb";
import { AiOutlineRight } from "react-icons/ai";
import { debounce } from "lodash";
import clsx from "clsx";

import styles from "./Envelope.module.scss";

export const Envelope = ({
  trackColor,
  progressColor,
  thumbColor,
  setTrackColor,
  setProgressColor,
  setThumbColor,
  adsr,
  setAdsr,
  fxReverb,
  setFxReverb,
  effects,
  setEffects,
  activeInstrument,
  waveShape,
  setWaveShape,
}) => {
  const colors = {
    trackColor,
    progressColor,
    thumbColor,
    setTrackColor,
    setProgressColor,
    setThumbColor,
  };

  const { hold, fxDetune } = effects;
  const { attack, decay, sustain, release } = adsr;

  const debounceReverb = debounce((reverb) => handleReverb(reverb), 300);
  const handleReverb = (e) => {
    debounceReverb(e.target.value);
    setFxReverb(e.target.value);
  };

  return (
    <div className={styles.extraControls}>
      <div
        className={clsx(styles.envelope, {
          [styles.samplerActive]: activeInstrument === "Sampler",
        })}
      >
        {/* <CustomKnob
          {...colors}
          className={styles.attack}
          enType={"Attack"}
          value={attack}
          setValue={setAdsr({ ...adsr, attack })}
        />
        <CustomKnob
          {...colors}
          className={styles.decay}
          enType={"Decay"}
          value={decay}
          setValue={setAdsr({ ...adsr, decay })}
        />
        <CustomKnob
          {...colors}
          className={styles.sustain}
          enType={"Sustain"}
          value={sustain}
          setValue={setAdsr({ ...adsr, sustain })}
        />
        <CustomKnob
          {...colors}
          className={styles.release}
          enType={"Release"}
          value={release}
          setValue={setAdsr({ ...adsr, release })}
        /> */}
      </div>
      <div className={styles.controlsFx}>
        <div className={`${styles.effectSlider} ${styles.fxReverb}`}>
          <input
            step={1}
            min={0.001}
            max={51}
            value={fxReverb}
            onChange={handleReverb}
            className={styles.range}
            type="range"
          />
        </div>
        <div
          className={clsx(styles.ontrolsWaveshape, {
            [styles.samplerActive]: activeInstrument === "Sampler",
          })}
        >
          <button
            onClick={() => {
              setWaveShape("sine");
            }}
            className={clsx(styles.waveshapeType, styles.sine, {
              [styles.waveshapeActive]: waveShape === "sine",
            })}
          >
            <TbWaveSine />
          </button>
          <button
            onClick={() => {
              setWaveShape("square");
            }}
            className={clsx(styles.waveshapeType, styles.square, {
              [styles.waveshapeActive]: waveShape === "square",
            })}
          >
            <TbWaveSquare />
          </button>
          <button
            onClick={() => {
              setWaveShape("sawtooth");
            }}
            className={clsx(styles.waveshapeType, styles.saw, {
              [styles.waveshapeActive]: waveShape === "sawtooth",
            })}
          >
            <TbWaveSawTool />
          </button>
        </div>
        {activeInstrument === "Sampler" ? (
          <div className={styles.controlsOctave}>
            <button
              onClick={() => {
                setEffects({ ...effects, samplePitch: 4 });
              }}
              className={clsx(
                styles.waveshapeType,
                styles.sine,
                styles.sampleOct,
                { [styles.waveshapeActive]: effects.samplePitch === 4 }
              )}
            >
              -1
            </button>
            <button
              onClick={() => {
                setEffects({ ...effects, samplePitch: 3 });
              }}
              className={clsx(
                styles.waveshapeType,
                styles.square,
                styles.sampleOct,
                { [styles.waveshapeActive]: effects.samplePitch === 3 }
              )}
            >
              0
            </button>
            <button
              onClick={() => {
                setEffects({ ...effects, samplePitch: 2 });
              }}
              className={clsx(
                styles.waveshapeType,
                styles.saw,
                styles.sampleOct,
                { [styles.waveshapeActive]: effects.samplePitch === 2 }
              )}
            >
              1
            </button>
          </div>
        ) : (
          <div className={styles.controlsOctave}>
            <button
              onClick={() => {
                setEffects({
                  ...effects,
                  fxDetune: fxDetune < -1200 ? fxDetune : fxDetune - 1200,
                });
              }}
              className={styles.octaveDown}
            >
              -
            </button>
            <h1 className={styles.detuneNumber}>{fxDetune / 1200}</h1>
            <button
              onClick={() => {
                setEffects({
                  ...effects,
                  fxDetune: fxDetune > 2400 ? fxDetune : fxDetune + 1200,
                });
              }}
              className={styles.octaveUp}
            >
              +
            </button>
          </div>
        )}
        <div className={styles.controlsHold}>
          <button
            onClick={(e) => {
              setEffects({ ...effects, fxHold: true });
            }}
            className={clsx(styles.holdOn, { [styles.holdActive]: hold })}
          >
            on
          </button>
          <button
            onClick={(e) => {
              setEffects({ ...effects, fxHold: false });
            }}
            className={clsx(styles.holdOff, { [styles.holdActive]: !hold })}
          >
            off
          </button>
        </div>
      </div>
      <div className={styles.showControls}>
        <AiOutlineRight className={styles.showControlsArrow} />
      </div>
    </div>
  );
};
