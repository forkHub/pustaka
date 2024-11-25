namespace bz {
	export class Point {
		private _x: number = 0;
		public get x(): number {
			return this._x;
		}
		public set x(value: number) {
			this._x = value;
		}
		private _y: number = 0;
		public get y(): number {
			return this._y;
		}
		public set y(value: number) {
			this._y = value;
		}

		constructor(x: number, y: number) {
			this._x = x;
			this._y = y;
		}
	}

	export function posIdx(idx: number, p: Point[]): Point[] {
		let hasil: Point[] = [];
		for (let i = 0; i <= p.length - 2; i++) {
			hasil.push(posIdx2(idx, [p[i], p[i + 1]]));
		}

		return hasil;
	}


	function posIdx2(idx: number, p: Point[]) {
		let ax = p[0].x + (idx * (p[1].x - p[0].x));
		let ay = p[0].y + (idx * (p[1].y - p[0].y));

		return new Point(ax, ay);
	}
}