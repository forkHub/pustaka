///<reference path="./Route.ts"/>

const G = Basik.G;
const T = Basik.Tk;
const Ip = Basik.Ip;
const In = Basik.In;

/**
 * return the main buffer/the context of canvas. 
 * @returns {CanvasRenderingContext2D} - the active buffer
 */
function MainBuffer(): CanvasRenderingContext2D {
	return G.mainCtx;
}

/**
 * Set the active buffer. Usefull if you want to change the buffer.
 * 
 * @param buff {CanvasRenderingContext2D} - the new active buffer
 */
function SetBuffer(buff: CanvasRenderingContext2D) {
	G.context = buff;
}

/**
 * Clear part of the canvas
 * @param x {number} - the start x position
 * @param y {number} - the start y position
 * @param w {number} - the width of the area
 * @param h {number} - the height of the area
 */
function ClearArea(x: number, y: number, w: number, h: number) {
	G.context.clearRect(x, y, w, h);
}

/**
 * Start the application. You have to call this method before other method.
 * @param w {number} - prefered width of the canvas.
 * @param h {number}- prefered height of the canvas.
 * @param canvas {HTMLCanvasElement} - (optional) the canvas element.
 *   If canvas is not available, a new one will be created and the size will follow the preferred size
 * @param fullScreen {boolean} - (default to true) Use full screen
 * When in full screen mode, the canvas will automatically fill the screen and maintain the aspect ratio.
 * 
 */
function Graphics(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true) {
	G.Graphics(w, h, canvas, fullScreen);
}

/**
 * Clear the canvas
 */
function Cls() {
	G.Cls();
}

/**
 * Return the green color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the green color
 */
function Green(): number {
	return G.hijau;
}

/**
 * Return the red color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the red color
 */
function Red(): number {
	return G.red;
}

/**
 * Return the blue color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the blue color
 */
function Blue(): number {
	return G.biru;
}

/**
 * Return the alpha color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the alpha color
 */
function Alpha(): number {
	return Math.floor(G.alpha * 100);
}

/**
 * Get color information at the specific area
 * You can get the red, green, blue, alpha component of the color by calling Red(), Green(), Blue(), Alpha() function respectively
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
function GetPixel(x: number = 0, y: number = 0): void {
	Ip.AmbilPiksel(x, y);
}

/**
 * Set pixel using the color set by FillColor()
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
function SetPiksel(x: number = 0, y: number = 0): void {
	Ip.SetPiksel(x, y);
}

/**
 * Set fill-color for the next graphics command
 * @param r {number} - the red color
 * @param g {number} - the green color
 * @param b {number} - the blue color
 * @param a {number} - the alpha color
 */
function FillColor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
	G.context.fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
	G.red = r;
	G.hijau = g;
	G.biru = b;
	G.alpha = a;
}

function NoColor() {
	G.context.fillStyle = "none";
}

function StrokeColor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
	G.context.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
	G.red = r;
	G.hijau = g;
	G.biru = b;
	G.alpha = a;
}

function NoStroke() {
	G.context.strokeStyle = 'none';
}


