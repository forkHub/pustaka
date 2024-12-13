namespace Basik {

	// internal class untuk menghandle geometri 
	// Kotak
	export class Kotak {
		readonly vs: Point[] = [];
		readonly segs: Segment[] = [];

		constructor() {

		}

		static buat(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): Kotak {
			let r: Kotak = new Kotak();
			r.vs.push(Point.create(x1, y1));
			r.vs.push(Point.create(x2, y1));
			r.vs.push(Point.create(x2, y2));
			r.vs.push(Point.create(x1, y2));

			r.segs.push(Segment.create(r.vs[0], r.vs[1]));
			r.segs.push(Segment.create(r.vs[1], r.vs[2]));
			r.segs.push(Segment.create(r.vs[2], r.vs[3]));
			r.segs.push(Segment.create(r.vs[3], r.vs[0]));

			return r;
		}

		private static copy(r: Kotak): Kotak {
			// console.log('copy:');
			// console.log(r.vs);

			// let hasil: IRect = Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
			let hasil: Kotak = Kotak.buat();
			Kotak.copyInfo(r, hasil);

			// console.log(hasil.vs);

			return hasil;
		}

		private static copyInfo(r1: Kotak, r2: Kotak): void {
			for (let i: number = 0; i < r1.segs.length; i++) {
				Segment.copy(r1.segs[i], r2.segs[i]);
			}
		}

		private static collideBound(r1: Kotak, r2: Kotak): boolean {
			// console.debug('collide bound');

			if (Kotak.maxX(r1) < Kotak.minX(r2)) {
				// console.debug('maxX gagal');
				return false;
			}

			// console.log('maxx ' + Rect.maxX(r1));
			// console.log('minx ' + Rect.minX(r2));

			if (Kotak.minX(r1) > Kotak.maxX(r2)) {
				// console.debug('min x gagal');
				return false;
			}

			if (Kotak.maxY(r1) < Kotak.minY(r2)) {
				// console.debug('max y gagal');
				return false;
			}

			if (Kotak.minY(r1) > Kotak.maxY(r2)) {
				// console.debug('min y gagal');
				return false;
			}

			return true;
		}

		static collide(r1: Kotak, r2: Kotak): boolean {
			let bound: boolean = Kotak.collideBound(r1, r2);
			if (!bound) return false;

			for (let i: number = 0; i < r1.segs.length; i++) {
				for (let j: number = 0; j < r2.segs.length; j++) {
					if (Segment.collide(r1.segs[i], r2.segs[j])) {
						return true;
					}
				}
			}

			return false;
		}

		private static collideDotBound(r: Kotak, d: Point): boolean {
			if (d.x < Kotak.minX(r)) {
				// console.log('minx failed');
				return false;
			}

			if (d.x > Kotak.maxX(r)) {
				// console.log('maxX failed');
				// console.log(d);
				// console.log(Rect.maxX(r));
				// console.log(r.vs);
				return false;
			}

			if (d.y < Kotak.minY(r)) {
				// console.log('minY failed');
				return false;
			}

			if (d.y > Kotak.maxY(r)) {
				// console.log('maxY failed');
				return false;
			}

			return true;
		}

		static collideDot(r: Kotak, x: number, y: number): boolean {
			let r2: Kotak = Kotak.copy(r);
			let p: Point = Point.create(x, y);
			let d: number = Segment.deg(r2.segs[0]);
			let pRot: Point = r2.vs[0];

			if (!Kotak.collideDotBound(r, p)) {
				return false;
			}

			Kotak.rotate(r2, -d, pRot.x, pRot.y, false);
			Point.putarPoros(p, pRot.x, pRot.y, -d);

			if (!Kotak.collideDotBound(r2, p)) {
				// console.log('collide bound 2 failed');
				// console.log('deg ' + d);
				// console.log('rect');
				// console.log(r2);
				return false;
			}

			return true;
		}

		static minX(r: Kotak): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: Point) => {
				if (item.x < x) x = item.x
			})

			return x;
		}

		static maxX(r: Kotak): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: Point) => {
				if (item.x > x) x = item.x
			})

			return x;
		}

		static minY(r: Kotak): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: Point) => {
				if (item.y < y) y = item.y
			})

			return y;
		}

		static maxY(r: Kotak): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: Point) => {
				if (item.y > y) y = item.y
			})

			return y;
		}

		static translate(rect: Kotak, x: number, y: number): void {
			rect.vs.forEach((v: Point) => {
				v.x += x;
				v.y += y;
			})
		}

		static rotate(r: Kotak, deg: number, xc: number = 0, yc: number, copy: boolean = true): Kotak {
			let r2: Kotak;

			if (copy) {
				r2 = Kotak.copy(r);
			}
			else {
				r2 = r;
			}

			r2.vs.forEach((p: Point) => {
				Point.putarPoros(p, xc, yc, deg);
			});

			return r2;
		}

	}
}