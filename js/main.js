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

function onToggleMenu() {
    document.querySelector('.list-container').classList.toggle('transparent');
}