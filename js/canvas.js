'use strict';

var gCanvas;
var gCtx;
var gImg;

function onCanvasInit(elImg) {
    document.querySelector('.main-nav [checked]').checked = false;

    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');

    setPositions();
    var imgId = elImg.dataset.img;
    setMeme(imgId);
    var img = getImgForCanvas();
    gImg = new Image();
    if (img) {
        gImg.src = img.url;
    }
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
        drawCanvas();
    };
    showCanvas();
}

function onShareCanvas(elLink) {
}

function onDownloadCanvas(elLink) {
    const selectedLineIdx = getSelectedLineIdx();
    setSelectedLineIdx('-1');
    drawCanvas();
    setSelectedLineIdx(selectedLineIdx);
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'myMeme.jpg';
}

function showCanvas() {
    var elSections = document.querySelectorAll('section');
    elSections.forEach(section => section.classList.add('hide'));
    document.querySelector('.edit-meme').classList.remove('hide');
}

function drawCanvas() {
    clearCanvas();
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
    drawLines();
    focusOnText();
    selectFontFamily();
}

function drawText(line, idx) {
    if (!line.txt) return;
    gCtx.fillStyle = line.color;
    gCtx.font = `bold ${line.size}px ${line.fontFamily}`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeStyle = line.stroke;
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    gCtx.save();

    var currLine = getSelectedLineIdx();
    if (currLine === idx) {
        gCtx.fillStyle = 'rgba(255,255,255,0.2)';
        let measureTxt = gCtx.measureText(line.txt);
        gCtx.fillRect(line.pos.x - 2 - measureTxt.actualBoundingBoxLeft, line.pos.y - line.size, measureTxt.width + 4, line.size + 10);
        gCtx.restore();
    }
}

function drawLines() {
    const lines = getLines();
    lines.forEach((line, idx) => drawText(line, idx));
}

function focusOnText() {
    document.querySelector('[name="line-txt"]').focus();
}

function selectFontFamily() {
    document.querySelector('.select-font').value = getSelectedLineFont();
}

function getCanvasPositions() {
    var positions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    if (gCtx) {
        let x = Math.round(gCanvas.width / 2);
        let topPos = { x, y: Math.round(gCanvas.height / 9) };
        let bottomPos = { x, y: gCanvas.height - topPos.y };
        let middlePos = { x, y: Math.round(gCanvas.height / 2) };
        positions = [topPos, bottomPos, middlePos];
    }
    return positions;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}