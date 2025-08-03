///<reference path="./Route.ts"/>

function penaDitekan(x: number = 0, y: number = 0, rotasi: number = 0): void {
	let ctx = G.Canvas().getContext('2d');
	rotasi; //TODO:
	ctx.beginPath();
	ctx.moveTo(x, y);
	G.lastX = x;
	G.lastY = y;
}

function garis(x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.lineTo(G.lastX + x, G.lastY + y);
}

function lingkaran(x: number, y: number, radius: number, awal: number, akhir: number): void {
	let ctx = G.Canvas().getContext('2d');
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.arc(x + G.lastX, y + G.lastY, radius, awal, akhir);
}

function elips(x: number, y: number, radiusX: number, radiusY: number, awal: number, akhir: number): void {
	let ctx = G.Canvas().getContext('2d');
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.ellipse(G.lastX + x, G.lastY + y, radiusX, radiusY, 0, awal, akhir);
}

function quad(cx: number, cy: number, x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.quadraticCurveTo(G.lastX + cx, G.lastY + cy, G.lastX + x, G.lastY + y);
	//TODO: dibuat bezier
}

function bezier(): void {

}


function penaDiangkat() {
	let ctx = G.Canvas().getContext('2d');
	ctx.stroke();
	ctx.fill();
}