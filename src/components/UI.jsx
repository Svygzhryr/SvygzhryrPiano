import React from 'react'
import { COLORS } from '../global/constants';
import { useState, useRef } from 'react';
import '../css/ui.scss'
import styles from '../css/piano.module.scss'

export default function UI({...props}) {

  const [theme, setTheme] = useState('black');

  function handleShowText() {
    localStorage.setItem('text', !props.showText)
    return props.setShowText(!props.showText)
  }
  
  // смена цветовой схемы
  const themeChange = (e) => {
    const root = document.querySelector(':root');
    let rootStyles = getComputedStyle(root);
    const button = e.target;
    switch (true) {
        default: return null;
        case button.classList.contains('theme_1'): {
            root.style.setProperty('--primary_background', COLORS.black_background)
            root.style.setProperty('--primary_button', COLORS.black_button)
            root.style.setProperty('--primary_sharp', COLORS.black_sharp)
            root.style.setProperty('--primary_button_active', COLORS.black_button_active)
            root.style.setProperty('--primary_sharp_active', COLORS.black_sharp_active)
            break
        }

        case button.classList.contains('theme_2'): {
            root.style.setProperty('--primary_background', COLORS.purplish_background)
            root.style.setProperty('--primary_button', COLORS.purplish_button)
            root.style.setProperty('--primary_sharp', COLORS.purplish_sharp)
            root.style.setProperty('--primary_button_active', COLORS.purplish_button_active)
            root.style.setProperty('--primary_sharp_active', COLORS.purplish_sharp_active)
            break
        }

        case button.classList.contains('theme_3'): {
            root.style.setProperty('--primary_background', COLORS.reddish_background)
            root.style.setProperty('--primary_button', COLORS.reddish_button)
            root.style.setProperty('--primary_sharp', COLORS.reddish_sharp)
            root.style.setProperty('--primary_button_active', COLORS.reddish_button_active)
            root.style.setProperty('--primary_sharp_active', COLORS.reddish_sharp_active)
            break
        }

        case button.classList.contains('theme_4'): {
            root.style.setProperty('--primary_background', COLORS.bluish_background)
            root.style.setProperty('--primary_button', COLORS.bluish_button)
            root.style.setProperty('--primary_sharp', COLORS.bluish_sharp)
            root.style.setProperty('--primary_button_active', COLORS.bluish_button_active)
            root.style.setProperty('--primary_sharp_active', COLORS.bluish_sharp_active)
            break
        }
    }

}
  return (
    <div className='controls'>
        <div className='slider_wrapper'>
            <input step={1} min={-30} max={20} value={props.volume} onChange={(e) => {props.changeVolume(e.target.value)}} className='range' type='range'/>
        </div>
        <div className='themes'>
          <button onClick={themeChange} className="theme_selector theme_1"></button>
          <button onClick={themeChange} className="theme_selector theme_2"></button>
          <button onClick={themeChange} className="theme_selector theme_3"></button>
          <button onClick={themeChange} className="theme_selector theme_4"></button>
          <button onClick={handleShowText} className="theme_selector toggle_text">T</button>
        </div>
    </div>
  )
}
