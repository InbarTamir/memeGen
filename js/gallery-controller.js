'user strict'

function onInit() {
    renderImages();
}

function onOpenGallery() {
    var elSections = document.querySelectorAll('section');
    elSections.forEach(section => section.classList.add('hide'));
    document.querySelector('.gallery').classList.remove('hide');
}

function renderImages() {
    const imgs = getImages();
    var strHtml = '';
    imgs.forEach(img => {
        strHtml += `<img data-img="${img.id}" src="${img.url}" onclick="onCanvasInit(this)" />`;
    });
    document.querySelector('.img-container').innerHTML = strHtml;
}