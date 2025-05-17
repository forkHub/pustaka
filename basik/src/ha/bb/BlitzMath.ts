///<reference path="./Route.ts"/>

// const Sudut = ha.be.Mat.Sudut; //TODO: min max options
const DistMin = Basik.Transform.degDistMin;

/**
 * 
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @returns 
 */
function Distance(x1: number, y1: number, x2: number, y2: number): number {
	return Math.hypot(x2 - x1, y2 - y1);
}

function Dist(x1: number, y1: number, x2: number, y2: number): number {
	return Math.hypot(x2 - x1, y2 - y1);
}

/**
 * Menghitung sudut dari posisi relative ke posisi 0,0
 * @param x posisi x
 * @param y posisi y
 * @returns sudut relative ke posisi 0,0
 */
function Angle(x: number, y: number): number {
	return Basik.Tf.sudut(x, y);
}

function Sin(n: number) { return Math.sin(n * Math.PI / 180) }
function Cos(n: number) { return Math.cos(n * Math.PI / 180) }
function Tan(n: number) { return Math.tan(n * Math.PI / 180) }
function Clamp(n: number, min: number, max: number): number {
	if (n < min) return min;
	if (n > max) return max;
	return n;
}