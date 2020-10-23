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
        strHtml += `
            <div class="meme-hover" data-img="${img.id}" onmouseover="onToggleMemeOpts(this)" onmouseout="onToggleMemeOpts(this)">
                <img data-img="${img.id}" data-type="modified" src="${img.url}" />
                <div class="meme-btns hide" data-img="${img.id}">
                    <button class="btn-edit-meme" data-img="${img.id}" onclick="onEditMeme(this)"></button>
                    <button class="btn-delete-meme" data-img="${img.id}" onclick="onDeleteMeme(this)"></button>
                </div>
            </div>`;
    });
    document.querySelector('.saved-memes .img-container').classList.add('grid');
    document.querySelector('.saved-memes .img-container').innerHTML = strHtml;
}

function onToggleMemeOpts(elDiv, ev) {
    var imgId = elDiv.dataset.img;
    var elImg = document.querySelector(`.meme-hover img[data-img="${imgId}"]`);
    document.querySelector(`.meme-btns[data-img="${imgId}"]`).classList.toggle('hide');
    elImg.classList.toggle('opacity');
}

function onEditMeme(elBtn) {
    var elImg = document.querySelector(`.meme-hover img[data-img="${elBtn.dataset.img}"]`);
    onCanvasInit(elImg);
}

function onDeleteMeme(elBtn) {
    var imgId = elBtn.dataset.img;
    deleteMemedImage(imgId);
    deleteMeme(imgId);
    renderMemedImgs();
}