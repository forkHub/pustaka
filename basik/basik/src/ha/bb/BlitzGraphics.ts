///<reference path="./Route.ts"/>

const G = Basik.G;
// const T = Basik.Tk;
const Ip = Basik.Ip;
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

/**
 * Clear part of the canvas
 * @param x {number} the start x position
 * @param y {number} the start y position
 * @param w {number} the width of the area
 * @param h {number} the height of the area
 */
// function ClearArea(x: number, y: number, w: number, h: number) {
// 	G.Canvas().getContext('2d').clearRect(x, y, w, h);
// }

/**
 * Start the application. You have to call this method before other method.
 * @param w {number} prefered width of the canvas.
 * @param h {number} prefered height of the canvas.
 * @param canvas {HTMLCanvasElement} (optional) the canvas element.<br/>
 *   If canvas is not available, a new one will be created and the size will follow the preferred size
 * @param mode {boolean} (default to true) Use full screen
 * When in full screen mode, the canvas will automatically fill the screen and maintain the aspect ratio.
 * 
 */
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
	return G.green;
}

/**
 * Return the red color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the red color (0 - 255)
 */
function merah(): number {
	return G.red;
}

/**
 * Return the blue color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the blue color (0 - 255)
 */
function biru(): number {
	return G.blue;
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

function warna(idx: number = 0) {
	Basik.Warna.warna(idx);
}

function warnaGaris(idx: number) {
	Basik.Warna.warnaGaris(idx);
}