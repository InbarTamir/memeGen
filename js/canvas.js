'use strict';

var gCanvas;
var gCtx;
var gImg;

function onCanvasInit(elImg) {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');

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
    toggleCanvas();
}

function toggleCanvas() {
    document.querySelector('.edit-meme').classList.toggle('hide');
    document.querySelector('.gallery').classList.toggle('hide');
}

function drawCanvas() {
    clearCanvas();
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
    drawLines();
}

function drawText(line, idx) {
    if (!line.txt) return;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Impact`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    gCtx.save();

    var currLine = getSelectedLineIdx();
    if (currLine === idx) {
        gCtx.fillStyle = 'rgba(255,255,255,0.2)';
        gCtx.fillRect(line.pos.x - 2 - gCtx.measureText(line.txt).width / 2, line.pos.y - line.size, gCtx.measureText(line.txt).width + 4, line.size + 10);
        gCtx.restore();
    }
}

function drawLines() {
    const lines = getLines();
    lines.forEach((line, idx) => drawText(line, idx));
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}