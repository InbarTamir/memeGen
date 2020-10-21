'use strict';
const STORAGE_MEMES_KEY = 'memesDB';

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMeme;
var gMemes = _loadMemes();

function setMeme(imgId) {
    var currMeme = (gMemes.length) ? gMemes.find((meme) => meme.selectedImgId === imgId) : null;
    if (!currMeme) {
        currMeme = _createMeme(imgId);
        gMemes.push(currMeme);
        _saveMemes(gMemes);
    }
    gMeme = currMeme;
    setSelectedLine(gMeme.lines[gMeme.selectedLineIdx]);
}

function changeLineText(txt) {
    var currLineIdx = gMeme.selectedLineIdx;
    if (!txt.trim().length && currLineIdx > 1) {
        gMeme.lines.splice(currLineIdx, 1);
        gMeme.selectedLineIdx = 0;
    } else gMeme.lines[currLineIdx].txt = txt;

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
    setSelectedLine(gMeme.lines[gMeme.selectedLineIdx]);
}

function switchLine() {
    var currLineIdx = gMeme.selectedLineIdx;
    var nextLineIdx = 0;
    if (currLineIdx + 1 < gMeme.lines.length) nextLineIdx = currLineIdx + 1;
    if (gMeme.lines[nextLineIdx].txt.length) gMeme.selectedLineIdx = nextLineIdx;
    _saveMemes(gMemes);
    setSelectedLine(gMeme.lines[gMeme.selectedLineIdx]);
    drawCanvas();
}

function getMeme() {
    return gMeme;
}

function getLines() {
    return gMeme.lines;
}

function changeFontSize(value) {
    var currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines[currLineIdx].size += value;
    _saveMemes(gMemes);
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