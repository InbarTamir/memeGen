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

function onMoveLine(elBtn) {
    var value = +elBtn.dataset.val;
    moveLine(value);
    drawCanvas();
}

function onChangeFontSize(elBtn) {
    if (document.querySelector('[name="line-txt"]').value.trim() === '') return;
    var size = +elBtn.dataset.val;
    changeFontSize(size);
    drawCanvas();
}

function onFontChange(elSelect) {
    if (document.querySelector('[name="line-txt"]').value.trim() === '') return;
    var font = elSelect.value;
    changeFont(font);
    drawCanvas();
}

function onToggleStroke() {
    if (document.querySelector('[name="line-txt"]').value.trim() === '') return;
    toggleStroke();
    drawCanvas();
}

function onTextAlign(elBtn) {
    if (document.querySelector('[name="line-txt"]').value.trim() === '') return;
    var dir = elBtn.dataset.dir;
    changeTextAlign(dir);
    drawCanvas();
}

function onColorChange(elColor) {
    if (document.querySelector('[name="line-txt"]').value.trim() === '') return;
    var color = elColor.value;
    changeColor(color);
    drawCanvas();
}

function setSelectedLineInput(line) {
    document.querySelector('[name=line-txt]').value = line.txt;
}