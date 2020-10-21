'use strict';
const STORAGE_MEMES_KEY = 'memesDB';
const POSITIONS = [{ x: 225, y: 50 }, { x: 225, y: 420 }, { x: 225, y: 225 }];

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemes = _loadMemes();
var gMeme;

function setMeme(imgId) {
    var currMeme = (gMemes.length) ? gMemes.find((meme) => meme.selectedImgId === imgId) : null;
    if (!currMeme) {
        currMeme = _createMeme(imgId);
        gMemes.push(currMeme);
        _saveMemes(gMemes);
    }
    gMeme = currMeme;
    var selectedLine = (gMeme.lines.length) ? gMeme.lines[gMeme.selectedLineIdx] : {txt: ''};
    setSelectedLineInput(selectedLine);
}

function changeLineText(txt) {
    if (!gMeme.lines.length) gMeme.lines.push(_createLine());
    
    var currLineIdx = gMeme.selectedLineIdx;
    if (!txt.trim().length) {
        gMeme.lines.splice(currLineIdx, 1);
        gMeme.selectedLineIdx = 0;
    } else gMeme.lines[currLineIdx].txt = txt;

    _saveMemes(gMemes);
}

function addNewLine() {
    var emptyLine = gMeme.lines.find(line => line.txt === '');
    if (!emptyLine) {
        gMeme.lines.push(_createLine());
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    _saveMemes(gMemes);
    setSelectedLineInput(gMeme.lines[gMeme.selectedLineIdx]);
}

function moveLine(value) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    var nextPos = currLine.pos.y + value;
    if (nextPos >= 0 && nextPos < gCanvas.height) {
        currLine.pos.y = nextPos;
        _saveMemes(gMemes);
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
    _saveMemes(gMemes);
    setSelectedLineInput(gMeme.lines[gMeme.selectedLineIdx]);
    drawCanvas();
}

function changeFontSize(value) {
    gMeme.lines[gMeme.selectedLineIdx].size += value;
    _saveMemes(gMemes);
}

function getMeme() {
    return gMeme;
}

function getLines() {
    return gMeme.lines;
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}

function _createLine() {
    var newPos = POSITIONS[2];
    for (var i = 0; i < 2; i++) {
        let currPos = POSITIONS[i];
        let res = gMeme.lines.findIndex(line => line.pos.x === currPos.x && line.pos.y === currPos.y);
        if (res < 0) {
            newPos = currPos;
            break;
        }
    }
    return {
        txt: '',
        size: 20,
        align: 'center',
        color: 'red',
        pos: newPos
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
        lines: []
    };
}