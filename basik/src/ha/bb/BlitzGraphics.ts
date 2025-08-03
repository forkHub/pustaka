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
<<<<<<< HEAD
function ambilPiksel(x: number = 0, y: number = 0): void {
	Ip.AmbilPiksel(x, y);
=======
function GetPixel(x: number = 0, y: number = 0): void {
	Ip.GetPixel(x, y);
>>>>>>> 2a718a1e781faadf9e66c653543f4e55f331d2c7
}

/**
 * Set pixel using the color set by FillColor()
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
function setPiksel(x: number = 0, y: number = 0): void {
	Ip.SetPiksel(x, y);
}

/**
 * Set fill-color for the next graphics command
 * @param r {number} - the red color (0 - 255)
 * @param g {number} - the green color (0 - 255)
 * @param b {number} - the blue color (0 - 255)
 * @param a {number} - the alpha color (0 - 100)
 */
function warna(r: number = 0, g: number = 0, b: number = 0, a: number = 100) {
	G.Canvas().getContext('2d').fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
	G.red = r;
	G.green = g;
	G.blue = b;
	G.alpha = a;
}

/**
 * Set stroke color
 * @param r {number} - the red color (0 - 255)
 * @param g {number} - the green color (0 - 255)
 * @param b {number} - the blue color (0 - 255)
 * @param a {number} - the alpha color (0 - 100)
 */
function warnaGaris(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
	G.Canvas().getContext('2d').strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
	G.red = r;
	G.green = g;
	G.blue = b;
	G.alpha = a;
}

// /**
//  * Add Listener for certain event
//  * @param type {string} the event type, available are: mousedown, mouseup, mousemove, mousedrag, keydown, keyup, update
//  * @param f {callback}
//  */
// function AddEventListener(type: string, f: () => void) {
// 	Basik.Event.addEventListener(type, f);
// }

// /**
//  * Dispatch an event
//  * @param evt {string} the string to dispatch
//  */
// function DispatchEvent(evt: string): void {
// 	Basik.Event.dispatchEvent(evt);
// }

// function GambarGaris(Ax: number, Ay: number, Bx: number, By: number) {
// 	let ctx: CanvasRenderingContext2D = kanvas().getContext('2d');

// 	Ax = Math.floor(Ax);
// 	Ay = Math.floor(Ay);
// 	Bx = Math.floor(Bx);
// 	By = Math.floor(By);

// 	ctx.beginPath();
// 	ctx.moveTo(Ax, Ay);
// 	ctx.lineTo(Bx, By);
// 	ctx.stroke();
// }

// function GambarKotak(x1: number, y1: number, x2: number, y2: number, rotasi: number) {
// 	let ctx: CanvasRenderingContext2D = kanvas().getContext('2d');

// 	rotasi;

// 	// if (isi) {
// 	ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
// 	// }

// 	// if (garis) {
// 	ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
// 	// }
// }

// //TODO: perlu di update untuk arc
// function GambarLingkaran(x: number = 0, y: number = 0, radius: number) {
// 	let ctx: CanvasRenderingContext2D = kanvas().getContext('2d');

// 	// save state
// 	ctx.save();

// 	// translate context
// 	ctx.translate(x, y);

// 	// ctx.rotate(rotation * (Math.PI / 180));

// 	// scale context horizontally
// 	// ctx.scale(scaleX, scaleY);

// 	// draw circle which will be stretched into an oval
// 	ctx.beginPath();
// 	ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);

// 	// restore to original state
// 	ctx.restore();
// 	ctx.stroke();
// }

//init app
// window.addEventListener("load", () => {
// 	let w = window as any;
// 	if (w["Start"] && (typeof w["Start"] == 'function')) {
// 		w["Start"]();
// 	}
// 	else {
// 		console.log("Start not found");
// 	}
// })