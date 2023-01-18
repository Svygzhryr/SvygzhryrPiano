import React from 'react'

export default function Input({...props}) {
  return (
    <div className='slider_wrapper'>
        <input step={1} min={-30} max={20} value={props.volume} onChange={(e) => {props.changeVolume(e.target.value)}} className='range' type='range'/>
    </div>
  )
}
