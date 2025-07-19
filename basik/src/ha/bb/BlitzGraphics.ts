///<reference path="./Route.ts"/>

const G = Basik.G;
// const T = Basik.Tk;
const Ip = Basik.Ip;
const In = Basik.In;

/**
 * return the main canvas. Main canvas is the one defined when application starts
 * @returns {HTMLCanvasElement} the main canvas object
 */
function MainCanvas(): HTMLCanvasElement {
	return G.MainCanvas();
}

/**
 * Set the active canvas. 
 * @param c {HTMLCanvasElement} the new active canvas
 */
function SetCanvas(c: HTMLCanvasElement) {
	G.SetCanvas(c);
}

/**
 * Clear part of the canvas
 * @param x {number} the start x position
 * @param y {number} the start y position
 * @param w {number} the width of the area
 * @param h {number} the height of the area
 */
function ClearArea(x: number, y: number, w: number, h: number) {
	G.Canvas().getContext('2d').clearRect(x, y, w, h);
}

/**
 * Start the application. You have to call this method before other method.
 * @param w {number} prefered width of the canvas.
 * @param h {number} prefered height of the canvas.
 * @param canvas {HTMLCanvasElement} (optional) the canvas element.<br/>
 *   If canvas is not available, a new one will be created and the size will follow the preferred size
 * @param fullScreen {boolean} (default to true) Use full screen
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
 * @returns {number} the green color (0 - 255)
 */
function Green(): number {
	return G.green;
}

/**
 * Return the red color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the red color (0 - 255)
 */
function Red(): number {
	return G.red;
}

/**
 * Return the blue color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the blue color (0 - 255)
 */
function Blue(): number {
	return G.blue;
}

/**
 * Return the alpha color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the alpha color (0 - 100)
 */
function Alpha(): number {
	return Math.floor(G.alpha * 100);
}

/**
 * Get color information at the specific position.<br/>
 * You can read the red, green, blue, alpha component of the color by calling Red(), Green(), Blue(), Alpha() function respectively
 * @param x {number} the x position
 * @param y {number} the y position
 */
function GetPixel(x: number = 0, y: number = 0): void {
	Ip.GetPixel(x, y);
}

/**
 * Set pixel using the color set by FillColor()
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
function SetPixel(x: number = 0, y: number = 0): void {
	Ip.SetPiksel(x, y);
}

/**
 * Set fill-color for the next graphics command
 * @param r {number} - the red color (0 - 255)
 * @param g {number} - the green color (0 - 255)
 * @param b {number} - the blue color (0 - 255)
 * @param a {number} - the alpha color (0 - 100)
 */
function FillColor(r: number = 0, g: number = 0, b: number = 0, a: number = 100) {
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
function StrokeColor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
	G.Canvas().getContext('2d').strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
	G.red = r;
	G.green = g;
	G.blue = b;
	G.alpha = a;
}

/**
 * Add Listener for certain event
 * @param type {string} the event type, available are: mousedown, mouseup, mousemove, mousedrag, keydown, keyup, update
 * @param f {callback}
 */
function AddEventListener(type: string, f: () => void) {
	Basik.Event.addEventListener(type, f);
}

/**
 * Dispatch an event
 * @param evt {string} the string to dispatch
 */
function DispatchEvent(evt: string): void {
	Basik.Event.dispatchEvent(evt);
}


///<reference path="./Route.ts"/>

// const G = Basik.G;
// const T = Basik.Tk;
// const Im = Basik.Im;
// const Ip = Basik.Ip;
// const In = Basik.In;

/**
 * 
 * @param w 
 * @param h 
 * @param canvas 
 * @param fullScreen 
 * @param input 
 */
// function Graphics(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true, input: boolean = true) {

// 	if (canvas) {
// 		G.canvas = canvas;
// 	}
// 	G.skalaOtomatis = fullScreen;

// 	console.log('inisialisasi');

// 	G.init(w, h, G.skalaOtomatis);

// 	if (input) {
// 		In.init(G.canvas);
// 	}

// 	// if (Graphic.skalaOtomatis) {
// 	window.addEventListener("resize", (): void => {
// 		G.handleWindowResize();
// 	})

// 	function update() {
// 		let updater = (window as any)["Update"];
// 		if (typeof updater === "function") {
// 			updater();
// 		}
// 		window.requestAnimationFrame(update);
// 	}
// 	update();

// 	setTimeout(() => {
// 		G.handleWindowResize();
// 	}, 100);

// 	//font default
// 	// Teks.Font("12px cursive");
// 	T.Rata("center");
// 	T.Goto(169, 10);
// 	G.FillColor(255, 255, 255, 100);
// 	G.context.strokeStyle = "#ffffff";
// 	Cls(0, 0, 0);
// }

/**
 * 
 * @param r 
 * @param g 
 * @param b 
 * @param a 
 */
// function Cls(r?: number, g?: number, b?: number, a?: number) {
// 	let ctx: CanvasRenderingContext2D = G.context;
// 	// window.getComputedStyle()
// 	G.backupWarna();
// 	ctx.clearRect(0, 0, parseInt(G.canvas.style.width), parseInt(G.canvas.style.height));
// 	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 100})`;
// 	ctx.fillRect(0, 0, parseInt(G.canvas.style.width), parseInt(G.canvas.style.height));
// 	G.restoreColor();
// }

/**
 * 
 * @param r 
 * @param g 
 * @param b 
 * @param a 
 */
// function StrokeColor(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
// 	G.context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
// }

/**
 * 
 * @param x 
 * @param y 
 * @returns 
 */
// function GetPixel(x: number = 0, y: number = 0): number[] {
// 	return Ip.AmbilPiksel(x, y);
// }

function SetPiksel(x: number = 0, y: number = 0) {
	return Ip.GetPixel(x, y); //TODO: implement
}


function Garis(Ax: number, Ay: number, Bx: number, By: number) {
	let ctx: CanvasRenderingContext2D = MainCanvas().getContext('2d');

	Ax = Math.floor(Ax);
	Ay = Math.floor(Ay);
	Bx = Math.floor(Bx);
	By = Math.floor(By);

	ctx.beginPath();
	ctx.moveTo(Ax, Ay);
	ctx.lineTo(Bx, By);
	ctx.stroke();
}

function Kotak(x1: number, y1: number, x2: number, y2: number, isi: boolean = false, garis: boolean = true, rotasi: number = 0) {
	let ctx: CanvasRenderingContext2D = MainCanvas().getContext('2d');

	//TODO: rotasi
	rotasi;

	if (isi) {
		ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
	}

	if (garis) {
		ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
	}
}

function Oval(x: number = 0, y: number = 0, radius: number, skalaX: number = 1, skalaY = .5, rotasi: number = 0) {
	let ctx: CanvasRenderingContext2D = MainCanvas().getContext('2d');

	// save state
	ctx.save();

	// translate context
	ctx.translate(x, y);

	ctx.rotate(rotasi * (Math.PI / 180));

	// scale context horizontally
	ctx.scale(skalaX, skalaY);

	// draw circle which will be stretched into an oval
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);

	// restore to original state
	ctx.restore();
	ctx.stroke();
}

//TODO:
// const CreateDict = Dict.create;
// const DictGetValue = Dict.GetValue;
// const DictAddAttr = Dict.AddAttr;
// const DictGetKeyList = Dict.GetKeyList;
// const DictGetValueList = Dict.GetValueList;   
