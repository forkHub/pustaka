"use strict";
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;
let div = document.querySelector('div[dragable]');
let debugEl = document.querySelector('div.debug');
console.log(div);
window.onmousedown = (e) => {
    startX = e.clientX;
    startY = e.clientY;
    console.log('mouse down');
    getAbsPos(div);
    debug();
};
function init() {
}
function debug() {
    debugEl.innerHTML = '';
    teks('start x: ' + startX);
    teks('start y: ' + startY);
    teks('last x: ' + lastX);
    teks('last y: ' + lastY);
    function teks(msg) {
        let el = document.createElement('div');
        el.innerText = msg;
        debugEl.appendChild(el);
    }
}
function getAbsPos(element) {
    lastX = 0;
    lastY = 0;
    do {
        lastX += element.offsetLeft;
        lastY += element.offsetTop;
        element = element.offsetParent;
    } while (element);
}
