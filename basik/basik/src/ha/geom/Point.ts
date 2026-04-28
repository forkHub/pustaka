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

		static putarPoros(p: Pt, xc: number = 0, yc: number = 0, deg: number = 0): void {
			Tf.rotateRel(p.x, p.y, xc, yc, deg);

			p.x = Tf.lastX;
			p.y = Tf.lastY;

		}
	}
}
