import {React, useState, useEffect, useRef} from 'react'
import '../css/piano.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS} from '../global/constants'
import { AUDIO } from '../global/soundBank';
import UI from './UI';



export default function Piano() {
    const [pressedKeys, setPressedKeys] = useState([]);
    const [volume, setVolume] = useState(0.2);
    const [showText, setShowText] = useState(true);
    let keyClassName;

    function changeVolume(volume) {
        setVolume(volume);
    }
    
    // вешаем события
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return (handleKeyDown, handleKeyUp) => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp])

    // нажатие клавиши
    function handleKeyDown(e) {
        if (e.repeat) {
            return;
        }

        // вводим соответствие между нажаотй клавишей и клавишей в коде
        const key = e.key.toLowerCase();
        const button = document.querySelector(`[note=${KEY_TO_NOTE[key]}]`);
        try {
            button.classList.contains('button') ? 
            button.classList.add('button_active') :
            button.classList.add('button_sharp_active');

        } catch {
           return null
        }
        playNote(KEY_TO_NOTE[key]);
    }

    // отпускание клавиши
        function handleKeyUp(e) {
            const key = e.key.toLowerCase();
            const button = document.querySelector(`[note=${KEY_TO_NOTE[key]}]`);
            try {
                button.classList.contains('button_active') ? 
                button.classList.remove('button_active') :
                button.classList.remove('button_sharp_active');
    
            } catch {
               return null
            }
        }

    // применение стилей
    function keyIsPressed(note, pressedKeys) {
        if (pressedKeys.includes(NOTE_TO_KEY[note])) {
            return true
        } return false
    }

    // проигрыш звука
    function playNote(note) {
        if (note === undefined) {
            return
        }  
        const noteAudio = new Audio(AUDIO[note]);
        noteAudio.volume = +volume;
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
            pressedkeys={pressedKeys}
            volume={volume}
            >
            {showText ? NOTE_TO_KEY[note] : null}
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
            volume={volume}
            >
                {showText ? NOTE_TO_KEY[note] : null}
            </button>
        )
    })

  return (
    <div className='piano'>

        <UI 
        volume={volume} 
        changeVolume={changeVolume} 
        showText={showText}
        setShowText={setShowText}
        />

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

            {/* продам гараж */}

        </div>
        
    </div>
  )
}
