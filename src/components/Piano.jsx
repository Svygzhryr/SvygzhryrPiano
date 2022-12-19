import {React, useState, useEffect, useRef} from 'react'
import '../css/piano.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS } from '../global/constants'


export default function Piano() {
    const [pressedKeys, setPressedKeys] = useState([]);

    let keyClassName = '';
    // вешаем события
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
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

    // отпиускание клавиши
    function handleKeyUp(e) {
        const index = pressedKeys.indexOf(e.key);
        if (index < -1) {
            setPressedKeys(pressedKeys.splice(index, 1));
        }
    }

    
    // применение стилей
    function keyIsPressed(note, pressedKeys) {
        return pressedKeys.includes(pressedKeys, NOTE_TO_KEY[note]);
    }

    if (keyIsPressed) {
        keyClassName =+ 'active';
    }

    // проигрыш звука
    function playNote(note) {
        if (pressedKeys.isEmpty(note)) {
            const noteAudio = new Audio(document.getElementById(note).src)
            noteAudio.play();   
        }
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
    

    // генерируем массив звуков
    const audioFilesUpper = UPPER_NOTES.map((note, index) => {
        return (
            <audio 
            id={note}
            key={index}
            src={`../keybank/upperNotes/${note}.mp3`}
            />
        )
    })

    const audioFilesLower = LOWER_NOTES.map((note, index) => {
        return (
            <audio 
            id={note}
            key={index}
            src={`../keybank/lowerNotes/${note}.mp3`}
            
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

        {audioFilesUpper}
        {audioFilesLower}
        
    </div>
  )
}
