'use strict'

function onAddLine() {
    var elTxt = document.querySelector('[name=line-txt]');
    addNewLine();
    elTxt.value = '';
    drawCanvas();
}

function onChangeLineTxt(elTxt) {
    changeLineText(elTxt.value);
    drawCanvas();
}

function onSwitchLines() {
    switchLine();
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

function setSelectedLineInput(line) {
    document.querySelector('[name=line-txt]').value = line.txt;
}