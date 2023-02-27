import React, {useState, useEffect} from 'react'
import './knob.scss'
import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb
} from 'react-circular-input'


export default function CustomKnob({...props}) {

  return (
    <div className='envelope_knob'>
      <div className='knob_value'>{Math.round(props.value * 10)}</div>
      <CircularInput radius={25} className='input' value={props.value} onChange={props.setValue}>
        <CircularTrack stroke={props.trackColor} strokeWidth={10} className='track' />
        <CircularProgress stroke={props.progressColor} strokeLinecap='0' strokeWidth={5} className='progress' />
        <CircularThumb stroke={props.progressColor} strokeWidth={2} fill={props.thumbColor} r={8} className='thumb' />
      </CircularInput>
      <h1 className="type">{props.enType}</h1>
    </div>  
  )
}
