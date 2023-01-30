import React from 'react'
import './knob.scss'
import White from 'react-dial-knob'

export default function CustomKnob(adsr) {
  return (
    <div className='envelope_knob'>
      <White 
        diameter={50}
        min={0}
        max={30}
        step={1}
        value={adsr}
      />
    </div>
  )
}
