namespace Basik {

	export class Seg {

		/**
		 * 
		 */
		private _A: Pt;
		public get A(): Pt {
			return this._A;
		}
		public set A(value: Pt) {
			this._A = value;
		}

		/**
		 * 
		 */
		private _B: Pt;
		public get B(): Pt {
			return this._B;
		}
		public set B(value: Pt) {
			this._B = value;
		}

		constructor(A: Pt = new Pt(), B: Pt = new Pt()) {
			this.A = A;
			this.B = B;
		}

		static create(v1: Pt = new Pt(), v2: Pt = new Pt()): Seg {
			return new Sg(v1, v2);
		}

		private static boundCollide(seg1: Seg, seg2: Seg): boolean {
			if (Sg.maxX(seg1) < Sg.minX(seg2)) return false;
			if (Sg.minX(seg1) > Sg.maxX(seg2)) return false;

			if (Sg.maxY(seg1) < Sg.minY(seg2)) return false;
			if (Sg.minY(seg1) > Sg.maxY(seg2)) return false;

			return true;
		}

		static collide(seg1: Seg, seg2: Seg): boolean {
			let bound: boolean = Sg.boundCollide(seg1, seg2);
			if (!bound) return false;

			// let deg: number = Sg.deg(seg2);
			let seg2Copy: Seg = Sg.clone(seg2);
			let seg1Copy: Seg = Sg.clone(seg1);
			let deg: number = Sg.deg(seg2);

			Sg.rotate(seg2Copy, -deg, seg2.A.x, seg2.A.y);
			Sg.rotate(seg1Copy, -deg, seg2.A.x, seg2.A.y);

			if (!Sg.boundCollide(seg1Copy, seg2Copy)) return false;

			Sg.translate(seg1Copy, -seg2.A.x, -seg2.A.y);
			Sg.translate(seg2Copy, -seg2.A.x, -seg2.A.y);

			if (!Sg.crossHor(seg1Copy)) {
				return false;
			}

			let idx: number = Sg.xHorIdx(seg1Copy);
			let x: number = Sg.getXAtIdx(seg1Copy, idx);

			if (x > Sg.maxX(seg2Copy)) return false;
			if (x < Sg.minX(seg2Copy)) return false;

			return true;
		}

		static copy(seg1: Seg, seg2: Seg): void {
			Pt.copy(seg1.A, seg2.B);
			Pt.copy(seg1.B, seg2.B);
		}

		private static clone(seg: Seg): Seg {
			return new Seg(Pt.clone(seg.A), Pt.clone(seg.B))
		}

		private static crossHor(seg: Seg): boolean {
			if (Sg.maxY(seg) > 0) {
				if (Sg.minY(seg) < 0) {
					return true;
				}
			}

			return false;
		}

		static deg(line: Seg): number {
			let j: number = line.B.y - line.A.y;
			let i: number = line.B.x - line.A.x;

			return Tf.sudut(i, j);
		}

		private static getXAtIdx(seg: Seg, idx: number): number {
			return seg.A.x + (idx * Sg.vecI(seg));
		}

		// static getYAtIdx(seg: Seg, idx: number): number {
		// 	return seg.A.y + (idx * Sg.vecJ(seg));
		// }

		private static vecI(seg: Seg): number {
			return seg.B.x - seg.A.x;
		}

		// static vecJ(seg: Seg): number {
		// 	return seg.B.y - seg.A.y;
		// }

		private static rotate(seg: Seg, deg: number = 0, xc: number = 0, yc: number = 0): void {
			Pt.putarPoros(seg.A, xc, yc, deg);
			Pt.putarPoros(seg.B, xc, yc, deg);
		}

		private static minX(seg: Seg): number {
			return Math.min(seg.A.x, seg.B.x);
		}

		private static maxX(seg: Seg): number {
			return Math.max(seg.A.x, seg.B.x);
		}

		private static minY(seg: Seg): number {
			return Math.min(seg.A.y, seg.B.y);
		}

		private static maxY(seg: Seg): number {
			return Math.max(seg.A.y, seg.B.y);
		}

		private static translate(seg: Seg, x: number = 0, y: number = 0) {
			seg.A.x += x;
			seg.A.y += y;
			seg.B.x += x;
			seg.B.y += y;
		}

		private static xHorIdx(seg: Seg): number {
			if (!Seg.crossHor(seg)) return NaN;

			let idx: number = 0;
			idx = (0 - seg.A.y) / (seg.B.y - seg.A.y)

			return idx;
		}
	}
	export const Sg = Seg;

}