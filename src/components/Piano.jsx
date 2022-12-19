import {React, useState, useEffect, useRef} from 'react'
import '../css/piano.scss'
import Soundbank from './Soundbank'
import { NOTES } from '../global/constants'

import C3 from '../keybank/C3.mp3'


export default function Piano() {

  return (
    <div className='piano'>
        <div className='piano_wrapper'>
            <div className='upper_keyboard'>
                <div className='upper_buttons'>
                    <button note='C3' className='button'>q</button>
                    <button note='C#3' className='button_sharp'>2</button>
                    <button note='D3' className='button'>w</button>
                    <button note='D#3' className='button_sharp'>3</button>
                    <button note='E3' className='button'>e</button>
                    <button note='F3' className='button'>r</button>
                    <button note='F#3' className='button_sharp'>5</button>
                    <button note='G3' className='button'>t</button>
                    <button note='G#3' className='button_sharp'>6</button>
                    <button note='A3' className='button'>y</button>
                    <button note='A#3' className='button_sharp'>7</button>
                    <button note='B3' className='button'>u</button>
                    <button note='C4' className='button'>i</button>
                    <button note='C#4' className='button_sharp'>9</button>
                    <button note='D4' className='button'>o</button>
                    <button note='D#4' className='button_sharp'>0</button>
                    <button note='E4' className='button'>p</button>
                    <button note='F4' className='button'>[</button>
                    <button note='F#4' className='button_sharp'>=</button>
                    <button note='G4' className='button'>]<p>(z)</p></button>
                </div>
            </div>
            <div className='lower_keyboard'>
                <div className='lower_buttons'>
                        <button note='G4' className='button'>z<p>(])</p></button>
                        <button note='G#4' className='button_sharp'>s</button>
                        <button note='A4' className='button'>x</button>
                        <button note='A#4' className='button_sharp'>d</button>
                        <button note='B4' className='button'>c</button>
                        <button note='C4' className='button'>v</button>
                        <button note='C#5' className='button_sharp'>g</button>
                        <button note='D5' className='button'>b</button>
                        <button note='D#5' className='button_sharp'>h</button>
                        <button note='E5' className='button'>n</button>
                        <button note='F5' className='button'>m</button>
                        <button note='F#5' className='button_sharp'>k</button>
                        <button note='G5' className='button'>,</button>
                        <button note='G#5' className='button_sharp'>l</button>
                        <button note='A5' className='button'>.</button>
                        <button note='A#5' className='button_sharp'>;</button>
                        <button note='B5' className='button'>/</button>
                </div>
            </div>

        </div>
        
        <audio src={`../keybank/C3`}></audio>

    </div>
  )
}
