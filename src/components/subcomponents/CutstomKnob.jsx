import React, {useState, useEffect} from 'react'
import styles from './knob.scss'
import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb
} from 'react-circular-input'


export default function CustomKnob(adsr) {
  const [value, setValue] = useState(0);
  let progressColor = getComputedStyle(document.documentElement).getPropertyValue('--primary_button_active');
  let trackColor = getComputedStyle(document.documentElement).getPropertyValue('--primary_background');
  let thumbColor = getComputedStyle(document.documentElement).getPropertyValue('--primary_background');


  return (
    <div className={styles.envelope_knob}>
      <CircularInput radius={25} className='input' value={value} onChange={setValue}>
        <CircularTrack stroke={trackColor} strokeWidth={10} className='track' />
        <CircularProgress stroke={progressColor} strokeLinecap='0' strokeWidth={5} className='progress' />
        <CircularThumb stroke={progressColor} strokeWidth={2} fill={thumbColor} r={8} className='thumb' />
		  </CircularInput>
    </div>  
  )
}
