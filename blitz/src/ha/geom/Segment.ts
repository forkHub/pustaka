namespace Basik {

	/**
	 * 
	 */
	export class Segment {

		/**
		 * 
		 */
		private _A: Point;
		public get A(): Point {
			return this._A;
		}
		public set A(value: Point) {
			this._A = value;
		}

		/**
		 * 
		 */
		private _B: Point;
		public get B(): Point {
			return this._B;
		}
		public set B(value: Point) {
			this._B = value;
		}

		constructor(A: Point = new Point(), B: Point = new Point()) {
			this.A = A;
			this.B = B;
		}

		static create(v1: Point = new Point(), v2: Point = new Point()): Segment {
			return new Segment(v1, v2);
		}

		static boundCollide(seg1: Segment, seg2: Segment): boolean {
			if (Segment.maxX(seg1) < Segment.minX(seg2)) return false;
			if (Segment.minX(seg1) > Segment.maxX(seg2)) return false;

			if (Segment.maxY(seg1) < Segment.minY(seg2)) return false;
			if (Segment.minY(seg1) > Segment.maxY(seg2)) return false;

			return true;
		}

		static collide(seg1: Segment, seg2: Segment): boolean {
			let bound: boolean = Segment.boundCollide(seg1, seg2);
			if (!bound) return false;

			// let deg: number = Segment.deg(seg2);
			let seg2Copy: Segment = Segment.clone(seg2);
			let seg1Copy: Segment = Segment.clone(seg1);
			let deg: number = Segment.deg(seg2);

			Segment.rotate(seg2Copy, -deg, seg2.A.x, seg2.A.y);
			Segment.rotate(seg1Copy, -deg, seg2.A.x, seg2.A.y);

			if (!Segment.boundCollide(seg1Copy, seg2Copy)) return false;

			Segment.translate(seg1Copy, -seg2.A.x, -seg2.A.y);
			Segment.translate(seg2Copy, -seg2.A.x, -seg2.A.y);

			if (!Segment.crossHor(seg1Copy)) {
				return false;
			}

			let idx: number = Segment.xHorIdx(seg1Copy);
			let x: number = Segment.getXAtIdx(seg1Copy, idx);

			if (x > Segment.maxX(seg2Copy)) return false;
			if (x < Segment.minX(seg2Copy)) return false;

			return true;
		}

		static copy(seg1: Segment, seg2: Segment): void {
			Point.copy(seg1.A, seg2.B);
			Point.copy(seg1.B, seg2.B);
		}

		static clone(seg: Segment): Segment {
			return new Segment(Point.clone(seg.A), Point.clone(seg.B))
		}

		static crossHor(seg: Segment): boolean {
			if (Segment.maxY(seg) > 0) {
				if (Segment.minY(seg) < 0) {
					return true;
				}
			}

			return false;
		}

		static deg(line: Segment): number {
			let j: number = line.B.y - line.A.y;
			let i: number = line.B.x - line.A.x;

			return Transform.sudut(i, j);
		}

		static getXAtIdx(seg: Segment, idx: number): number {
			return seg.A.x + (idx * Segment.vecI(seg));
		}

		static getYAtIdx(seg: Segment, idx: number): number {
			return seg.A.y + (idx * Segment.vecJ(seg));
		}

		static vecI(seg: Segment): number {
			return seg.B.x - seg.A.x;
		}

		static vecJ(seg: Segment): number {
			return seg.B.y - seg.A.y;
		}

		static rotate(seg: Segment, deg: number = 0, xc: number = 0, yc: number = 0): void {
			Point.putarPoros(seg.A, xc, yc, deg);
			Point.putarPoros(seg.B, xc, yc, deg);
		}

		static minX(seg: Segment): number {
			return Math.min(seg.A.x, seg.B.x);
		}

		static maxX(seg: Segment): number {
			return Math.max(seg.A.x, seg.B.x);
		}

		static minY(seg: Segment): number {
			return Math.min(seg.A.y, seg.B.y);
		}

		static maxY(seg: Segment): number {
			return Math.max(seg.A.y, seg.B.y);
		}

		static translate(seg: Segment, x: number = 0, y: number = 0) {
			seg.A.x += x;
			seg.A.y += y;
			seg.B.x += x;
			seg.B.y += y;
		}

		//tested
		static xHorIdx(seg: Segment): number {
			if (!Segment.crossHor(seg)) return NaN;

			let idx: number = 0;
			idx = (0 - seg.A.y) / (seg.B.y - seg.A.y)

			return idx;
		}
	}

}