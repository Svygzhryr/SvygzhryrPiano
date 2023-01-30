import React from 'react'
import './knob.scss'

export default function Knob() {
  return (
    <div className='envelope_knob'>
      <input type="range" min={0} max={30} step={1} />
    </div>
  )
}
