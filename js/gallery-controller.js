'user strict'

function onInit() {
    if (window.innerWidth <= 682) document.querySelector('.list-container').classList.add('transparent');
    renderImages();
}

function onOpenGallery() {
    var elSections = document.querySelectorAll('section');
    elSections.forEach(section => section.classList.add('hide'));
    document.querySelector('.gallery').classList.remove('hide');
    if (window.innerWidth <= 682) document.querySelector('.list-container').classList.add('transparent');
}

function renderImages() {
    const imgs = getImages();
    var strHtml = '';
    imgs.forEach(img => {
        strHtml += `<img data-img="${img.id}" data-type="new" src="${img.url}" onclick="onCanvasInit(this)" />`;
    });
    document.querySelector('.main-imgs .img-container').innerHTML = strHtml;
}