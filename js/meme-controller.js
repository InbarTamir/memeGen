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

function onChangeFontSize(elBtn) {
    var value = +elBtn.dataset.val;
    changeFontSize(value);
    drawCanvas();
}

function setSelectedLine(line) {
    document.querySelector('[name=line-txt]').value = line.txt;
}