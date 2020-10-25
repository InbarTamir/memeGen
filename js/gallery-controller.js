'user strict';

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
    renderKeywords();
}

function onToggleMenu() {
    document.querySelector('.list-container').classList.toggle('transparent');
}

function onOpenGallery() {
    var elSections = document.querySelectorAll('section');
    elSections.forEach(section => section.classList.add('hide'));
    document.querySelector('.gallery').classList.remove('hide');
    if (window.innerWidth <= 682) document.querySelector('.list-container').classList.add('transparent');
}

function onSearch(elSpan) {
    var keyword = document.querySelector('.search-input').value;
    if (elSpan) {
        keyword = elSpan.innerText;
        document.querySelector('.search-input').value = keyword;
    }

    var keywordsMap = getKeywordsMap();
    if (keywordsMap && keywordsMap[keyword]) {
        if (keywordsMap[keyword] < 44) keywordsMap[keyword]++;
        let entries = Object.entries(keywordsMap);
        let keywordIdx = entries.findIndex(entry => entry[0] === keyword);
        entries.unshift(entries.splice(keywordIdx, 1)[0]);
        setKeywordsMap(Object.fromEntries(entries));
    }
    renderKeywords();
    renderImages(keyword);
}

function onToggleMoreWords(elBtn) {
    document.querySelector('.keywords-container').classList.toggle('expand-words');
    elBtn.innerText = (elBtn.innerText === 'More') ? 'Less' : 'More';
}

function setKeywordsList() {
    var strHtml = '';
    const keywords = Object.keys(getKeywordsMap());
    keywords.forEach(keyword => strHtml += `<option value="${keyword}">`);
    document.querySelector('.search-list').innerHTML = strHtml;
}

function renderKeywords() {
    var keywords = getKeywordsMap();
    var strHtml = '';
    for (var keyword in keywords) {
        strHtml += `<span style="font-size: ${keywords[keyword] + 16}px" onclick="onSearch(this)">${keyword}</span>`;
    }
    document.querySelector('.keywords-container').innerHTML = strHtml;
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