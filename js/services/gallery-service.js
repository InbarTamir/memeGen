'use strict';
const STORAGE_IMAGES_KEY = 'imagesDB';
const STORAGE_IMGS_LAST_ID = 'imagesLastIdDB';

var gImgs = _loadImages();
var gImgsLastId = _loadImgsLastId();
var gKeywords = _setKeywords();

function getImgForCanvas() {
    const currMeme = getMeme();
    var imgId = currMeme.selectedImgId;
    return gImgs.find((img) => img.id === +imgId);
}

function getImages() {
    return gImgs;
}

function getKeywords() {
    return gImgs.reduce((keywords, img) => {
        keywords.push(...img.keywords);
        return keywords;
    }, []);
}

function getKeywordsMap() {
    return gKeywords;
}

function _loadImages() {
    var imgs = loadFromStorage(STORAGE_IMAGES_KEY);
    if (!imgs || !imgs.length) {
        imgs = [
            { id: 1, url: 'img/gallery/1.jpg', keywords: ['president', 'angry', 'boss', 'explain'] },
            { id: 2, url: 'img/gallery/2.jpg', keywords: ['happy', 'cute', 'puppy'] },
            { id: 3, url: 'img/gallery/3.jpg', keywords: ['baby', 'cute', 'puppy'] },
            { id: 4, url: 'img/gallery/4.jpg', keywords: ['sleep', 'cute', 'cat'] },
            { id: 5, url: 'img/gallery/5.jpg', keywords: ['boss', 'cute', 'baby'] },
            { id: 6, url: 'img/gallery/6.jpg', keywords: ['funny', 'explain'] },
            { id: 7, url: 'img/gallery/7.jpg', keywords: ['funny', 'cute', 'baby'] },
            { id: 8, url: 'img/gallery/8.jpg', keywords: ['happy', 'funny'] },
            { id: 9, url: 'img/gallery/9.jpg', keywords: ['happy', 'cute', 'baby', 'funny'] },
            { id: 10, url: 'img/gallery/10.jpg', keywords: ['happy', 'boss', 'president'] },
            { id: 11, url: 'img/gallery/11.jpg', keywords: ['funny', 'kiss', 'hug', 'sport'] },
            { id: 12, url: 'img/gallery/12.jpg', keywords: ['boss', 'glasses', 'explain'] },
            { id: 13, url: 'img/gallery/13.jpg', keywords: ['happy', 'boss', 'toast'] },
            { id: 14, url: 'img/gallery/14.jpg', keywords: ['boss', 'glasses'] },
            { id: 15, url: 'img/gallery/15.jpg', keywords: ['explain'] },
            { id: 16, url: 'img/gallery/16.jpg', keywords: ['happy'] },
            { id: 17, url: 'img/gallery/17.jpg', keywords: ['boss', 'president', 'explain', 'scary'] },
            { id: 18, url: 'img/gallery/18.jpg', keywords: ['happy', 'cute', 'explain'] },
        ];
        _saveImages(imgs);
        _saveImgsLastId(imgs[imgs.length - 1].id);
    }
    return imgs;
}

function _setKeywords() {
    var keywords = getKeywords();
    var keywordsMap = {};
    keywords.forEach((keyword) => keywordsMap[keyword] = (keywordsMap[keyword]) ? keywordsMap[keyword] + 1 : 1);
    return keywordsMap;
}

function _loadImgsLastId() {
    return loadFromStorage(STORAGE_IMGS_LAST_ID);
}

function _saveImgsLastId(id) {
    gImgsLastId = id;
    saveToStorage(STORAGE_IMGS_LAST_ID, id);
}

function _saveImages(imgs) {
    saveToStorage(STORAGE_IMAGES_KEY, imgs);
}