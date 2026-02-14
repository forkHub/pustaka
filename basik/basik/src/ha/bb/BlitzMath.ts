// ///<reference path="./Route.ts"/>

// /**
//  * calculate distance between two angle
//  * @param angleS {number} the first angle
//  * @param angleT {number} the second angle
//  * @param min {boolean} take the minimum or maximum distance
//  * @returns {number}
//  */
// function AngleDist(angleS: number = 0, angleT: number, min: boolean = true): number {
// 	return Basik.Transform.degDist(angleS, angleT, min);
// }

// /**
//  * Calculate the angle of a point relative to the horizontal line
//  * @param x {number} the x position
//  * @param y {number} the y position
//  * @returns {number} the angle in degrees
//  */
// function Angle(x: number, y: number): number {
// 	return Basik.Tf.sudut(x, y);
// }

// function Clamp(n: number, min: number, max: number): number {
// 	if (n < min) return min;
// 	if (n > max) return max;
// 	return n;
// }

// //TODO:
// /**
//  * polar posx
//  * polar posy
//  *
//  * DRAWING:
//  * circle
//  * rect
//  * triangle
//  * drawingconnected
//  * arc
//  * ellipse
//  * polygon
//  * star
//  * crescent
//  * line
//  * quad
//  * bezier
//  * lastX
//  * lastY
//  * rotation
//  */


function normalisasiSudut(sdt: number = 0): number {
	// gunakan modulus agar tetap dalam rentang -360 sampai 360
	let n = sdt % 360;

	// jika hasil negatif, tambahkan 360 agar masuk ke rentang 0-360
	if (n < 0) {
		n += 360;
	}

	return n;
}
