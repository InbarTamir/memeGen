'use strict';
const STORAGE_MEMED_IMAGES = "memedImgDB";

var gMemedImages = _loadMemedImages();

function getCurrMemedImage() {
    const id = getMemeId();
    return (gMemedImages) ? gMemedImages.find(img => img.id === id) : null;
}

function getMemedImages() {
    return gMemedImages;
}

function saveMemedImage(data) {
    var currMeme = getMeme();
    if (!currMeme) return;
    var currImg = getCurrMemedImage();
    if (!currImg) {
        currImg = _createMemedImg(currMeme.id, data);
        gMemedImages.push(currImg);
    } else currImg.url = data;
    _saveMemedImages();
}

function deleteMemedImage(imgId) {
    var imgIdx = gMemedImages.findIndex(img => img.id === imgId);
    if (imgIdx) {
        gMemedImages.splice(imgIdx, 1);
        _saveMemedImages();
    }
}

function _createMemedImg(imgId, data) {
    const currImg = getImgForCanvas();
    var newImg = JSON.parse(JSON.stringify(currImg));
    newImg.id = imgId;
    newImg.url = data;
    return newImg;
}

function _loadMemedImages() {
    return loadFromStorage(STORAGE_MEMED_IMAGES) || [];
}

function _saveMemedImages() {
    saveToStorage(STORAGE_MEMED_IMAGES, gMemedImages);
}