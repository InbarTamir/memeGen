'use strict'

function onAddLine() {
    var elTxt = document.querySelector('[name=line-txt]');
    if (!elTxt.value.length) return;
    addNewLine(elTxt.value);
    elTxt.value = '';
    drawCanvas();
}

function onChangeLineTxt(elTxt) {
    changeLineText(elTxt.value);
    drawCanvas();
}

function onChangeFontSize(elBtn) {
    var value = +elBtn.dataset.val;
    changeFontSize(value);
    drawCanvas();
}

function setSelectedLine(line) {
    document.querySelector('[name=line-txt]').value = line.txt;
}