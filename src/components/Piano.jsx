import {React, useState, useEffect, useRef, useMemo} from 'react'
import useScript from '../hooks/useScript';
import * as Tone from 'tone'
import '../css/piano.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS, COLORS} from '../global/constants'
import UI from './UI';



export default function Piano() {
    const [pressedKeys, setPressedKeys] = useState([]);
    const [volume, setVolume] = useState(0);
    const [showText, setShowText] = useState(true);
    const vol = new Tone.Volume(volume).toDestination();
    const synth = new Tone.Synth().connect(vol);
    let keyClassName;
    

    function changeVolume(volume) {
        setVolume(volume);
    }
        
        // вешаем события
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp,])

        // нажатие клавиши
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleKeyDown(e) {
    if (e.repeat) return

    // вводим соответствие между нажатой клавишей и клавишей в коде
    const key = e.key.toLowerCase();
    const shittySharp = CSS.escape(KEY_TO_NOTE[key]);
    const button = document.querySelector(`[note=${shittySharp}]`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleKeyUp(e) {

        const key = e.key.toLowerCase();
        const shittySharp = CSS.escape(KEY_TO_NOTE[key]);
        const button = document.querySelector(`[note=${shittySharp}]`);
        try {
            button.classList.contains('button_active') ? 
            button.classList.remove('button_active') :
            button.classList.remove('button_sharp_active');

        } catch {
            return null
        }
    }

    // проигрыш звука
    async function playNote(note) {
        if (note === undefined) {
            return
        }  
        // 'медленная' подгрузка, но без прерывания
        // const noteAudio = new Audio(AUDIO[note]);
        // noteAudio.volume = +volume;
        // noteAudio.play();   

        // 'быстрая подгрузка, но с прерыванием'
        synth.triggerAttackRelease(note , '8n')

        // let sound = audioFiles[AUDIO_TO_INDEX[note]];
        // sound.volume = +volume;
        // sound.currentTime = 0;
        // sound.play();

    }

    const themeChange = (e) => {
        const root = document.querySelector(':root');
        let rootStyles = getComputedStyle(root);
        const button = e.target;
        switch (true) {
            default: return null;
            case button.classList.contains('theme_1'): {
                root.style.setProperty('--primary_background', COLORS.black_background)
                root.style.setProperty('--primary_button', COLORS.black_button)
                root.style.setProperty('--primary_sharp', COLORS.black_sharp)
                root.style.setProperty('--primary_button_active', COLORS.black_button_active)
                root.style.setProperty('--primary_sharp_active', COLORS.black_sharp_active)
                break
            }

            case button.classList.contains('theme_2'): {
                root.style.setProperty('--primary_background', COLORS.purplish_background)
                root.style.setProperty('--primary_button', COLORS.purplish_button)
                root.style.setProperty('--primary_sharp', COLORS.purplish_sharp)
                root.style.setProperty('--primary_button_active', COLORS.purplish_button_active)
                root.style.setProperty('--primary_sharp_active', COLORS.purplish_sharp_active)
                break
            }

            case button.classList.contains('theme_3'): {
                root.style.setProperty('--primary_background', COLORS.reddish_background)
                root.style.setProperty('--primary_button', COLORS.reddish_button)
                root.style.setProperty('--primary_sharp', COLORS.reddish_sharp)
                root.style.setProperty('--primary_button_active', COLORS.reddish_button_active)
                root.style.setProperty('--primary_sharp_active', COLORS.reddish_sharp_active)
                break
            }

            case button.classList.contains('theme_4'): {
                root.style.setProperty('--primary_background', COLORS.bluish_background)
                root.style.setProperty('--primary_button', COLORS.bluish_button)
                root.style.setProperty('--primary_sharp', COLORS.bluish_sharp)
                root.style.setProperty('--primary_button_active', COLORS.bluish_button_active)
                root.style.setProperty('--primary_sharp_active', COLORS.bluish_sharp_active)
                break
            }
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
        themeChange={themeChange}
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

        </div>
        
    </div>
  )
}
