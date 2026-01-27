namespace Basik {

	export class Pt {
		private _x: number;
		public get x(): number {
			return this._x;
		}
		public set x(value: number) {
			this._x = value;
		}
		private _y: number;
		public get y(): number {
			return this._y;
		}
		public set y(value: number) {
			this._y = value;
		}

		constructor(x: number = 0, y: number = 0) {
			this.x = x;
			this.y = y;
		}

		static create(x: number = 0, y: number = 0): Pt {
			return new Pt(x, y);
		}

		static copy(p1: Pt, p2: Pt): void {
			p2.x = p1.x;
			p2.y = p1.y;
		}

		static clone(p: Pt): Pt {
			let h: Pt = Pt.create(p.x, p.y);
			return h;
		}

		// static sama(p1: Pt, p2: Pt): boolean {
		// 	if (false == Tf.equal(p1.x, p2.x)) return false;
		// 	if (false == Tf.equal(p1.y, p2.y)) return false;
		// 	return true;
		// }

		static putarPoros(p: Pt, xc: number = 0, yc: number = 0, deg: number = 0): void {
			Tf.rotateRel(p.x, p.y, xc, yc, deg);

			p.x = Tf.lastX;
			p.y = Tf.lastY;

		}

		// static posDist(p: Pt, xt: number, yt: number, jrk: number): Pt {
		// 	let jrkA: number;
		// 	let i: number;
		// 	let j: number;
		// 	let rasio: number;
		// 	let hasil: Pt = Pt.create();

		// 	//jarak sekarang
		// 	jrkA = Tf.jarak(p.x, p.y, xt, yt);
		// 	i = xt - p.x;
		// 	j = yt - p.y;

		// 	rasio = jrkA / jrk;

		// 	hasil.x = i * rasio;
		// 	hasil.y = j * rasio;

		// 	hasil.x = xt - hasil.x;
		// 	hasil.y = yt - hasil.y;

		// 	return hasil;
		// }

		// static posPolar(jarak: number, sudut: number, xt: number, yt: number): Pt {
		// 	let hasil: Pt = Pt.create();

		// 	hasil.x = jarak * Math.cos(sudut * Tf.DEG2RAD);
		// 	hasil.y = jarak * Math.sin(sudut * Tf.DEG2RAD);

		// 	hasil.x += xt;
		// 	hasil.y += yt;

		// 	return hasil;
		// }

	}
}
