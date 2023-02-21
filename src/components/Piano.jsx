/* eslint-disable no-unused-expressions */
import {React, useState, useEffect} from 'react'
import * as Tone from 'tone'
import styles from '../css/piano.module.scss'
import { UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY} from '../global/constants'
import UI from './UI';
import sample2 from '../samples/harp.wav'
import debounce from 'lodash/debounce'
import { ToneAudioBuffer } from 'tone';

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
            'A3': sample2,
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
let down = false;
let keyEnabledArray = Array(222).fill(true);
export default function Piano() {
    let keyClassName;
    const [pressedKeys, setPressedKeys] = useState([]);
    const [volume, setVolume] = useState(localStorage.getItem('volume') || 0);
    const [showText, setShowText] = useState(false);
    const [reverb, setReverb] = useState(0.001);
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
    const [activeSample, setActiveSample] = useState('');
    const [waveShape, setWaveShape] = useState('sine');
    const [loading, setLoading] = useState(true);


    const handleInstruments = (i, e) => {
        setSwitchInstrument(i);
        resetSounds();
        e.classList.add('.instrument_active');
    }


    const debounceReverb = debounce((reverb) => handleReverb(reverb), 300)
    const handleReverb = (reverb) => {
        setReverb(reverb)
        FXreverb.decay = reverb;
    }

        // нажатие клавиши
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (e) => {
        if(keyEnabledArray[e.keyCode]) {
            keyEnabledArray[e.keyCode] = false;
        

        // вводим соответствие между нажатой клавишей и клавишей в коде
        const code = e.which;
        const shittySharp = CSS.escape(KEY_TO_NOTE[code]);
        const button = document.querySelector(`[note=${shittySharp}]`);

        try {
            button.classList.contains(styles.button) ? 
            button.classList.add(styles.button_active) : 
            button.classList.add(styles.button_sharp_active);

        } catch {
            return null
        }
        playNote(KEY_TO_NOTE[code]);
        }
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
        
        const code = e.which;
        const shittySharp = CSS.escape(KEY_TO_NOTE[code]);

        hold ? 
        activeSynth.triggerRelease(KEY_TO_NOTE[code]) :
        null

        const button = document.querySelector(`[note=${shittySharp}]`);
        try {
            button.classList.contains(styles.button_active) ? 
            button.classList.remove(styles.button_active) :
            button.classList.remove(styles.button_sharp_active);

        } catch {
            return null
        }
        keyEnabledArray[e.keyCode] = true;
    }

    const handleMouseDown = (e) => {
        let note = e.target.getAttribute('note')
        let shittynote = CSS.escape(note);

        const button = document.querySelector(`[note=${shittynote}]`);

        if (true) {
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
            hold ?
            activeSynth.triggerAttack(note) :
            (activeSynth === sampler ? activeSynth.triggerAttackRelease(note) : 
            activeSynth.triggerAttackRelease(note, '8n'))
        }
    }

    const handleMouseUp = (e) => {
        let note = e.target.getAttribute('note')
        hold ? 
        activeSynth.triggerRelease(note) :
        null
        let shittynote = CSS.escape(note);
        const button = document.querySelector(`[note=${shittynote}]`);
        try {
            button.classList.contains(styles.button_active) ? 
            button.classList.remove(styles.button_active) :
            button.classList.remove(styles.button_sharp_active);

        } catch {
            return null
        }

        
    }

    const resetSounds = () => {
        const buttons = document.querySelectorAll(`[note]`);
        buttons.forEach((e) => {
            e.classList.remove(styles.button_active)
            e.classList.remove(styles.button_sharp_active)
        })
        let all = [...UPPER_NOTES, ...LOWER_NOTES];
        activeSynth.triggerRelease(all);
    }

    const downFunc = (e) => {
        handleMouseDown(e);
        window.addEventListener('mouseover', handleMouseDown);
    }
    const upFunc = (e) => {
        window.removeEventListener('mouseover', handleMouseDown);
        window.removeEventListener('mousedown', handleMouseDown);
        handleMouseUp(e);
    }
    const outFunc = (e) => {
        handleMouseUp(e);
    }

        useEffect(() => {
            setLoading(true);
            ToneAudioBuffer.loaded(setLoading(false));
            return () => {

            }
        }, []);

        // вешаем события
        useEffect(() => {
            window.addEventListener('contextmenu', function(evt) {evt.preventDefault()}, false);
            window.addEventListener('keydown', handleKeyDown, false);
            window.addEventListener('keyup', handleKeyUp, false);
            window.addEventListener('blur', resetSounds);
            // пиздец
            window.addEventListener('mousedown', downFunc)
            window.addEventListener('mouseup', upFunc)
            window.addEventListener('mouseout', outFunc)
            // navigator.requestMIDIAccess()
            // .then(onMIDISuccess, onMIDIFailure);

            // function onMIDISuccess(midiAccess) {
            //     console.log(midiAccess);

            //     var inputs = midiAccess.inputs;
            //     var outputs = midiAccess.outputs;
            // }

            // function onMIDIFailure() {
            //     console.log('Could not access your MIDI devices.');
            // }
            
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
                window.removeEventListener('contextmenu', function(evt) {evt.preventDefault()}, false);
                window.removeEventListener('keydown', handleKeyDown, false);
                window.removeEventListener('keyup', handleKeyUp, false);
                window.removeEventListener('blur', resetSounds);
                // пиздец
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseover', handleMouseDown);

                window.removeEventListener('mousedown', downFunc)
                window.removeEventListener('mouseup', upFunc)
                window.removeEventListener('mouseout', outFunc)
            }
        }, [handleKeyDown, handleKeyUp, detune, handleMouseDown, handleMouseUp, resetSounds, downFunc, upFunc, outFunc])

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

    // тугл текста
    const generateText = (note) => {
        return showText ? NOTE_TO_KEY[note] : null 
    }

    const equipSample = (e) => {
        handleInstruments('sampler', e.target)
        let sourceAux = URL.createObjectURL(e.target.files[0]);
        console.log(e.target.files[0].name)
        let regex = /.((wav)|(ogg)|(mp3))/gi;
        if (e.target.files[0].name.match(regex)) {
        setActiveSample(e.target.files[0].name);
            sampler = new Tone.Sampler({
                urls: {
                    A2: sourceAux,
                }
            }).connect(FXreverb, FXtremolo).toDestination();
            activeSynth = sampler;
            setHold(true);
            resetSounds();
        } else alert('Only files with extentions (.mp3 .ogg .wav) are allowed.')
 
    }

        // генерируем массив клавиш
    const upperKeys = UPPER_NOTES.map((note, index) => {
        // наигениальнейшая проверка на диез и бемоль
        if (note.length > 2 ? keyClassName = styles.button_sharp : keyClassName = styles.button)
        return (
            <button 
            tabIndex='-1'
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
            tabIndex='-1'
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
        debounceReverb,
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
        {loading 
        ? <div className={styles.loader}>
            <div className={styles.loader_inside}></div>
        </div>
        : <div>
        <UI 
            {...UIprops}
        />
        <div className={`${styles.instruments} ${instrument ? styles.inactive : ''}`}>
            <button onClick={(e) => {handleInstruments('synth', e.target)}} className={`${styles.instrument_item} ${switchInstrument == 'synth' ? styles.instrument_active : ''}`}>Synth</button>
            <button onClick={(e) => {handleInstruments('monosynth', e.target)}} className={`${styles.instrument_item} ${switchInstrument == 'monosynth' ? styles.instrument_active : ''}`}>MonoSynth</button>
            <button onClick={(e) => {handleInstruments('fmsynth', e.target)}} className={`${styles.instrument_item}  ${switchInstrument == 'fmsynth' ? styles.instrument_active : ''}`}>FMSynth</button>
            <button onClick={(e) => {handleInstruments('amsynth', e.target)}} className={`${styles.instrument_item}  ${switchInstrument == 'amsynth' ? styles.instrument_active : ''}`}>AMSynth</button>
            <button onClick={(e) => {handleInstruments('membranesynth', e.target)}} className={`${styles.instrument_item} ${switchInstrument == 'membranesynth' ? styles.instrument_active : ''}`}>MemSynth</button>
            <label htmlFor='sample' className={`${styles.instrument_item} ${styles.input_label} ${switchInstrument == 'sampler' ? styles.instrument_active : ''}`}>
                Sampler
                <br/>
                {activeSample !== '' ? activeSample : '.mp3/.wav/.ogg files'}
                <input onChange={equipSample} id='sample' type='file'/>
            </label>
                {/* <input onChange={equipSample} type="file" name="Sample" id="" className={styles.sample_input}/> */}
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
    
    }
    </div>
  )
}
