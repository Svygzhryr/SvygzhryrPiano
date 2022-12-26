import React from 'react'
import { useState, useRef } from 'react';
import '../css/ui.scss'

export default function UI({changeVolume, volume, showText, setShowText}) {

  function handleShowText() {
   return setShowText(!showText)

  }

  return (
    <div className='controls'>
        <div className='slider_wrapper'>
            <input step={0.01} min={0} max={1} value={volume} onChange={(e) => {changeVolume(e.target.value)}} className='range' type='range'/>
        </div>
        <div className='themes'>
          <button className="theme_selector theme_1"></button>
          <button className="theme_selector theme_2"></button>
          <button className="theme_selector theme_3"></button>
          <button className="theme_selector theme_4"></button>
          <button onClick={handleShowText} className="theme_selector toggle_text">A</button>
        </div>
    </div>
  )
}
