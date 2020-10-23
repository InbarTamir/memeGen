'use strict'

function onSavedMemeImgs() {
    var elSections = document.querySelectorAll('section');
    elSections.forEach(section => section.classList.add('hide'));
    document.querySelector('.saved-memes').classList.remove('hide');
    renderMemedImgs();
}

function renderMemedImgs() {
    var imgs = getMemedImages();
    if (!imgs.length) {
        document.querySelector('.saved-memes .img-container').classList.remove('grid');
        document.querySelector('.saved-memes .img-container').innerText = 'No Saved Memes.';
        return;
    } 
    var strHtml = '';
    imgs.forEach(img => {
        strHtml += `<img data-img="${img.id}" data-type="modified" src="${img.url}" onclick="onCanvasInit(this)" />`;
    });
    document.querySelector('.saved-memes .img-container').classList.add('grid');
    document.querySelector('.saved-memes .img-container').innerHTML = strHtml;
}