namespace Basik {

	export class SprDep {

		//depecrated
		static HandleX(s: ImageObj): number { return s.handleX; }
		static HandleY(s: ImageObj): number { return s.handleY; }

		static Handle(img: ImageObj, x: number = 0, y: number = 0): void {
			img.handleX = x;
			img.handleY = y;
		}

		static Ukuran(s: ImageObj, w: number, h: number): void {
			ImgImpl.ukuran(s, w, h);
		}

		static PositionImage(img: ImageObj, x: number = 0, y: number = 0) {
			img.x = x;
			img.y = y;
		}

		static StatusMuat(spr?: ImageObj): boolean {
			return spr.load;
		}

		static TabrakanXY(spr: ImageObj, x1: number, y1: number, spr2: ImageObj, x2: number, y2: number): boolean {
			return ImgImpl.tabrakan(spr, x1, y1, spr2, x2, y2)
		}

		static PosisiX(s: ImageObj, x: number | null | undefined = null): number {
			if (typeof (x) == 'number') {
				s.x = x;
			}

			return s.x;
		}

		static PosisiY(s: ImageObj, y: number | null | undefined = null): number {
			if (typeof (y) == 'number') {
				// debugger;
				s.y = y;
			}

			return s.y;
		}

		static DragMode(s: ImageObj, n: number): void {
			if (n > 0) {
				s.tipeDrag = n;
				s.dragable = true;
			}
		}

		static Dimuat(s: ImageObj): boolean {
			return s.load;
		}

		static StatusDrag(s: ImageObj): boolean {
			return s.dragged;
		}

		static kontek(s: ImageObj): CanvasRenderingContext2D {
			return s.ctx;
		}

		static Panjang(s: ImageObj, pj?: number): number {
			return ImgImpl.panjang(s, pj);
		}

		static Lebar(s: ImageObj, lb?: number): number {
			return ImgImpl.lebar(s, lb);
		}

		static Alpha(s: ImageObj, alpha?: number): number {
			if (typeof (alpha) == 'number') {
				s.alpha = alpha;
			}

			return s.alpha;
		}

		static Rotasi(s: ImageObj, sudut?: number): number {
			if (s && (typeof (sudut) == 'number')) {
				s.rotasi = sudut;
			}

			return Transform.normalizeDeg(s.rotasi);
		}

	}
}