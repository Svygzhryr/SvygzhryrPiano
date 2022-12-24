import {React, useState, useEffect, useRef} from 'react'
import '../css/piano.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS} from '../global/constants'
import { AUDIO } from '../global/soundBank';
import UI from './UI';



export default function Piano() {
    const [pressedKeys, setPressedKeys] = useState([]);
    const [volume, setVolume] = useState(0.5);
    let keyClassName;

    function changeVolume(volume) {
        setVolume(volume);
    }



    // вешаем события
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown])

    // нажатие клавиши
    function handleKeyDown(e) {
        if (e.repeat) {
            return;
        }

        // вводим соответствие между нажаотй клавишей и клавишей в коде
        const key = e.key.toLowerCase();
        playNote(KEY_TO_NOTE[key]);
    }

    // отпускание клавиши
    // function handleKeyUp(e) {

    // }

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
        // noteAudio.volume = (+volume/100).toFixed(2);
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
            />
        )
    })

  return (
    <div className='piano'>
        <UI volume={volume} changeVolume={changeVolume} />
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
