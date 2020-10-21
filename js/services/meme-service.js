'use strict';
const STORAGE_MEMES_KEY = 'memesDB';

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemes = _loadMemes();
var gMeme;
var gSelectedLineIdx;

function setMeme(imgId) {
    var currMeme = (gMemes.length) ? gMemes.find((meme) => meme.selectedImgId === imgId) : null;
    if (!currMeme) {
        currMeme = _createMeme(imgId);
        gMemes.push(currMeme);
        _saveMemes(gMemes);
    }
    gMeme = currMeme;
    gSelectedLineIdx = gMeme.selectedLineIdx;
    setSelectedLineInput(gMeme.lines[gSelectedLineIdx]);
}

function changeLineText(txt) {
    if (!txt.trim().length && gSelectedLineIdx > 1) {
        gMeme.lines.splice(gSelectedLineIdx, 1);
        gMeme.selectedLineIdx = 0;
        gSelectedLineIdx = 0;
    } else gMeme.lines[gSelectedLineIdx].txt = txt;

    _saveMemes(gMemes);
}

function addNewLine() {
    var emptyLine = gMeme.lines.find(line => line.txt === '');
    if (emptyLine) emptyLine.txt = '';
    else {
        gMeme.lines.push(_createLine());
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    _saveMemes(gMemes);
    setSelectedLineInput(gMeme.lines[gSelectedLineIdx]);
}

function moveLine(value) {
    var currLine = gMeme.lines[gSelectedLineIdx];
    var nextPos = currLine.pos.y + value;
    if (nextPos >= 0 && nextPos < gCanvas.height) {
        currLine.pos.y = nextPos;
        _saveMemes(gMemes);
    }
}

function switchLine() {
    var nextLineIdx = 0;
    if (gSelectedLineIdx + 1 < gMeme.lines.length) nextLineIdx = gSelectedLineIdx + 1;
    if (gMeme.lines[nextLineIdx].txt.length) {
        gMeme.selectedLineIdx = nextLineIdx;
        gSelectedLineIdx = nextLineIdx;
    }
    
    _saveMemes(gMemes);
    setSelectedLineInput(gMeme.lines[gMeme.selectedLineIdx]);
    drawCanvas();
}

function changeFontSize(value) {
    gMeme.lines[gSelectedLineIdx].size += value;
    _saveMemes(gMemes);
}

function getMeme() {
    return gMeme;
}

function getLines() {
    return gMeme.lines;
}

function getSelectedLineIdx() {
    return gSelectedLineIdx;
}

function _createLine() {
    return {
        txt: '',
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