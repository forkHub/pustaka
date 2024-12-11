///<reference path="./Route.ts"/>

// const Sudut = ha.be.Mat.Sudut;
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