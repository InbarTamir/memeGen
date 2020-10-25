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
    renderKeywords();
}

function onToggleMenu() {
    document.querySelector('.list-container').classList.toggle('transparent');
}

function onSearch(elSpan) {
    var keyword = document.querySelector('.search-input').value;
    if (elSpan) {
        keyword = elSpan.innerText;
        document.querySelector('.search-input').value = keyword;
    }

    var keywordsMap = getKeywordsMap();
    if (keywordsMap && keywordsMap[keyword]) {
        keywordsMap[keyword]++;
        let entries = Object.entries(keywordsMap);
        let keywordIdx = entries.findIndex(entry => entry[0] === keyword);
        entries.unshift(entries.splice(keywordIdx, 1)[0]);
        setKeywordsMap(Object.fromEntries(entries));
    }
    renderKeywords();
    renderImages(keyword);
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
