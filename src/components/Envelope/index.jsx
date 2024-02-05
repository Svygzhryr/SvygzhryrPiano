import { useState, useEffect } from "react";
import { CustomKnob } from "../CustomKnob";
import { TbWaveSawTool, TbWaveSine, TbWaveSquare } from "react-icons/tb";
import { AiOutlineRight } from "react-icons/ai";
import { debounce } from "lodash";
import * as Tone from "tone";

import clsx from "clsx";

import styles from "./Envelope.module.scss";

const reverbInstance = new Tone.Reverb(0.1).toDestination();

export const Envelope = ({
  trackColor,
  progressColor,
  thumbColor,
  setTrackColor,
  setProgressColor,
  setThumbColor,
  adsr,
  setAdsr,
  effects,
  setEffects,
  activeInstrument,
  attack,
  sustain,
  decay,
  release,
  setAttack,
  setSustain,
  setDecay,
  setRelease,
  setIsReverbActive,
  isReverbActive,
}) => {
  const colors = {
    trackColor,
    progressColor,
    thumbColor,
    setTrackColor,
    setProgressColor,
    setThumbColor,
  };

  const { fxDetune } = effects;
  const [localReverbValue, setLocalReverbValue] = useState(0.001);

  useEffect(() => {
    setIsReverbActive(false);
    setLocalReverbValue(0.01);
  }, [activeInstrument]);

  const debounceReverb = debounce((reverb) => {
    reverbInstance.decay = reverb;
    if (!isReverbActive) {
      activeInstrument.connect(reverbInstance).toDestination();
      setIsReverbActive(true);
    }
  }, 300);

  const handleReverb = (e) => {
    setLocalReverbValue(e.target.value);
    debounceReverb(e.target.value);
  };

  const handleOctaveDown = () => {
    setEffects({
      ...effects,
      fxDetune: fxDetune < -1200 ? fxDetune : fxDetune - 1200,
    });
  };

  const handleOctaveUp = () => {
    setEffects({
      ...effects,
      fxDetune: fxDetune > 2400 ? fxDetune : fxDetune + 1200,
    });
  };

  return (
    <div className={styles.extraControls}>
      <div
        className={clsx(styles.envelope, {
          [styles.samplerActive]: activeInstrument === "Sampler",
        })}
      >
        <CustomKnob
          {...colors}
          className={styles.attack}
          enType={"Attack"}
          value={attack}
          setValue={setAttack}
          adsr={adsr}
        />
        <CustomKnob
          {...colors}
          className={styles.decay}
          enType={"Decay"}
          value={decay}
          setValue={setDecay}
        />
        <CustomKnob
          {...colors}
          className={styles.sustain}
          enType={"Sustain"}
          value={sustain}
          setValue={setSustain}
        />
        <CustomKnob
          {...colors}
          className={styles.release}
          enType={"Release"}
          value={release}
          setValue={setRelease}
        />
      </div>
      <div className={styles.controlsFx}>
        <div className={`${styles.effectSlider} ${styles.fxReverb}`}>
          <input
            step={1}
            min={0.001}
            max={51}
            value={localReverbValue}
            onChange={handleReverb}
            className={styles.range}
            type="range"
          />
        </div>
        <div
          className={clsx(styles.controlsWaveshape, {
            [styles.samplerActive]: activeInstrument === "Sampler",
          })}
        >
          <button
            onClick={() => {
              setEffects({ ...effects, waveShape: "sine" });
            }}
            className={clsx(styles.waveshapeType, styles.sine, {
              [styles.waveshapeActive]: effects.waveShape === "sine",
            })}
          >
            <TbWaveSine />
          </button>
          <button
            onClick={() => {
              setEffects({ ...effects, waveShape: "square" });
            }}
            className={clsx(styles.waveshapeType, styles.square, {
              [styles.waveshapeActive]: effects.waveShape === "square",
            })}
          >
            <TbWaveSquare />
          </button>
          <button
            onClick={() => {
              setEffects({ ...effects, waveShape: "sawtooth" });
            }}
            className={clsx(styles.waveshapeType, styles.saw, {
              [styles.waveshapeActive]: effects.waveShape === "sawtooth",
            })}
          >
            <TbWaveSawTool />
          </button>
        </div>
        {activeInstrument?.name === "Sampler" ? (
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
            <button onClick={handleOctaveDown} className={styles.octaveDown}>
              -
            </button>
            <h1 className={styles.detuneNumber}>{fxDetune / 1200}</h1>
            <button onClick={handleOctaveUp} className={styles.octaveUp}>
              +
            </button>
          </div>
        )}
        <div className={styles.controlsHold}>
          <button
            onClick={(e) => {
              setEffects({ ...effects, fxHold: true });
            }}
            className={clsx(styles.holdOn, {
              [styles.holdActive]: effects.fxHold,
            })}
          >
            on
          </button>
          <button
            onClick={(e) => {
              setEffects({ ...effects, fxHold: false });
            }}
            className={clsx(styles.holdOff, {
              [styles.holdActive]: !effects.fxHold,
            })}
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
