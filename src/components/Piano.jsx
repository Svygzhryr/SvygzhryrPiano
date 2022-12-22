import {React, useState, useEffect, useRef} from 'react'
import '../css/piano.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS} from '../global/constants'
import { AUDIO } from '../global/soundBank';
import UI from './UI';



export default function Piano() {
    const [pressedKeys, setPressedKeys] = useState([]);
    const [volume, setVolume] = useState(0.5);
    let keyClassName;

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

        // вводим соответствие между нажаотй клавишей и клавишей в коде
        const key = e.key.toLowerCase();
        // вкидываем нажатую клавишу в массив
        const updatePressedKeys = [setPressedKeys(pressedKeys)]
        // проверяем правильная ли вкинутая в массив клавиша
        console.log(pressedKeys)
        if (!updatePressedKeys.includes(key.toLowerCase()) && VALID_KEYS.includes(key.toLowerCase)) {
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

    // проигрыш звука
    function playNote(note) {
        if (note === undefined) {
            return null
        }  
        const noteAudio = new Audio(AUDIO[note]);
        noteAudio.volume = volume;
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

    function changeVolume() {
        setVolume(volume);
    }

  return (
    <div className='piano'>
        <UI changeVolume={changeVolume} />
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
