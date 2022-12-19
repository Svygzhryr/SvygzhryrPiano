import {React, useState, useEffect, useRef} from 'react'
import '../css/piano.scss'
import Soundbank from './Soundbank'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS } from '../global/constants'

import C3 from '../keybank/C3.mp3'


export default function Piano() {
    const [pressedKeys, setPressedKeys] = useState([]);
    const didMount = useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    }, [])

    function handleKeyDown(e) {
        if (e.repeat) {
            return;
        }
        const key = e.key;
        const updatePressedKeys = [setPressedKeys(pressedKeys)]
        if (!updatePressedKeys.includes(key) && VALID_KEYS.includes(key)) {

        }
    }

    function handleKeyUp(e) {
        
    }

    
    function keyIsPressed(note, pressedKeys) {

    }


    const upperKeys = UPPER_NOTES.map((note, index) => {
        return (
            <button 
            key={index} 
            note={note} 
            // наигениальнейшая проверка на диез и бемоль
            className={note.length > 2 ? 'button_sharp' : 'button' } 
            pressedkey={pressedKeys}
            >
            </button>
        )  
    })

    const lowerKeys = LOWER_NOTES.map((note, index) => {
        return (
            <button 
            key={index} 
            note={note} 
            className={note.length > 2 ? 'button_sharp' : 'button' }
            pressedkey={pressedKeys}
            >
            </button>
        )
    })


  return (
    <div className='piano'>
        <div className='piano_wrapper'>
            <div className='upper_keyboard'>
                <div className='upper_buttons'>
                    {upperKeys}
                </div>
            </div>
            <div className='lower_keyboard'>
                <div className='lower_buttons'>
                    {lowerKeys}
                </div>
            </div>

        </div>
        
        <audio src={`../keybank/C3`}></audio>

    </div>
  )
}
