import React from "react";
import { useState } from "react";
import { TbWaveSawTool, TbWaveSine, TbWaveSquare } from "react-icons/tb";
import { CustomKnob } from "./CustomKnob";
import { AiOutlineRight } from "react-icons/ai";

export default function Extracontrols({ ...props }) {
  const [reverbValue, setReverbValue] = useState(0);

  const handleReverb = (e) => {
    props.debounceReverb(e.target.value);
    setReverbValue(e.target.value);
  };

  const colors = {
    trackColor: props.trackColor,
    progressColor: props.progressColor,
    thumbColor: props.thumbColor,
    setTrackColor: props.setTrackColor,
    setProgressColor: props.setProgressColor,
    setThumbColor: props.setThumbColor,
  };

  return (
    <div className="extra-controls">
      <div
        className={
          "envelope" +
          (props?.activeSynth.name === "Sampler" ? " sampler_active" : "")
        }
      >
        <CustomKnob
          {...colors}
          className="attack"
          enType={"Attack"}
          value={props.attack}
          setValue={props.setAttack}
        />
        <CustomKnob
          {...colors}
          className="decay"
          enType={"Decay"}
          value={props.decay}
          setValue={props.setDecay}
        />
        <CustomKnob
          {...colors}
          className="sustain"
          enType={"Sustain"}
          value={props.sustain}
          setValue={props.setSustain}
        />
        <CustomKnob
          {...colors}
          className="release"
          enType={"Release"}
          value={props.release}
          setValue={props.setRelease}
        />
      </div>
      <div className="controls-fx">
        <div className="effect-slider reverb">
          <input
            step={1}
            min={0.001}
            max={51}
            value={reverbValue}
            onChange={handleReverb}
            className="range"
            type="range"
          />
        </div>
        <div
          className={
            "controls_waveshape" +
            (props.activeSynth.name === "Sampler" ? " sampler_active" : "")
          }
        >
          <button
            onClick={() => {
              props.setWaveShape("sine");
            }}
            className={
              "waveshape_type sine" +
              (props.waveShape === "sine" ? " waveshape_active" : "")
            }
          >
            <TbWaveSine />
          </button>
          <button
            onClick={() => {
              props.setWaveShape("square");
            }}
            className={
              "waveshape_type square" +
              (props.waveShape === "square" ? " waveshape_active" : "")
            }
          >
            <TbWaveSquare />
          </button>
          <button
            onClick={() => {
              props.setWaveShape("sawtooth");
            }}
            className={
              "waveshape_type saw" +
              (props.waveShape === "sawtooth" ? " waveshape_active" : "")
            }
          >
            <TbWaveSawTool />
          </button>
        </div>
        {props.activeSynth.name === "Sampler" ? (
          <div className="controls_octave">
            <button
              onClick={() => {
                props.setSamplePitch(4);
              }}
              className={
                "waveshape_type sine samplerOct" +
                (props.samplePitch === 4 ? " waveshape_active" : "")
              }
            >
              -1
            </button>
            <button
              onClick={() => {
                props.setSamplePitch(3);
              }}
              className={
                "waveshape_type square samplerOct" +
                (props.samplePitch === 3 ? " waveshape_active" : "")
              }
            >
              0
            </button>
            <button
              onClick={() => {
                props.setSamplePitch(2);
              }}
              className={
                "waveshape_type saw samplerOct" +
                (props.samplePitch === 2 ? " waveshape_active" : "")
              }
            >
              1
            </button>
          </div>
        ) : (
          <div className="controls_octave">
            <button
              onClick={() => {
                props.setDetune(
                  props.detune < -1200 ? props.detune : props.detune - 1200
                );
              }}
              className="octave-down"
            >
              -
            </button>
            <h1 className="detune-number">{props.detune / 1200}</h1>
            <button
              onClick={() => {
                props.setDetune(
                  props.detune > 2400 ? props.detune : props.detune + 1200
                );
              }}
              className="octave-up"
            >
              +
            </button>
          </div>
        )}
        <div className={"controls_hold"}>
          <button
            onClick={(e) => {
              props.setHold(true);
            }}
            className={"hold_on" + (props.hold ? " hold_active" : "")}
          >
            on
          </button>
          <button
            onClick={(e) => {
              props.setHold(false);
            }}
            className={"hold_off" + (props.hold ? "" : " hold_active")}
          >
            off
          </button>
        </div>
      </div>
      <div className="show-controls">
        <AiOutlineRight className="show-controls-arrow" />
      </div>
    </div>
  );
}
