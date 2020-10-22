'use strict';
const STORAGE_MEMES_KEY = 'memesDB';
const POSITIONS = [{ x: 225, y: 50 }, { x: 225, y: 420 }, { x: 225, y: 225 }];

var gMemes = _loadMemes();
var gMeme;

function setMeme(imgId) {
    var currMeme = (gMemes.length) ? gMemes.find((meme) => meme.selectedImgId === imgId) : null;
    if (!currMeme) {
        currMeme = _createMeme(imgId);
        gMemes.push(currMeme);
        _saveMemes();
    }
    gMeme = currMeme;
    var selectedLine = (gMeme.lines.length) ? gMeme.lines[gMeme.selectedLineIdx] : {txt: ''};
    setSelectedLineInput(selectedLine);
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
    var txt = (gMeme.lines.length) ? gMeme.lines[gMeme.selectedLineIdx] : {txt: ''};
    setSelectedLineInput(txt);
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

function changeTextAlign(dir) {
    gMeme.lines[gMeme.selectedLineIdx].align = dir;
    _saveMemes();
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
        size: 40,
        align: 'center',
        color: 'white',
        stroke: 'black',
        pos: newPos
    };
}

function _loadMemes() {
    var memes = loadFromStorage(STORAGE_MEMES_KEY);
    return memes || [];
}

function _saveMemes() {
    saveToStorage(STORAGE_MEMES_KEY, gMemes);
}

function _createMeme(imgId) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    };
}