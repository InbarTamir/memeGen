'use strict'

function onAddLine() {
    var elTxt = document.querySelector('[name=line-txt]');
    addNewLine(elTxt.value);
    elTxt.value = '';
    renderLines();
}

function renderLines() {
    var lines = getLines();
    drawLines(lines);
}