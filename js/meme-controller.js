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
    changeLineText(elTxt.value.toUpperCase());
    drawCanvas();
}

function onSwitchLines() {
    switchLine();
    drawCanvas();
}

function onMoveLine(amount) {
    moveLine(amount);
    drawCanvas();
}

function onChangeFontSize(amount) {
    if (isEmptyTxtInput()) return;
    changeFontSize(amount);
    drawCanvas();
}

function onFontChange(elSelect) {
    elSelect.style.fontFamily = elSelect.value;
    if (isEmptyTxtInput()) return;
    var font = elSelect.value;
    changeFont(font);
    drawCanvas();
}

function onToggleStroke() {
    if (isEmptyTxtInput()) return;
    toggleStroke();
    drawCanvas();
}

function onChangeProp(prop, val) {
    if (isEmptyTxtInput()) return;
    changeProp(prop, val);
    drawCanvas();
}

function setSelectedLineInput(line) {
    document.querySelector('[name=line-txt]').value = line.txt;
}

function getFontFamily() {
    return document.querySelector('.select-font').value;
}

function isEmptyTxtInput() {
    return !document.querySelector('[name="line-txt"]').value.trim();
}