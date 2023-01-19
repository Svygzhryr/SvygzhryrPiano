import {React, useState, useEffect, useRef, useMemo, useCallback} from 'react'
import useScript from '../hooks/useScript';
import * as Tone from 'tone'
import styles from '../css/piano.module.scss'
import { CSSTransition } from 'react-transition-group';
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, COLORS} from '../global/constants'
import UI from './UI';

// инициализация синтезатора(-ов) и его эффектов
let FXreverb = new Tone.Reverb(5).toDestination();
let synth = new Tone.Sampler({

	urls: {
		"C4": "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		"A4": "A4.mp3",
	},
	release: 1,
	baseUrl: "https://tonejs.github.io/audio/salamander/",

    // urls: {
    //     A1: "A1.mp3"
    // },
    // baseUrl: "https://tonejs.github.io/audio/casio/",

}).connect(FXreverb).toDestination();
synth.set({
    detune: -1200,  
    // portamento: Seconds;
    // onsilence: onSilenceCallback;
    
    envelope: {
        atatck: 0.25,
        // в теории здесь можно бахнуть интерфейс с настройками кривой
        // decay: Time;
        // sustain: NormalRange;
        // release: Time;
        // attackCurve: EnvelopeCurve;
        // releaseCurve: EnvelopeCurve;
        // decayCurve: BasicEnvelopeCurve;
    }
})

// const synth = new Tone.PolySynth(Tone.AMSynth, 2).connect(FXreverb).toDestination();


// после фикса  первостепенных проблем планируется добавить инициализацию нескольких инструментов
// и возможность выбора оных последством нажатия кнопок 

// здесь пришлось пойти на компромисс между разрывами звука и задержкой при нажатии
// начиная со значения 0.05 задержка становится заметной, как и пердёж если ставить ниже 0.02
Tone.context.lookAhead = 0.02;


    // всё это должно быть декомпозировано
    // фильтры и эффекты
    // const FXchorus = new Tone.Chorus(5, 2.5, 1).toDestination().start();

    // const FXautoFilter = new Tone.AutoFilter("8n").toDestination().start();
    // const FXautoWah = new Tone.AutoWah(50, 6, -30).toDestination();
    // const FXcrusher = new Tone.BitCrusher(4).toDestination();
    // const FXcheby = new Tone.Chebyshev(50).toDestination();
    // const FXdist = new Tone.Distortion(0.8).toDestination();
    // const FXdelay = new Tone.FeedbackDelay("8n", 0.6).toDestination();
    // const FXfreeverb = new Tone.Freeverb().toDestination();
    // const FXJCreverb = new Tone.JCReverb(0.4).toDestination();
    // const FXphaser = new Tone.Phaser({
    //     frequency: 15,
    //     octaves: 5,
    //     baseFrequency: 300
    // }).toDestination();      
    // const FXpingPong = new Tone.PingPongDelay("6n", 0.2).toDestination();
    // FXfreeverb.dampening = 2000;
    // FXautoWah.Q.value = 2;


export default function Piano() {
    let keyClassName;
    const [pressedKeys, setPressedKeys] = useState([]);
    const [volume, setVolume] = useState(localStorage.getItem('volume') || 0);
    const [showText, setShowText] = useState(false);
    const [instrument, setInstrument] = useState('');
    const [reverb, setReverb] = useState(0);



    // смена громкости
    const changeVolume = (volume) => {
        setVolume(volume);
        localStorage.setItem('volume', volume);
    }

    const changeReverb = (reverb) => {
        setReverb(reverb);
        FXreverb.decay = reverb;
        synth.connect(FXreverb);
        console.log(reverb)
    }

    // нажатие клавиши
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (e) => {
        if (e.repeat) return

        // вводим соответствие между нажатой клавишей и клавишей в коде
        const key = e.key.toLowerCase();
        const shittySharp = CSS.escape(KEY_TO_NOTE[key]);
        const button = document.querySelector(`[note=${shittySharp}]`);
        try {
            button.classList.contains(styles.button) ? 
            button.classList.add(styles.button_active) : 
            button.classList.add(styles.button_sharp_active);

        } catch {
            return null
        }
        playNote(KEY_TO_NOTE[key]);
    }

    // activeInstrument function
    // проигрыш звука
    async function playNote(note) {
        if (note === undefined) {
            return
        }  
        synth.volume.value = volume;
        synth.triggerAttack(note);
    }

    // отпускание клавиши
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyUp = (e) => {
        
        const key = e.key.toLowerCase();
        const shittySharp = CSS.escape(KEY_TO_NOTE[key]);
        const button = document.querySelector(`[note=${shittySharp}]`);
        try {
            button.classList.contains(styles.button_active) ? 
            button.classList.remove(styles.button_active) :
            button.classList.remove(styles.button_sharp_active);

        } catch {
            return null
        }
        synth.triggerRelease(KEY_TO_NOTE[key]);
    }

    // вешаем события
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        setShowText(JSON.parse(localStorage.getItem('text')))
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp])

    // тугл текста
    const generateText = (note) => {
        return showText ? NOTE_TO_KEY[note] : null 
    }



        // генерируем массив клавиш
    const upperKeys = UPPER_NOTES.map((note, index) => {
        // наигениальнейшая проверка на диез и бемоль
        if (note.length > 2 ? keyClassName = styles.button_sharp : keyClassName = styles.button)
        return (
            <button 
            key={index} 
            note={note} 
            className={keyClassName} 
            pressedkeys={pressedKeys}
            volume={volume}
            >
            {generateText(note)}
            </button>
        )  
    })

    const lowerKeys = LOWER_NOTES.map((note, index) => {
        if (note.length > 2 ? keyClassName = styles.button_sharp : keyClassName = styles.button)
        return (
            <button 
            key={index}     
            note={note} 
            className={keyClassName}
            pressedkey={pressedKeys}
            volume={volume}
            >
            {generateText(note)}
            </button>
        )
    })


  return (

    <div className={styles.piano}>
        <UI 
        volume={volume} 
        changeVolume={changeVolume} 
        showText={showText}
        setShowText={setShowText}
        reverb={reverb}
        changeReverb={changeReverb}
        />

        <div className={styles.piano_wrapper}>
            <div className={styles.upper_keyboard}>
                <div className={styles.upper_buttons}>
                    {upperKeys}
                </div>
            </div>
            <div className={styles.lower_keyboard}>
                <div className={styles.lower_buttons}>
                    {lowerKeys}
                </div>
            </div>

        </div>
        
    </div>
  )
}
