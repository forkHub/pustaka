///<reference path="./Route.ts"/>

const G = Basik.G;
const Ip = Basik.ImgImpl;
const In = Basik.In;

//TODO: doc
function setKanvas(c: HTMLCanvasElement) {
	G.SetCanvas(c);
}

//TODO: doc
function kanvas(): HTMLCanvasElement {
	return G.Canvas();
}

function buatKanvas(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, mode: number = 1) {
	console.log("buat kanvas");
	G.Graphics(w, h, canvas, mode);
}

/**
 * Clear the canvas
 */
function bersihkanLayar(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
	G.Cls(x, y, w, h);
}

//TODO: doc
function hijau(): number {
	return G.hijau;
}

//TODO: doc
function merah(): number {
	return G.merah;
}

//TODO: doc
function biru(): number {
	return G.biru;
}

//TODO: doc
function alpha(): number {
	return Math.floor(G.alpha * 100);
}

//TODO: doc
function ambilPiksel(x: number = 0, y: number = 0): void {
	Ip.AmbilPiksel(x, y);
}

//TODO: doc
function setPiksel(x: number = 0, y: number = 0): void {
	Ip.SetPiksel(x, y);
}

function warna(idx: number = 0, trans = 100) {
	Basik.Warna.warna(idx, trans);
}

function warnaGaris(idx: number, trans = 100) {
	Basik.Warna.warnaGaris(idx, trans);
}

function tebalGaris(n: number) {
	G.Canvas().getContext('2d').lineWidth = n;
}

const dialog = G.alert;
