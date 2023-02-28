import React, { useEffect } from 'react'
import { useState, useCallback } from 'react';
import '../css/ui.scss'
import {MdPiano} from 'react-icons/md'
import {RiSoundModuleFill} from 'react-icons/ri'
import Extracontrols from './Extracontrols';
import Themes from './Themes';



export default function UI({...props}) {

  const [reverbValue, setReverbValue] = useState(0);
  
  const [progressColor, setProgressColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--primary_button_active'));
  const [trackColor, setTrackColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--primary_background'));
  const [thumbColor, setThumbColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--primary_background'));

  const envelopeColorChange = useCallback(() => {
    setProgressColor(getComputedStyle(document.documentElement).getPropertyValue('--primary_button_active'));
    setTrackColor(getComputedStyle(document.documentElement).getPropertyValue('--primary_background'));
    setThumbColor(getComputedStyle(document.documentElement).getPropertyValue('--primary_background'));
  },[setProgressColor, setTrackColor, setThumbColor])

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', localStorage.getItem('theme') ?? 'default')
    envelopeColorChange()
  }, [envelopeColorChange])


  
  // смена цветовой схемы
  

  const handleReverb = (e) => {
    props.debounceReverb(e.target.value);
    setReverbValue(e.target.value)
  }

  const extraControls = {
    trackColor,
    progressColor,
    thumbColor,
    setTrackColor,
    setThumbColor,
    setProgressColor,
    reverbValue,
    handleReverb,
  }

  return (
    <div className='controls'>
        <div className="main-controls">
          <div className="slider_wrapper">
            <input  step={1} min={-30} max={20} value={props.volume} onChange={(e) => {props.changeVolume(e.target.value)}} className='range' type='range'/>
          </div>
          {/* Themes */}
          <Themes/>
        </div>
        {/* Extra-Controls */}
        <Extracontrols {...extraControls} />
        <button className="instrument-switch" onClick={() => {props.setInstrument(!props.instrument)}}>{props.instrument ? <MdPiano/> : <RiSoundModuleFill/>}</button>

    </div>
  )
}
