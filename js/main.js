'use strict';

window.addEventListener('resize', () => {
    var elList = document.querySelector('.list-container');
    if (window.innerWidth > 682) {
        elList.style.transition = 'none';
        elList.classList.remove('transparent');
    } else {
        elList.classList.add('transparent');
        setTimeout(() => elList.style.transition = '.5s', 1000);
    }
});

function onInit() {
    if (window.innerWidth <= 682) document.querySelector('.list-container').classList.add('transparent');
    renderImages();
    setKeywordsList();
}

function onToggleMenu() {
    document.querySelector('.list-container').classList.toggle('transparent');
}

function onSearch() {
    const keyword = document.querySelector('.search').value;
    renderImages(keyword);
}

function setKeywordsList() {
    var strHtml = '';
    const keywords = Object.keys(getKeywordsMap());
    keywords.forEach(keyword => strHtml += `<option value="${keyword}">`);
    document.querySelector('.search-list').innerHTML = strHtml;
}