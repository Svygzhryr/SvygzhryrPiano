import React, {useState, useEffect} from 'react'
import './knob.scss'
import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb
} from 'react-circular-input'


export default function CustomKnob({...props}) {

  let progressColor = getComputedStyle(document.documentElement).getPropertyValue('--primary_button_active');
  let trackColor = getComputedStyle(document.documentElement).getPropertyValue('--primary_background');
  let thumbColor = getComputedStyle(document.documentElement).getPropertyValue('--primary_background');


  return (
    <div className='envelope_knob'>
      <CircularInput radius={25} className='input' value={props.value} onChange={props.setValue}>
        <CircularTrack stroke={trackColor} strokeWidth={10} className='track' />
        <CircularProgress stroke={progressColor} strokeLinecap='0' strokeWidth={5} className='progress' />
        <CircularThumb stroke={progressColor} strokeWidth={2} fill={thumbColor} r={8} className='thumb' />
        <text className='knob_value'>{Math.round(props.value * 10)}</text>
		  </CircularInput>
    </div>  
  )
}
