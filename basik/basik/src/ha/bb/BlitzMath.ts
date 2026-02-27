// ///<reference path="./Route.ts"/>

function akar(n = 4) {
	return Math.sqrt(n);
}

function pi() {
	return Math.PI;
}

function jarak(x: number = 0, y: number = 0) {
	return Math.hypot(x, y);
}

function jarakSudut(angleS: number = 0, angleT: number, min: boolean = true): number {
	return Basik.Transform.degDist(angleS, angleT, min);
}

function sudut(x: number, y: number): number {
	return Basik.Tf.sudut(x, y);
}

function polarX(panjang = 100, sudut = 0) {
	return Math.cos(sudut * Basik.Transform.DEG2RAD) * panjang;
}

function polarY(panjang = 100, sudut = 0) {
	return Math.sin(sudut * Basik.Transform.DEG2RAD) * panjang;
}

function abs(n: number) {
	return Math.abs(n);
}

function normalisasiSudut(sdt: number = 0): number {
	// gunakan modulus agar tetap dalam rentang -360 sampai 360
	let n = sdt % 360;

	// jika hasil negatif, tambahkan 360 agar masuk ke rentang 0-360
	if (n < 0) {
		n += 360;
	}

	return n;
}

function pembulatan(n: number, b: number = 1, type: number = 0) {
	if (type == 1) {
		return Math.ceil(n / b) * b;
	}
	else if (type == 2) {
		return Math.floor(n / b) * b;
	}
	return Math.round(n / b) * b;
}
