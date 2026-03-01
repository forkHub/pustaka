///<reference path="./Route.ts"/>

function bukaPath(x: number = 0, y: number = 0, rel:boolean=true): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.beginPath();
	ctx.moveTo(x, y);
	G.lastX = x;
	G.lastY = y;
	G.relPos = rel;
}

function garisKe(x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');

	if (G.relPos) {
		x += G.lastX;
		y += G.lastY;
	}

	ctx.lineTo(x, y);
	G.lastX = x;
	G.lastY = y;
}

function kurvaKe(cx: number, cy: number, x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');

	if (G.relPos) {
		cx += G.lastX;
		cy += G.lastY;
		x += G.lastX;
		y += G.lastY;
	}

	let cp1x = (cx - G.lastX) / 2 + G.lastX;
	let cp1y = (cy - G.lastY) / 2 + G.lastY;

	let cp2x = (x - cx) / 2 + cx;
	let cp2y = (y - cy) / 2 + cy;

	ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

	G.lastX = x;
	G.lastY = y;
	// debugger;
}

function lingkarantKe() {
	
}

function tutupPath() {
	let ctx = G.Canvas().getContext('2d');
	ctx.stroke();
	ctx.fill();
}

function garis(x1: number = 100, y1: number = 100, x2: number = 200, y2: number = 100) {
	let ctx = G.Canvas().getContext('2d');
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function lingkaran(x: number = 100, y: number = 100, radius: number = 20, awal: number = 0, akhir: number = 360): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.beginPath();
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.arc(x, y, radius, awal, akhir);
	ctx.stroke();
	ctx.fill();
}

function elip(x: number = 0, y: number = 0, radiusX: number = 0, radiusY: number = 0, awal: number = 0, akhir: number = 360): void {
	let ctx = G.Canvas().getContext('2d');
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.ellipse(x, y, radiusX, radiusY, 0, awal, akhir);
	ctx.stroke();
	ctx.fill();
}

function kotak(x1: number = 10, y1: number = 10, x2: number = 100, y2: number = 100) {
	let ctx = G.Canvas().getContext('2d');
	ctx.fillRect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
	ctx.strokeRect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
}
