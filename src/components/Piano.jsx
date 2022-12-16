import React from 'react'
import '../css/piano.scss'
import Soundbank from './Soundbank'

export default function Piano() {

    function playSound() {

    }


  return (
    <div className='piano'>
        <div className='piano_wrapper'>
            <div className='upper_keyboard'>
                <div className='upper_buttons'>
                    <button onClick={playSound()} className='button'>q</button>
                    <button className='button_sharp'>2</button>
                    <button className='button'>w</button>
                    <button className='button_sharp'>3</button>
                    <button className='button'>e</button>
                    <button className='button'>r</button>
                    <button className='button_sharp'>5</button>
                    <button className='button'>t</button>
                    <button className='button_sharp'>6</button>
                    <button className='button'>y</button>
                    <button className='button_sharp'>7</button>
                    <button className='button'>u</button>
                    <button className='button'>i</button>
                    <button className='button_sharp'>9</button>
                    <button className='button'>o</button>
                    <button className='button_sharp'>0</button>
                    <button className='button'>p</button>
                    <button className='button'>[</button>
                    <button className='button_sharp'>=</button>
                    <button className='button'>]<p>(z)</p></button>
                </div>
            </div>
            <div className='lower_keyboard'>
                <div className='lower_buttons'>
                        <button className='button'>z<p>(])</p></button>
                        <button className='button_sharp'>s</button>
                        <button className='button'>x</button>
                        <button className='button_sharp'>d</button>
                        <button className='button'>c</button>
                        <button className='button'>v</button>
                        <button className='button_sharp'>g</button>
                        <button className='button'>b</button>
                        <button className='button_sharp'>h</button>
                        <button className='button'>n</button>
                        <button className='button'>m</button>
                        <button className='button_sharp'>k</button>
                        <button className='button'>,</button>
                        <button className='button_sharp'>l</button>
                        <button className='button'>.</button>
                        <button className='button_sharp'>;</button>
                        <button className='button'>/</button>
                </div>
            </div>

        </div>
        
        <Soundbank/>
    </div>
  )
}
