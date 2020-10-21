'use strict';

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    console.log(gCtx);
}

function onOpenCanvas(elImg) {
    var imgId = elImg.dataset.img;
    setMeme(imgId);
    const img = getImgToShow();
    drawCanvas(img);
    toggleCanvas();
}

function toggleCanvas() {
    document.querySelector('.edit-meme').classList.toggle('hide');
    document.querySelector('.gallery').classList.toggle('hide');
}

function drawCanvas() {
    clearCanvas();
    const img = getImgToShow();
    var imgObj = new Image();
    if (img) {
        imgObj.src = img.url;
    }
    imgObj.onload = () => {
        gCtx.drawImage(imgObj, 0, 0, gCanvas.width, gCanvas.height);
        drawLines();
    };
}

function drawText(line) {
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Impact`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
}

function drawLines() {
    const lines = getLines();
    lines.forEach(line => drawText(line));
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}