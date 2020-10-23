'use strict';
const STORAGE_MEMES_KEY = 'memesDB';
const STORAGE_MEMES_LAST_ID = 'memesLastIdDB';

var gPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
var gMemes = _loadMemes();
var gMemesLastId = _loadMemesLastId();
var gMeme;

function setMeme(imgId, type) {
    var currMeme;
    if (type === 'modified') currMeme = (gMemes.length) ? gMemes.find((meme) => meme.id === +imgId) : null;
    if (!currMeme || type === 'new') {
        currMeme = _createMeme(+imgId);
        gMemes.push(currMeme);
        _saveMemesLastId();
        _saveMemes();
    }
    gMeme = currMeme;
    var selectedLine = (gMeme.lines.length) ? gMeme.lines[gMeme.selectedLineIdx] : { txt: '' };
    setSelectedLineInput(selectedLine);
}

function setPositions() {
    gPositions = getCanvasPositions();
}

function changeLineText(txt) {
    if (!gMeme.lines.length) gMeme.lines.push(_createLine());

    var currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines[currLineIdx].txt = txt;

    _saveMemes();
}

function addNewLine() {
    var emptyLine = gMeme.lines.find(line => line.txt === '');
    if (!emptyLine) {
        gMeme.lines.push(_createLine());
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    _saveMemes();
    setSelectedLineInput(gMeme.lines[gMeme.selectedLineIdx]);
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
    _saveMemes();
    var txt = (gMeme.lines.length) ? gMeme.lines[gMeme.selectedLineIdx] : { txt: '' };
    setSelectedLineInput(txt);
}

function deleteMeme(imgId) {
    var memeIdx = gMemes.findIndex(meme => meme.id === imgId);
    if (memeIdx) {
        gMemes.splice(memeIdx, 1);
        _saveMemes();
    }
}

function moveLine(value) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    var nextPos = currLine.pos.y + value;
    if (nextPos >= 0 && nextPos < gCanvas.height) {
        currLine.pos.y = nextPos;
        _saveMemes();
    }
}

function switchLine() {
    var currLineIdx = gMeme.selectedLineIdx;
    var nextLineIdx = 0;
    if (currLineIdx + 1 < gMeme.lines.length) nextLineIdx = currLineIdx + 1;
    if (gMeme.lines[nextLineIdx].txt.length) {
        gMeme.selectedLineIdx = nextLineIdx;
        currLineIdx = nextLineIdx;
    }
    _saveMemes();
    setSelectedLineInput(gMeme.lines[gMeme.selectedLineIdx]);
}

function changeFontSize(value) {
    gMeme.lines[gMeme.selectedLineIdx].size += value;
    _saveMemes();
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font;
    _saveMemes();
}

function toggleStroke() {
    gMeme.lines[gMeme.selectedLineIdx].stroke = (gMeme.lines[gMeme.selectedLineIdx].stroke === 'black') ? 'transparent' : 'black';
    _saveMemes();
}

function changeTextAlign(dir) {
    gMeme.lines[gMeme.selectedLineIdx].align = dir;
    _saveMemes();
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    _saveMemes();
}

function getMeme() {
    return gMeme;
}

function getMemeId() {
    return gMeme.id;
}

function getMemes() {
    return gMemes;
}

function getLines() {
    return gMeme.lines;
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}

function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx;
}

function getSelectedLineFont() {
    return (gMeme.lines.length && gMeme.selectedLineIdx >= 0) ? gMeme.lines[gMeme.selectedLineIdx].fontFamily : 'Impact';
}

function _createMeme(imgId) {
    return {
        id: ++gMemesLastId,
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [],
    };
}

function _createLine() {
    var newPos = gPositions[2];
    for (var i = 0; i < 2; i++) {
        let currPos = gPositions[i];
        let res = gMeme.lines.findIndex(line => line.pos.x === currPos.x && line.pos.y === currPos.y);
        if (res < 0) {
            newPos = currPos;
            break;
        }
    }
    return {
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        fontFamily: 'Impact',
        stroke: 'black',
        pos: newPos
    };
}

function _loadMemesLastId() {
    return loadFromStorage(STORAGE_MEMES_LAST_ID);
}

function _loadMemes() {
    var memes = loadFromStorage(STORAGE_MEMES_KEY);
    return memes || [];
}

function _saveMemesLastId() {
    saveToStorage(STORAGE_MEMES_LAST_ID, gMemesLastId);
}

function _saveMemes() {
    saveToStorage(STORAGE_MEMES_KEY, gMemes);
}