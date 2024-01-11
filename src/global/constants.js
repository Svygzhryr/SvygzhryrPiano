const UPPER_NOTES = [
    'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 
    'C3', 'C#3', 'D3', 'D#3', 'E3', 
];

const LOWER_NOTES = [
    'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 
    'G4', 'G#4', 'A4', 
]

const KEY_TO_NOTE = {
    81: 'C2',
    50: 'C#2',
    87: 'D2',
    51: 'D#2',
    69: 'E2',
    82: 'F2',
    53: 'F#2',
    84: 'G2',
    54: 'G#2',
    89: 'A2',
    55: 'A#2',
    85: 'B2',
    73: 'C3',
    57: 'C#3',
    79: 'D3',
    48: 'D#3',
    80: 'E3',

    90: 'F3',
    83: 'F#3',
    88: 'G3',
    68: 'G#3',
    67: 'A3',
    70: 'A#3',
    86: 'B3',
    66: 'C4',
    72: 'C#4',
    78: 'D4',
    74: 'D#4',
    77: 'E4',
    188: 'F4',
    76: 'F#4',
    190: 'G4',
    59: 'G#4',
    191: 'A4',
}

const NOTE_TO_KEY = {
    'C2': 'q',
   'C#2': '2',
    'D2': 'w',
    'D#2': '3',
    'E2': 'e',
    'F2': 'r',
    'F#2': '5',
    'G2': 't',
    'G#2': '6',
    'A2': 'y',
    'A#2': '7',
    'B2': 'u',
    'C3': 'i',
    'C#3': '9',
    'D3': 'o',
    'D#3': '0', 
    'E3': 'p',


    'F3': 'z',
    'F#3': 's',
    'G3': 'x',
    'G#3': 'd',
    'A3': 'c',
    'A#3': 'f',
    'B3': 'v',
    'C4': 'b',
    'C#4': 'h',
    'D4': 'n',
    'D#4': 'j',
    'E4': 'm',
    'F4': ',',
    'F#4': 'l',
    'G4': '.',
    'G#4': ';',
    'A4': '/',

}

const COLORS = {
    black_background: '#1E1E1E',
    black_button: '#F2F2F2',
    black_sharp: '#171717',
    black_button_active: '#9D9D9D',
    black_sharp_active: '#2D2D2D',

    bluish_background: '#0C002D',    
    bluish_button: '#C2C1EF',
    bluish_sharp: '#03001E',
    bluish_button_active: '#4F42AE',
    bluish_sharp_active: '#0C0043',

    reddish_background: '#320800',
    reddish_button: '#EEBBB7',
    reddish_sharp: '#290000',
    reddish_button_active: '#F24E4E',
    reddish_sharp_active: '#880000',

    purplish_background: '#2F002A',
    purplish_button: '#E8CAF2',
    purplish_sharp: '#17001D',
    purplish_button_active: '#D8B220',   
    purplish_sharp_active: '#4c3401',
}

const INSTRUMENTS = {
    synth: 'synth',
    monosynth: 'monosynth',
    fmsynth: 'fmsynth',
    amsynth: 'amsynth',
    polysynth: 'polysynth',
    sample: 'sample',

}

export {UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, COLORS};
    