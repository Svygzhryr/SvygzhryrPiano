import React, { useEffect } from 'react'
import { COLORS } from '../global/constants';
import { useState, useRef } from 'react';
import '../css/ui.scss'
import styles from '../css/piano.module.scss'
import CustomKnob from './subcomponents/CutstomKnob';
import CircularSlider from 'react-circular-slider';
import {AiOutlineRight} from 'react-icons/ai'
import {MdPiano} from 'react-icons/md'
import {RiSoundModuleFill} from 'react-icons/ri'

export default function UI({...props}) {

  const [theme, setTheme] = useState('black');
  const [reverbValue, setReverbValue] = useState(0);

  const [attack, setAttack] = useState(0);
  const [decay, setDecay] = useState(0);
  const [sustain, setSustain] = useState(0);
  const [release, setRelease] = useState(0);


  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', localStorage.getItem('theme') ?? 'default')
  }, [theme])

  function handleShowText() {
    localStorage.setItem('text', !props.showText)
    return props.setShowText(!props.showText)
  }
  
  // смена цветовой схемы
  const themeChange = (e) => {
    const button = e.target;
    switch (true) {
        default: return null;
        case button.classList.contains('theme_1'): {
            setTheme('default');
            localStorage.setItem('theme', 'default')
            break
        }

        case button.classList.contains('theme_2'): {
            setTheme('purple');     
            localStorage.setItem('theme', 'purple')
            break
        }

        case button.classList.contains('theme_3'): {
            setTheme('red');
            localStorage.setItem('theme', 'red')
            break
        }

        case button.classList.contains('theme_4'): {
            setTheme('blue');
            localStorage.setItem('theme', 'blue')
            break
        }
    }

}

const handleReverb = (e) => {
  props.changeReverb(e.target.value)
}

const knobProps = {
  attack,
  decay,
  sustain,
  release,
}

  return (
    <div className='controls'>
        <div className="main-controls">
          <div className="slider_wrapper">
            <input  step={1} min={-30} max={20} value={props.volume} onChange={(e) => {props.changeVolume(e.target.value)}} className='range' type='range'/>
          </div>
          <div className='themes'>
            <button onClick={themeChange} className="theme_selector theme_1"></button>
            <button onClick={themeChange} className="theme_selector theme_2"></button>
            <button onClick={themeChange} className="theme_selector theme_3"></button>
            <button onClick={themeChange} className="theme_selector theme_4"></button>
            <button onClick={handleShowText} className="theme_selector toggle_text">T</button>
          </div>
        </div>
        <div className="extra-controls">
        <div className="envelope">
            <CustomKnob value={attack}> </CustomKnob>
            <CustomKnob value={attack}/>
            <CustomKnob value={attack}/>
            <CustomKnob value={attack}/>
          </div>
          <div className="controls-fx">
            <div className="effect-slider reverb">
              <input  step={1} min={0.001} max={51} value={props.reverb} onChange={handleReverb} className='range' type='range'/>
            </div>
            {/* <div className="effect-slider delay-duration">
              <input  step={1} min={1} max={24} value={props.delayDuration} onChange={(e) => {props.changeDelayDuration(e.target.value)}}  className='range' type='range'/>
            </div>
            <div className="effect-slider delay-feedback">
              <input  step={0.1} min={0} max={1} value={props.delayFeedback} onChange={(e) => {props.changeDelayFeedBack(e.target.value)}}  className='range' type='range'/>
            </div> */}
            <div className="octave">
              <button onClick={() => {props.setDetune(props.detune < -1200 ? props.detune : props.detune - 1200)}} className="octave-down">-</button>
              <h1 className="detune-number">
                {(props.detune/1200)}
              </h1>
              <button onClick={() => {props.setDetune(props.detune > 2400 ? props.detune : props.detune + 1200)}} className="octave-up">+</button>
            </div>
            </div>
            <div className="show-controls"><AiOutlineRight className='show-controls-arrow'/></div>
        </div>
        <button className="instrument-switch" onClick={() => {props.setInstrument(!props.instrument)}}>{props.instrument ? <MdPiano/> : <RiSoundModuleFill/>}</button>

    </div>
  )
}
