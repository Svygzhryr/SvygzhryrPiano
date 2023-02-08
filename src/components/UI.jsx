import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import '../css/ui.scss'
import CustomKnob from './subcomponents/CutstomKnob';
import {AiOutlineRight} from 'react-icons/ai'
import {MdPiano} from 'react-icons/md'
import {RiSoundModuleFill} from 'react-icons/ri'
import {TbWaveSawTool, TbWaveSine, TbWaveSquare} from 'react-icons/tb'


export default function UI({...props}) {

  const [theme, setTheme] = useState('black');
  const [reverbValue, setReverbValue] = useState(0);

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

console.log(props.activeSynth)

const handleReverb = (e) => {
  props.changeReverb(e.target.value)
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
          <div className={'envelope' + (props.activeSynth.name === 'Sampler' ? ' sampler_active' : '')}>
              <CustomKnob className='attack' enType={'atk'} value={props.attack} setValue={props.setAttack}/>
              <CustomKnob className='decay' enType={'dec'} value={props.decay} setValue={props.setDecay}/>
              <CustomKnob className='sustain' enType={'sus'} value={props.sustain} setValue={props.setSustain}/>
              <CustomKnob className='release' enType={'rel'} value={props.release} setValue={props.setRelease}/>
            </div>
            <div className="controls-fx">
              <div className="effect-slider reverb">
                <input  step={1} min={0.001} max={51} value={props.reverb} onChange={handleReverb} className='range' type='range'/>
              </div>
              <div className={"controls_waveshape" + (props.activeSynth.name === 'Sampler' ? ' sampler_active' : '')}>
                <button onClick={() => {props.setWaveShape('sine')}} className="waveshape_type sine"><TbWaveSine/></button>
                <button onClick={() => {props.setWaveShape('square')}} className="waveshape_type square"><TbWaveSquare/></button>
                <button onClick={() => {props.setWaveShape('sawtooth')}} className="waveshape_type saw"><TbWaveSawTool/></button>
              </div>
              <div className={"octave" + (props.activeSynth.name === 'Sampler' ? ' sampler_active' : '')}>  
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
