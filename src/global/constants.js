const UPPER_NOTES = [
    'C3', 'Cs3', 'D3', 'Ds3', 'E3', 'F3', 'Fs3', 'G3', 'Gs3', 'A3', 'As3', 'B3', 
    'C4', 'Cs4', 'D4', 'Ds4', 'E4', 
];

const LOWER_NOTES = [
    'F4', 'Fs4', 'G4', 'Gs4', 'A4', 'As4', 'B4', 'C5', 'Cs5', 'D5', 'Ds5', 'E5', 'F5', 'Fs5', 
    'G5', 'Gs5', 'A5', 
]

const KEY_TO_NOTE = {
    'q': 'C3',
    '2': 'Cs3',
    'w': 'D3',
    '3': 'Ds3',
    'e': 'E3',
    'r': 'F3',
    '5': 'Fs3',
    't': 'G3',
    '6': 'Gs3',
    'y': 'A3',
    '7': 'As3',
    'u': 'B3',
    'i': 'C4',
    '9': 'Cs4',
    'o': 'D4',
    '0': 'Ds4',
    'p': 'E4',

    'z': 'F4',
    's': 'Fs4',
    'x': 'G4',
    'd': 'Gs4',
    'c': 'A4',
    'f': 'As4',
    'v': 'B4',
    'b': 'C5',
    'h': 'Cs5',
    'n': 'D5',
    'j': 'Ds5',
    'm': 'E5',
    ',': 'F5',
    'l': 'Fs5',
    '.': 'G5',
    ';': 'Gs5',
    '/': 'A5',
}

const NOTE_TO_KEY = {
    'C3': 'q',
   'Cs3': '2',
    'D3': 'w',
    'Ds3': '3',
    'E3': 'e',
    'F3': 'r',
    'Fs3': '5',
    'G3': 't',
    'Gs3': '6',
    'A3': 'y',
    'As3': '7',
    'B3': 'u',
    'C4': 'i',
    'Cs4': '9',
    'D4': 'o',
    'Ds4': '0', 
    'E4': 'p',


    'F4': 'z',
    'Fs4': 's',
    'G4': 'x',
    'Gs4': 'd',
    'A4': 'c',
    'As4': 'f',
    'B4': 'v',
    'C5': 'b',
    'Cs5': 'h',
    'D5': 'n',
    'Ds5': 'j',
    'E5': 'm',
    'F5': ',',
    'Fs5': 'l',
    'G5': '.',
    'Gs5': ';',
    'A5': '/',

}

const VALID_KEYS = ['q','2','w','3','e','r','5',
't','6','y','7','u','i','9','o','0','p','[',
'=',']','z','s','x','d','c','v','g','b','h','n',
'm','k',',','l','.',';','/']

export {UPPER_NOTES, LOWER_NOTES, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS};
    