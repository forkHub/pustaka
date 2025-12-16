///<reference path="./Route.ts"/>

function bukaPath(x: number = 0, y: number = 0, rotasi: number = 0): void {
	let ctx = G.Canvas().getContext('2d');
	rotasi; //TODO:
	ctx.beginPath();
	ctx.moveTo(x, y);
	G.lastX = x;
	G.lastY = y;
}

function garisKe(x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.lineTo(G.lastX + x, G.lastY + y);
}

function kurvaKe(cx: number, cy: number, x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.quadraticCurveTo(cx, cy, x, y);
	//TODO: dibuat bezier
}

function bezier(): void {

}

function tutupPath() {
	let ctx = G.Canvas().getContext('2d');
	ctx.stroke();
	ctx.fill();
}

function garis(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
	let ctx = G.Canvas().getContext('2d');
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function lingkaran(x: number = 0, y: number = 0, radius: number = 20, awal: number = 0, akhir: number = 360): void {
	let ctx = G.Canvas().getContext('2d');
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.arc(x, y, radius, awal, akhir);
}

function elip(x: number = 0, y: number = 0, radiusX: number = 0, radiusY: number = 0, awal: number = 0, akhir: number = 360): void {
	let ctx = G.Canvas().getContext('2d');
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.ellipse(x, y, radiusX, radiusY, 0, awal, akhir);
}
