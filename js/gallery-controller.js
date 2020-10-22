'user strict'

function onInit() {
    renderImages();
}

function renderImages() {
    const imgs = getImages();
    var strHtml = '';
    imgs.forEach(img => {
        strHtml += `<img data-img="${img.id}" src="${img.url}" onclick="onCanvasInit(this)" />`;
    });
    document.querySelector('.img-container').innerHTML = strHtml;
}