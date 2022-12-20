import {React, useState, useEffect, useRef} from 'react'
import '../css/piano.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS} from '../global/constants'
import { AUDIO } from '../global/soundBank';



export default function Piano() {
    const [pressedKeys, setPressedKeys] = useState([]);

    let keyClassName = '';
    // вешаем события
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
        }
    }, [])

    // нажатие клавиши
    function handleKeyDown(e) {
        if (e.repeat) {
            return;
        }
        const key = e.key;

        const updatePressedKeys = [setPressedKeys(pressedKeys)]
        if (!updatePressedKeys.includes(key) && VALID_KEYS.includes(key)) {
            updatePressedKeys.push(key)
        }

        setPressedKeys(updatePressedKeys);
        playNote(KEY_TO_NOTE[key]);
    }

    // отпускание клавиши
    function handleKeyUp(e) {
        const index = pressedKeys.indexOf(e.key);
        if (index < -1) {
            setPressedKeys(pressedKeys.splice(index, 1));
        }
    }

    
    // применение стилей
    function keyIsPressed(note, pressedKeys) {
        if (pressedKeys.includes(NOTE_TO_KEY[note])) {
            return true
        } return false
    }

    if (keyIsPressed) {
        keyClassName += 'button_active';
    }

    // проигрыш звука
    function playNote(note) {
        if (note === undefined) {
            return null
        }  
        console.log(note)
        const noteAudio = new Audio(AUDIO[note]);
        noteAudio.play();   
    }

    // генерируем массив клавиш
    const upperKeys = UPPER_NOTES.map((note, index) => {
        // наигениальнейшая проверка на диез и бемоль
        if (note.length > 2 ? keyClassName = 'button_sharp' : keyClassName = 'button')
        return (
            <button 
            key={index} 
            note={note} 
            className={keyClassName} 
            pressedkey={pressedKeys}
            >
            </button>
        )  
    })

    const lowerKeys = LOWER_NOTES.map((note, index) => {
        if (note.length > 2 ? keyClassName = 'button_sharp' : keyClassName = 'button')
        return (
            <button 
            key={index}     
            note={note} 
            className={keyClassName}
            pressedkey={pressedKeys}
            />
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
        
    </div>
  )
}
