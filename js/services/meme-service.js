'use strict';
const STORAGE_MEMES_KEY = 'memesDB';

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMeme;
var gMemes = _loadMemes();

function setMeme(imgId) {
    var currMeme = gMemes.find((meme) => meme.id === imgId);
    if (currMeme) gMeme = currMeme
    else { 
        gMemes.push(_createMeme(imgId));
        _saveMemes(gMemes);
    }
}

function addNewLine(txt) {
    var emptyLine = gMeme.lines.find(line => line.txt === '');
    if (emptyLine) emptyLine.txt = txt;
    else {
        gMeme.lines.push(_createLine(txt));
        _saveMemes(gMemes);
    }
}

function getLines() {
    return gMeme.lines;
}

function _createLine(txt) {
    return {
        txt,
        size: 20,
        align: 'center',
        color: 'red',
        pos: { x: 225, y: 225 }
    };
}

function _loadMemes() {
    var memes = loadFromStorage(STORAGE_MEMES_KEY);
    return memes || [];
}

function _saveMemes(memes) {
    saveToStorage(STORAGE_MEMES_KEY, memes);
}

function _createMeme(imgId) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 20,
                align: 'center',
                color: 'red',
                pos: { x: 225, y: 50 }
            },
            {
                txt: '',
                size: 20,
                align: 'center',
                color: 'red',
                pos: { x: 225, y: 420 }
            }
        ]
    };
}