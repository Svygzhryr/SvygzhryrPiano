import { useCallback, useState, useEffect } from "react";
import * as Tone from "tone";

import sample2 from "../../samples/harp.wav";
import { Keyboard } from "../Keyboard";
import { VolumeSlider } from "../VolumeSlider";
import { Themes } from "../Themes/Themes";
import { Instruments } from "../Instruments";
import { Envelope } from "../Envelope";

import "../../styles/app.scss";

export const App = () => {
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 0);
  const [showText, setShowText] = useState(false);
  const [isInstrumentActive, setIsInstrumentActive] = useState(false);
  const [activeInstrument, setActiveInstrument] = useState(null);
  const [isReverbActive, setIsReverbActive] = useState(false);

  const [activeKeys, setActiveKeys] = useState([]);
  const [instruments, setInstruments] = useState({});
  const [currentSample, setCurrentSample] = useState(null);

  const [attack, setAttack] = useState(0.01);
  const [decay, setDecay] = useState(0.5);
  const [sustain, setSustain] = useState(0.5);
  const [release, setRelease] = useState(0.5);

  const [effects, setEffects] = useState({
    fxDetune: 1200,
    fxHold: true,
    fxReverb: 0.1,
    samplePitch: 2,
    waveShape: "sine",
  });

  const synthStart = useCallback(() => {
    Tone.context.lookAhead = 0.02;

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const monosynth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
    const fmsynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    const amsynth = new Tone.PolySynth(Tone.AMSynth).toDestination();
    const membranesynth = new Tone.PolySynth(
      Tone.MembraneSynth
    ).toDestination();
    const sampler = new Tone.Sampler({
      urls: {
        A3: sample2,
      },
    }).toDestination();

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

  const [progressColor, setProgressColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary_button_active"
    )
  );
  const [trackColor, setTrackColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary_background"
    )
  );
  const [thumbColor, setThumbColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary_background"
    )
  );

  const envelopeColorChange = useCallback(() => {
    setProgressColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary_button_active"
      )
    );
    setTrackColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary_background"
      )
    );
    setThumbColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary_background"
      )
    );
  }, [setProgressColor, setTrackColor, setThumbColor]);

  const keyboardProps = {
    instruments,
    activeKeys,
    setActiveKeys,
    volume,
    showText,
    setShowText,
    isInstrumentActive,
    activeInstrument,
    effects,
    attack,
    decay,
    sustain,
    release,
  };

  const instrumentsProps = {
    instruments,
    setInstruments,
    activeKeys,
    isInstrumentActive,
    setIsInstrumentActive,
    activeInstrument,
    setActiveInstrument,
    effects,
    currentSample,
    setIsReverbActive,
    isReverbActive,
  };

  const envelopeProps = {
    activeInstrument,
    effects,
    setEffects,
    progressColor,
    trackColor,
    thumbColor,
    attack,
    decay,
    sustain,
    release,
    setAttack,
    setDecay,
    setSustain,
    setRelease,
    setIsReverbActive,
    isReverbActive,
  };

  return (
    <div className="app">
      <Keyboard {...keyboardProps} />
      <VolumeSlider volume={volume} setVolume={setVolume} />
      <Themes
        envelopeColorChange={envelopeColorChange}
        showText={showText}
        setShowText={setShowText}
      />
      <Instruments {...instrumentsProps} />
      <Envelope {...envelopeProps} />
    </div>
  );
};
