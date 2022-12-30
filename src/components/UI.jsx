import React from 'react'
import { useState, useRef } from 'react';
import '../css/ui.scss'

export default function UI({...props}) {

  function handleShowText() {
   return props.setShowText(!props.showText)

  }

  return (
    <div className='controls'>
        <div className='slider_wrapper'>
            <input step={1} min={-50} max={0} value={props.volume} onChange={(e) => {props.changeVolume(e.target.value)}} className='range' type='range'/>
        </div>
        <div className='themes'>
          <button onClick={props.themeChange} className="theme_selector theme_1"></button>
          <button onClick={props.themeChange} className="theme_selector theme_2"></button>
          <button onClick={props.themeChange} className="theme_selector theme_3"></button>
          <button onClick={props.themeChange} className="theme_selector theme_4"></button>
          <button onClick={handleShowText} className="theme_selector toggle_text">A</button>
        </div>
    </div>
  )
}
