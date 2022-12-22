import React from 'react'
import { useState, useRef } from 'react';
import '../css/ui.scss'

export default function UI(changeVolume) {

  const [volume, setVolume] = useState(50);
  const passVolume = useRef(null);

  return (
    <div className='controls'>
        <div className='slider_wrapper'>
            <input ref={passVolume}  className='range' type='range'/>
        </div>
        <div className='themes'>
          <button className="theme_selector theme_1"></button>
          <button className="theme_selector theme_2"></button>
          <button className="theme_selector theme_3"></button>
          <button className="theme_selector theme_4"></button>
          <button className="theme_selector toggle_text">A</button>
        </div>
    </div>
  )
}
