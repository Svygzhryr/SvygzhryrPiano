import { useCallback, useState } from "react";
import * as Tone from "tone";
import { Keyboard } from "../Keyboard";
import sample2 from "../../samples/harp.wav";
import { VolumeSlider } from "../VolumeSlider";
import { Themes } from "../Themes/Themes";
import { Instruments } from "../Instruments";
import "../../styles/app.scss";
import { useEffect } from "react";

export const App = () => {
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 0);
  const [showText, setShowText] = useState(false);
  const [isInstrumentActive, setIsInstrumentActive] = useState(false);
  const [activeInstrument, setActiveInstrument] = useState(null);
  const [samplePitch, setSamplePitch] = useState(2);

  const [activeKeys, setActiveKeys] = useState([]);
  const [instruments, setInstruments] = useState({});
  const [fxReverb, setFxReverb] = useState(null);
  const [currentSample, setCurrentSample] = useState(null);

  const synthStart = useCallback(() => {
    Tone.context.lookAhead = 0.02;

    const reverb = new Tone.Reverb(0.1).toDestination();
    setFxReverb(reverb);

    const synth = new Tone.PolySynth(Tone.Synth)
      .connect(reverb)
      .toDestination();
    const monosynth = new Tone.PolySynth(Tone.MonoSynth)
      .connect(reverb)
      .toDestination();
    const fmsynth = new Tone.PolySynth(Tone.FMSynth)
      .connect(reverb)
      .toDestination();
    const amsynth = new Tone.PolySynth(Tone.AMSynth)
      .connect(reverb)
      .toDestination();
    const membranesynth = new Tone.PolySynth(Tone.MembraneSynth)
      .connect(reverb)
      .toDestination();
    const sampler = new Tone.Sampler({
      urls: {
        A3: sample2,
      },
    })
      .connect(reverb)
      .toDestination();

    const initialInstruments = {
      synth,
      monosynth,
      fmsynth,
      amsynth,
      membranesynth,
      sampler,
    };

    Object.values(initialInstruments).forEach((instrument) => {
      instrument.set({
        oscillator: {
          type: "sine",
        },

        detune: 2400,
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

    setInstruments(initialInstruments);
    setActiveInstrument(initialInstruments.synth);
    setActiveKeys(Array(222).fill(true));
    Tone.start();
  }, []);

  useEffect(() => {
    synthStart();
  }, [synthStart]);

  const keyboardProps = {
    instruments,
    activeKeys,
    setActiveKeys,
    volume,
    showText,
    setShowText,
    isInstrumentActive,
    activeInstrument,
  };

  const instrumentsProps = {
    instruments,
    setInstruments,
    activeKeys,
    isInstrumentActive,
    setIsInstrumentActive,
    activeInstrument,
    setActiveInstrument,
    samplePitch,
    currentSample,
    fxReverb,
  };

  return (
    <div className="app">
      <Keyboard {...keyboardProps} />
      <VolumeSlider volume={volume} setVolume={setVolume} />
      <Themes showText={showText} setShowText={setShowText} />
      <Instruments {...instrumentsProps} />
    </div>
  );
};
