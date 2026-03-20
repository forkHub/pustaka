///<reference path="./Route.ts"/>

const G = Basik.G;
const Ip = Basik.ImgImpl;
const In = Basik.In;

/**
 * Set the active canvas. 
 * @param c {HTMLCanvasElement} the new active canvas
 */
function setKanvas(c: HTMLCanvasElement) {
	G.SetCanvas(c);
}

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

/**
 * Return the green color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the green color (0 - 255)
 */
function hijau(): number {
	return G.hijau;
}

/**
 * Return the red color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the red color (0 - 255)
 */
function merah(): number {
	return G.merah;
}

/**
 * Return the blue color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the blue color (0 - 255)
 */
function biru(): number {
	return G.biru;
}

/**
 * Return the alpha color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the alpha color (0 - 100)
 */
function alpha(): number {
	return Math.floor(G.alpha * 100);
}

/**
 * Get color information at the specific position.<br/>
 * You can read the red, green, blue, alpha component of the color by calling Red(), Green(), Blue(), Alpha() function respectively
 * @param x {number} the x position
 * @param y {number} the y position
 */
function ambilPiksel(x: number = 0, y: number = 0): void {
	Ip.AmbilPiksel(x, y);
}

/**
 * Set pixel using the color set by FillColor()
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
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