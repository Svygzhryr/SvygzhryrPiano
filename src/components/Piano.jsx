/* eslint-disable no-unused-expressions */
import {React, useState, useEffect, useRef, useMemo, useCallback} from 'react'
import * as Tone from 'tone'
import styles from '../css/piano.module.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY} from '../global/constants'
import UI from './UI';
import sample1 from '../samples/organ2.mp3'
import sample2 from '../samples/cowbell2.wav'


// здесь пришлось пойти на компромисс между разрывами звука и задержкой при нажатии
// начиная со значения 0.05 задержка становится заметной, как и пердёж если ставить ниже 0.02
Tone.context.lookAhead = 0.02;

let FXreverb = new Tone.Reverb(0.1).toDestination();
let FXdelay = new Tone.FeedbackDelay('6n', 0.2).toDestination();
let FXtremolo = new Tone.Vibrato(0.2, 0.8).toDestination();
let detune;

// let synth = new Tone.Sampler({

// 	urls: {
// 		"C4": "C4.mp3",
// 		"D#4": "Ds4.mp3",
// 		"F#4": "Fs4.mp3",
// 		"A4": "A4.mp3",
// 	},
// 	release: 1,
// 	baseUrl: "https://tonejs.github.io/audio/salamander/",

//     // urls: {
//     //     A1: "A1.mp3"
//     // },
//     // baseUrl: "https://tonejs.github.io/audio/casio/",

// })
// инициализация синтезатора(-ов) и его эффектов
let synth = new Tone.PolySynth(Tone.Synth).connect(FXreverb, FXtremolo).toDestination();
let monosynth = new Tone.PolySynth(Tone.MonoSynth).connect(FXreverb, FXtremolo).toDestination();
let fmsynth = new Tone.PolySynth(Tone.FMSynth).connect(FXreverb, FXtremolo).toDestination();
let amsynth = new Tone.PolySynth(Tone.AMSynth).connect(FXreverb, FXtremolo).toDestination();
let membranesynth = new Tone.PolySynth(Tone.MembraneSynth).connect(FXreverb, FXtremolo).toDestination();

let sampler = new Tone.Sampler({
        urls: {
            A2: sample1,
        }
}).connect(FXreverb, FXtremolo).toDestination();

const instruments = [synth, monosynth, fmsynth, amsynth, membranesynth, sampler];
instruments.forEach((e) => {
    e.set({
        oscillator: {
            type: 'sine',
        },
    
        detune: 1200,  
        // portamento: Seconds;
        // onsilence: onSilenceCallback;
        
        envelope: {
            atatck: 0.01,   
            sustain: 0.5,
            decay: 0.5,
            release: 0.5,
        }
    })
})
Tone.start()
let activeSynth;
var allowed = true;

export default function Piano() {
    let keyClassName;
    const [pressedKeys, setPressedKeys] = useState([]);
    const [volume, setVolume] = useState(localStorage.getItem('volume') || 0);
    const [showText, setShowText] = useState(false);

    const [reverb, setReverb] = useState(0);
    const [delayDuration, setDelayDuration] = useState(0);
    const [delayFeedback, setDelayFeedback] = useState(0);
    const [detune, setDetune] = useState(1200);
    const [instrument, setInstrument] = useState(false);
    const [switchInstrument, setSwitchInstrument] = useState('synth');

    const [attack, setAttack] = useState(0.01);
    const [decay, setDecay] = useState(0.5);
    const [sustain, setSustain] = useState(0.5);
    const [release, setRelease] = useState(0.5);

    const [hold, setHold] = useState('false')

    const [waveShape, setWaveShape] = useState('sine');

    const handleInstruments = (i, e) => {
        setSwitchInstrument(i);
        activeSynth.triggerRelease();
        e.classList.add('.instrument_active');
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
          
        activeSynth.volume.value = volume;
        hold ?
        activeSynth.triggerAttack(note) :
        (activeSynth === sampler ? activeSynth.triggerAttackRelease(note) : 
        activeSynth.triggerAttackRelease(note, '8n'))
    }


    // отпускание клавиши
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyUp = (e) => {
        
        allowed = true;
        const key = e.key.toLowerCase();
        const shittySharp = CSS.escape(KEY_TO_NOTE[key]);

        hold ? 
        activeSynth.triggerRelease(KEY_TO_NOTE[key]) :
        null

        const button = document.querySelector(`[note=${shittySharp}]`);
        try {
            button.classList.contains(styles.button_active) ? 
            button.classList.remove(styles.button_active) :
            button.classList.remove(styles.button_sharp_active);

        } catch {
            return null
        }
    }

    const handleMouseDown = (e) => {
        let note = e.target.getAttribute('note')
        console.log(note);
        note = CSS.escape(note);

        const button = document.querySelector(`[note=${note}]`);

        try {
            button.classList.contains(styles.button) ? 
            button.classList.add(styles.button_active) : 
            button.classList.add(styles.button_sharp_active);

        } catch {
            return null
        }

        if (note === undefined) {
            return
        }

        activeSynth.volume.value = volume;
        activeSynth.triggerAttack(note);
        console.log(note);
    }

    const handleMouseUp = (e) => {
        let note = e.target.getAttribute('note')
        console.log(note);

        note = CSS.escape(note);
        console.log(note);

        activeSynth.triggerRelease(note);
        const button = document.querySelector(`[note=${note}]`);
        try {
            button.classList.contains(styles.button_active) ? 
            button.classList.remove(styles.button_active) :
            button.classList.remove(styles.button_sharp_active);

        } catch {
            return null
        }

        
    }

        // вешаем события
        useEffect(() => {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            window.addEventListener('mousedown', handleMouseDown)
            window.addEventListener('mouseup', handleMouseUp)
            window.addEventListener('mouseleave', handleMouseUp)
            window.addEventListener('mouseout', handleMouseUp)
            
            setShowText(JSON.parse(localStorage.getItem('text')))
            activeSynth.set({
                detune: detune,

                oscillator: {
                    type: waveShape,
                },

                envelope: {
                    attack: attack,
                    decay: decay,
                    sustain: sustain,
                    release: release,
                },

            })  
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
                window.addEventListener('mouseleave', handleMouseUp)
                window.addEventListener('mouseout', handleMouseUp)
            }
        }, [handleKeyDown, handleKeyUp, detune, handleMouseDown, handleMouseUp])

    switch (switchInstrument) {
        default: return null;
        case 'synth': {
            activeSynth = synth;
            break
        }
        case 'monosynth': {
            activeSynth = monosynth;
            break
        }
        case 'fmsynth': {
            activeSynth = fmsynth;
            break
        }
        case 'amsynth': {
            activeSynth = amsynth;
            break
        }
        case 'membranesynth': {
            activeSynth = membranesynth;
            break
        }
        case 'sampler': {
            activeSynth = sampler;
            break
        }
    }

    // смена громкости
    const changeVolume = (volume) => {
        setVolume(volume);
        localStorage.setItem('volume', volume);
    }

    let timerId = null;
    const changeReverb = (reverb) => {
        setReverb(reverb);
        // неудавшаяся попытка оптимизироать смену ревёрба
        // возможно понадобится useMemo
        clearTimeout(timerId)
        timerId = setTimeout(() => { 
            FXreverb.decay = reverb;
        }, 500)
    }

    // тугл текста
    const generateText = (note) => {
        return showText ? NOTE_TO_KEY[note] : null 
    }

    const equipSample = (e) => {
        sampler = new Tone.Sampler({
            urls: {
                A2: sample2,
            }
        }).connect(FXreverb, FXtremolo).toDestination();
        console.log(sample2)
        console.log(e.target.files[0])
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

    const UIprops = {
        activeSynth,
        volume,
        changeVolume,
        showText,
        setShowText,
        reverb,
        changeReverb,
        delayDuration,
        delayFeedback,
        detune,
        setDetune,
        instrument,
        setInstrument,
        attack,
        decay,
        sustain,
        release,
        setAttack,
        setDecay,
        setSustain,
        setRelease,
        waveShape,
        setWaveShape,
        hold,
        setHold
    }

// чёт многовато кода для одного компонента
// надо бы декомпозировать
  return (

    <div className={styles.piano}>
        <UI 
            {...UIprops}
        />

        <div className={`${styles.instruments} ${instrument ? styles.inactive : ''}`}>
            <button onClick={(e) => {handleInstruments('synth', e.target)}} className={`${styles.instrument_item} ${switchInstrument == 'synth' ? styles.instrument_active : ''}`}>Synth</button>
            <button onClick={(e) => {handleInstruments('monosynth', e.target)}} className={`${styles.instrument_item} ${switchInstrument == 'monosynth' ? styles.instrument_active : ''}`}>MonoSynth</button>
            <button onClick={(e) => {handleInstruments('fmsynth', e.target)}} className={`${styles.instrument_item}  ${switchInstrument == 'fmsynth' ? styles.instrument_active : ''}`}>FMSynth</button>
            <button onClick={(e) => {handleInstruments('amsynth', e.target)}} className={`${styles.instrument_item}  ${switchInstrument == 'amsynth' ? styles.instrument_active : ''}`}>AMSynth</button>
            <button onClick={(e) => {handleInstruments('membranesynth', e.target)}} className={`${styles.instrument_item} ${switchInstrument == 'membranesynth' ? styles.instrument_active : ''}`}>MemSynth</button>
            <button onClick={(e) => {handleInstruments('sampler', e.target)}} className={`${styles.instrument_item} ${switchInstrument == 'sampler' ? styles.instrument_active : ''}`}>Sampler
                <input onChange={equipSample} type="file" name="Sample" id="" className={styles.sample_input}/>
            </button>
        </div>

        <div className={`${styles.piano_wrapper} ${styles.active} ${instrument ? '' : styles.inactive}`}>
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
