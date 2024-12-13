namespace Basik {

	/**
	 * 
	 */
	export class Point {
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

		static create(x: number = 0, y: number = 0): Point {
			return new Point(x, y);
		}

		static copy(p1: Point, p2: Point): void {
			p2.x = p1.x;
			p2.y = p1.y;
		}

		static clone(p: Point): Point {
			let h: Point = Point.create(p.x, p.y);
			return h;
		}

		static sama(p1: Point, p2: Point): boolean {
			if (false == Transform.equal(p1.x, p2.x)) return false;
			if (false == Transform.equal(p1.y, p2.y)) return false;
			return true;
		}

		static putarPoros(p: Point, xc: number = 0, yc: number = 0, deg: number = 0): void {
			Transform.rotateRel(p.x, p.y, xc, yc, deg);

			p.x = Transform.lastX;
			p.y = Transform.lastY;

		}

		static posDist(p: Point, xt: number, yt: number, jrk: number): Point {
			let jrkA: number;
			let i: number;
			let j: number;
			let rasio: number;
			let hasil: Point = Point.create();

			//jarak sekarang
			jrkA = Transform.jarak(p.x, p.y, xt, yt);
			i = xt - p.x;
			j = yt - p.y;

			rasio = jrkA / jrk;

			hasil.x = i * rasio;
			hasil.y = j * rasio;

			hasil.x = xt - hasil.x;
			hasil.y = yt - hasil.y;

			return hasil;
		}

		static posPolar(jarak: number, sudut: number, xt: number, yt: number): Point {
			let hasil: Point = Point.create();

			hasil.x = jarak * Math.cos(sudut * Transform.DEG2RAD);
			hasil.y = jarak * Math.sin(sudut * Transform.DEG2RAD);

			hasil.x += xt;
			hasil.y += yt;

			return hasil;
		}

	}
}
