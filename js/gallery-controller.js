'user strict';

function onOpenGallery() {
    var elSections = document.querySelectorAll('section');
    elSections.forEach(section => section.classList.add('hide'));
    document.querySelector('.gallery').classList.remove('hide');
    if (window.innerWidth <= 682) document.querySelector('.list-container').classList.add('transparent');
}

function renderImages(keyword = '') {
    const imgs = getImages();
    var strHtml = '';
    imgs.forEach(img => {
        if (keyword === '' || img.keywords.find(key => key.indexOf(keyword) >= 0)) {
            strHtml += `<img data-img="${img.id}" data-type="new" src="${img.url}" onclick="onCanvasInit(this)" />`;
        }
    });
    document.querySelector('.main-imgs .img-container').innerHTML = (strHtml === '') ? 'No matching images.' : strHtml;
}