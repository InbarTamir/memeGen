'use strict'

function onSavedMemeImgs() {
    var elSections = document.querySelectorAll('section');
    elSections.forEach(section => section.classList.add('hide'));
    document.querySelector('.saved-memes').classList.remove('hide');    
}