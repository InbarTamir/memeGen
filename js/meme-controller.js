'use strict';

function onAddLine() {
    var elTxt = document.querySelector('[name=line-txt]');
    addNewLine();
    elTxt.value = '';
    drawCanvas();
}

function onDeleteLine() {
    deleteLine();
    drawCanvas();
}

function onChangeLineTxt(elTxt) {
    changeLineText(elTxt.value);
    drawCanvas();
}

function onSwitchLines() {
    switchLine();
    drawCanvas();
}

function onMoveLine(elBtn) {
    var value = +elBtn.dataset.val;
    moveLine(value);
    drawCanvas();
}

function onChangeFontSize(elBtn) {
    var value = +elBtn.dataset.val;
    changeFontSize(value);
    drawCanvas();
}

function onTextAlign(elBtn) {
    var dir = elBtn.dataset.dir;
    changeTextAlign(dir);
    drawCanvas();
}

function setSelectedLineInput(line) {
    document.querySelector('[name=line-txt]').value = line.txt;
}