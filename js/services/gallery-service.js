'use strict'

var gImgs = [
    {id:1, url:'img/1.jpg', keywords: ['president', 'angry']},
    {id:2, url:'img/2.jpg', keywords: ['happy', 'cute', 'puppy']}
];

function getImgToShow() {
    const currMeme = getMeme();
    var imgId = currMeme.selectedImgId;
    return gImgs.find((img) => img.id === +imgId);
}