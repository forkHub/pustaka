const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const cont = document.createElement('div');
const form = document.forms[0] as HTMLFormElement;
let canvasDoc: HTMLCanvasElement;

document.body.appendChild(cont);

function log(msg: string, cont: HTMLElement) {
	let p = document.createElement('p');
	p.innerText = msg;
	cont ? cont.appendChild(p) : document.body.appendChild(p);
	console.log(msg);
}

async function delay() {
	// console.log("delay");
	await new Promise(resolve => requestAnimationFrame(resolve));
}