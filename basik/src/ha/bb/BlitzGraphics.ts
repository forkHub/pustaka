///<reference path="./Route.ts"/>

const G = Basik.G;
const T = Basik.Tk;
// const Im = Basik.Im;
const Ip = Basik.Ip;
const In = Basik.In;

function MainBuffer(): CanvasRenderingContext2D {
	return G.mainCtx;
}

function SetBuffer(b: CanvasRenderingContext2D) {
	G.context = b;
}

function ClearArea(x: number, y: number, w: number, h: number) {
	G.context.clearRect(x, y, w, h);
}

/**
 * 
 * @param w 
 * @param h 
 * @param canvas 
 * @param fullScreen 
 * @param input 
 */
function Graphics(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true) {
	G.Graphics(w, h, canvas, fullScreen);
}

/**
 * 
 * @param r 
 * @param g 
 * @param b 
 * @param a 
 */
function Cls() {
	G.Cls();
}

/**
 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
 * @returns (number) warna merah
 */
function Green(): number {
	return G.hijau;
}

function Red(): number {
	return G.red;
}

/**
 * Mengembalikan warna biru dari perintah AmbilPixel terakhir
 * @returns (number) warna biru
 */
function Blue(): number {
	return G.biru;
}

/**
 * 
 * @returns 
 */
function Alpha(): number {
	return Math.floor(G.alpha * 100);
}

/**
 * 
 * @param x 
 * @param y 
 * @returns 
 */
function GetPixel(x: number = 0, y: number = 0) {
	return Ip.AmbilPiksel(x, y);
}

function SetPiksel(x: number = 0, y: number = 0) {
	return Ip.SetPiksel(x, y);
}

function FillColor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
	G.context.fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
}

function NoColor() {
	G.context.fillStyle = "none";
}

function StrokeColor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
	G.context.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
}

function NoStroke() {
	G.context.strokeStyle = 'none';
}


