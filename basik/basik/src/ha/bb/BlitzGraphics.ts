///<reference path="./Route.ts"/>

const G = Basik.G;
const Ip = Basik.ImgImpl;
const In = Basik.In;

function setKanvas(c: HTMLCanvasElement) {
	G.SetCanvas(c);
}

function kanvas(): HTMLCanvasElement {
	return G.Kanvas();
}

function buatKanvas(w: number = 800, h: number = 600, canvas: HTMLCanvasElement = null, mode: number = 1) {
	console.log("buat kanvas");
	G.Graphics(w, h, canvas, mode);
}

/**
 * Clear the canvas
 */
function bersihkanLayar(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
	G.Cls(x, y, w, h);
}

function hijau(): number {
	return G.hijau;
}

function merah(): number {
	return G.merah;
}

function biru(): number {
	return G.biru;
}

function alpha(): number {
	return Math.floor(G.alpha * 100);
}

function ambilPiksel(x: number = 0, y: number = 0): void {
	Ip.AmbilPiksel(x, y);
}

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
	G.Kanvas().getContext('2d').lineWidth = n;
}

const dialog = G.alert;


