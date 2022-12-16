import React from 'react'
import '../css/ui.scss'

export default function UI() {
  return (
    <div className='controls'>
        <div className='slider_wrapper'>
            <input className='range' type='range'/>
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
