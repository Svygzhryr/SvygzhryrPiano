const UPPER_NOTES = [
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 
    'C4', 'C#4', 'D4', 'D#4', 'E4', 
];

const LOWER_NOTES = [
    'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 
    'G5', 'G#5', 'A5', 
]

const KEY_TO_NOTE = {
    'q': 'C3',
    '2': 'C#3',
    'w': 'D3',
    '3': 'D#3',
    'e': 'E3',
    'r': 'F3',
    '5': 'F#3',
    't': 'G3',
    '6': 'G#3',
    'y': 'A3',
    '7': 'A#3',
    'u': 'B3',
    'i': 'C4',
    '9': 'C#4',
    'o': 'D4',
    '0': 'D#4',
    'p': 'E4',

    'z': 'F4',
    's': 'F#4',
    'x': 'G4',
    'd': 'G#4',
    'c': 'A4',
    'f': 'A#4',
    'v': 'B4',
    'b': 'C5',
    'h': 'C#5',
    'n': 'D5',
    'j': 'D#5',
    'm': 'E5',
    ',': 'F5',
    'l': 'F#5',
    '.': 'G5',
    ';': 'G#5',
    '/': 'A5',
}

const NOTE_TO_KEY = {
    'C3': 'q',
   'C#3': '2',
    'D3': 'w',
    'D#3': '3',
    'E3': 'e',
    'F3': 'r',
    'F#3': '5',
    'G3': 't',
    'G#3': '6',
    'A3': 'y',
    'A#3': '7',
    'B3': 'u',
    'C4': 'i',
    'C#4': '9',
    'D4': 'o',
    'D#4': '0', 
    'E4': 'p',


    'F4': 'z',
    'F#4': 's',
    'G4': 'x',
    'G#4': 'd',
    'A4': 'c',
    'A#4': 'f',
    'B4': 'v',
    'C5': 'b',
    'C#5': 'h',
    'D5': 'n',
    'D#5': 'j',
    'E5': 'm',
    'F5': ',',
    'F#5': 'l',
    'G5': '.',
    'G#5': ';',
    'A5': '/',

}

const VALID_KEYS = ['q','2','w','3','e','r','5',
't','6','y','7','u','i','9','o','0','p','[',
'=',']','z','s','x','d','c','v','g','b','h','n',
'm','k',',','l','.',';','/'];

const COLORS = {
    black_background: '#1E1E1E',
    black_button: '#F2F2F2',
    black_sharp: '#171717',
    black_button_active: '#9D9D9D',
    black_sharp_active: '#2D2D2D',

    bluish_background: '#0C002D',    
    bluish_button: '#C2C1EF',
    bluish_sharp: '#04001E',
    bluish_button_active: '#5F52AE',
    bluish_sharp_active: '#0C0054',

    reddish_background: '#430800',
    reddish_button: '#EEBBB7',
    reddish_sharp: '#290000',
    reddish_button_active: '#F25E5E',
    reddish_sharp_active: '#880000',

    purplish_background: '#2F003A',
    purplish_button: '#E8CAF2',
    purplish_sharp: '#17001D',
    purplish_button_active: '#D8B330',   
    purplish_sharp_active: '#5c4501',
}

export {UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS, COLORS};
    