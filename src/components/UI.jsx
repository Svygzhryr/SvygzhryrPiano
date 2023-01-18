import React, { useEffect } from 'react'
import { COLORS } from '../global/constants';
import { useState, useRef } from 'react';
import '../css/ui.scss'
import styles from '../css/piano.module.scss'
import Input from './subcomponents/Input';
import CircularSlider from 'react-circular-slider';

export default function UI({...props}) {

  const [theme, setTheme] = useState('black');

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
          <div className="reverb-slider">
            <input  step={1} min={0.001} max={51} value={props.reverb} onChange={(e) => {props.changeReverb(e.target.value)}} className='range' type='range'/>
          </div>
        </div>
    </div>
  )
}
