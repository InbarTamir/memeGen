'use strict';

function onAddLine() {
    var elTxt = document.querySelector('[name=line-txt]');
    addNewLine();
    elTxt.value = '';
    drawCanvas();
    toggleMsgSaved();
}

function onDeleteLine() {
    deleteLine();
    drawCanvas();
    toggleMsgSaved();
}

function onChangeLineTxt(elTxt) {
    changeLineText(elTxt.value.toUpperCase());
    drawCanvas();
    toggleMsgSaved();
}

function onSwitchLines() {
    if (isEmptyTxtInput()) return;
    switchLine();
    drawCanvas();
}

function onMoveLine(amount) {
    if (isEmptyTxtInput()) return;
    moveLine(amount);
    drawCanvas();
    toggleMsgSaved();
}

function onChangeFontSize(amount) {
    if (isEmptyTxtInput()) return;
    changeFontSize(amount);
    drawCanvas();
    toggleMsgSaved();
}

function onFontChange(elSelect) {
    elSelect.style.fontFamily = elSelect.value;
    if (isEmptyTxtInput()) return;
    var font = elSelect.value;
    changeFont(font);
    drawCanvas();
    toggleMsgSaved();
}

function onToggleStroke() {
    if (isEmptyTxtInput()) return;
    toggleStroke();
    drawCanvas();
    toggleMsgSaved();
}

function onChangeProp(prop, val) {
    if (isEmptyTxtInput()) return;
    changeProp(prop, val);
    drawCanvas();
    toggleMsgSaved();
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

function toggleMsgSaved() {
    document.querySelector('.msg-container').classList.add('msg-animate');
    setTimeout(() => document.querySelector('.msg-container').classList.remove('msg-animate'), 1500);
    document.querySelector('.msg-saved').classList.remove('hide');
    setTimeout(() => document.querySelector('.msg-saved').classList.add('hide'), 1500);
}