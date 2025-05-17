namespace Basik {

	// internal class untuk menghandle geometri 
	// Kotak
	export class Ktk {
		readonly vs: Pt[] = [];
		readonly segs: Seg[] = [];

		constructor() {

		}

		static buat(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): Ktk {
			let r: Ktk = new Ktk();
			r.vs.push(Pt.create(x1, y1));
			r.vs.push(Pt.create(x2, y1));
			r.vs.push(Pt.create(x2, y2));
			r.vs.push(Pt.create(x1, y2));

			r.segs.push(Seg.create(r.vs[0], r.vs[1]));
			r.segs.push(Seg.create(r.vs[1], r.vs[2]));
			r.segs.push(Seg.create(r.vs[2], r.vs[3]));
			r.segs.push(Seg.create(r.vs[3], r.vs[0]));

			return r;
		}

		private static copy(r: Ktk): Ktk {
			// console.log('copy:');
			// console.log(r.vs);

			// let hasil: IRect = Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
			let hasil: Ktk = Ktk.buat();
			Ktk.copyInfo(r, hasil);

			// console.log(hasil.vs);

			return hasil;
		}

		private static copyInfo(r1: Ktk, r2: Ktk): void {
			for (let i: number = 0; i < r1.segs.length; i++) {
				Seg.copy(r1.segs[i], r2.segs[i]);
			}
		}

		private static collideBound(r1: Ktk, r2: Ktk): boolean {
			// console.debug('collide bound');

			if (Ktk.maxX(r1) < Ktk.minX(r2)) {
				// console.debug('maxX gagal');
				return false;
			}

			// console.log('maxx ' + Rect.maxX(r1));
			// console.log('minx ' + Rect.minX(r2));

			if (Ktk.minX(r1) > Ktk.maxX(r2)) {
				// console.debug('min x gagal');
				return false;
			}

			if (Ktk.maxY(r1) < Ktk.minY(r2)) {
				// console.debug('max y gagal');
				return false;
			}

			if (Ktk.minY(r1) > Ktk.maxY(r2)) {
				// console.debug('min y gagal');
				return false;
			}

			return true;
		}

		static collide(r1: Ktk, r2: Ktk): boolean {
			let bound: boolean = Ktk.collideBound(r1, r2);
			if (!bound) return false;

			for (let i: number = 0; i < r1.segs.length; i++) {
				for (let j: number = 0; j < r2.segs.length; j++) {
					if (Seg.collide(r1.segs[i], r2.segs[j])) {
						return true;
					}
				}
			}

			return false;
		}

		private static collideDotBound(r: Ktk, d: Pt): boolean {
			if (d.x < Ktk.minX(r)) {
				// console.log('minx failed');
				return false;
			}

			if (d.x > Ktk.maxX(r)) {
				// console.log('maxX failed');
				// console.log(d);
				// console.log(Rect.maxX(r));
				// console.log(r.vs);
				return false;
			}

			if (d.y < Ktk.minY(r)) {
				// console.log('minY failed');
				return false;
			}

			if (d.y > Ktk.maxY(r)) {
				// console.log('maxY failed');
				return false;
			}

			return true;
		}

		static collideDot(r: Ktk, x: number, y: number): boolean {
			let r2: Ktk = Ktk.copy(r);
			let p: Pt = Pt.create(x, y);
			let d: number = Seg.deg(r2.segs[0]);
			let pRot: Pt = r2.vs[0];

			if (!Ktk.collideDotBound(r, p)) {
				return false;
			}

			Ktk.rotate(r2, -d, pRot.x, pRot.y, false);
			Pt.putarPoros(p, pRot.x, pRot.y, -d);

			if (!Ktk.collideDotBound(r2, p)) {
				// console.log('collide bound 2 failed');
				// console.log('deg ' + d);
				// console.log('rect');
				// console.log(r2);
				return false;
			}

			return true;
		}

		static minX(r: Ktk): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: Pt) => {
				if (item.x < x) x = item.x
			})

			return x;
		}

		static maxX(r: Ktk): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: Pt) => {
				if (item.x > x) x = item.x
			})

			return x;
		}

		static minY(r: Ktk): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: Pt) => {
				if (item.y < y) y = item.y
			})

			return y;
		}

		static maxY(r: Ktk): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: Pt) => {
				if (item.y > y) y = item.y
			})

			return y;
		}

		static translate(rect: Ktk, x: number, y: number): void {
			rect.vs.forEach((v: Pt) => {
				v.x += x;
				v.y += y;
			})
		}

		static rotate(r: Ktk, deg: number, xc: number = 0, yc: number, copy: boolean = true): Ktk {
			let r2: Ktk;

			if (copy) {
				r2 = Ktk.copy(r);
			}
			else {
				r2 = r;
			}

			r2.vs.forEach((p: Pt) => {
				Pt.putarPoros(p, xc, yc, deg);
			});

			return r2;
		}

	}
}