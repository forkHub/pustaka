///<reference path="type.ts"/>

let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;
let div = document.querySelector('div[dragable]') as HTMLDivElement;
let debugEl = document.querySelector('div.debug');
console.log(div);
let h = new Drag.Handler(div as HTMLElement);
new Drag.Handler(document.querySelector('div.block2'));
new Drag.Handler(document.querySelector('div.block3'));
new Drag.Handler(document.querySelector('div.block4'));
new Drag.Handler(document.body);
function init() {

}

function debug() {
	debugEl.innerHTML = '';
	teks('start x: ' + startX);
	teks('start y: ' + startY);
	teks('last x: ' + lastX);
	teks('last y: ' + lastY);

	function teks(msg: string) {
		let el = document.createElement('div');
		el.innerText = msg;
		debugEl.appendChild(el);
	}
}


function getAbsPos(element: HTMLDivElement) {
	lastX = 0;
	lastY = 0;
	do {
		lastX += element.offsetLeft;
		lastY += element.offsetTop;
		element = element.offsetParent as HTMLDivElement;
	} while (element);
}