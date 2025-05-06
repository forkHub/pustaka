namespace Basik {

	/**
	 * depecrated sprite functionality
	 */
	export class SprDep {

		//depecrated
		static HandleX(s: ImgObj): number { return s.handleX; }
		static HandleY(s: ImgObj): number { return s.handleY; }

		static Handle(img: ImgObj, x: number = 0, y: number = 0): void {
			img.handleX = x;
			img.handleY = y;
		}

		static ResizeImage(s: ImgObj, w: number, h: number): void {
			Ip.ukuran(s, w, h);
		}

		static PositionImageXY(img: ImgObj, x: number = 0, y: number = 0) {
			img.x = x;
			img.y = y;
		}

		static StatusMuat(spr?: ImgObj): boolean {
			return spr.load;
		}

		static TabrakanXY(spr: ImgObj, x1: number, y1: number, spr2: ImgObj, x2: number, y2: number): boolean {
			return Ip.tabrakan(spr, x1, y1, spr2, x2, y2)
		}

		static PosisiX(s: ImgObj, x: number | null | undefined = null): number {
			if (typeof (x) == 'number') {
				s.x = x;
			}

			return s.x;
		}

		static PosisiY(s: ImgObj, y: number | null | undefined = null): number {
			if (typeof (y) == 'number') {
				// debugger;
				s.y = y;
			}

			return s.y;
		}

		static DragMode(s: ImgObj, n: number): void {
			if (n > 0) {
				s.tipeDrag = n;
				s.dragable = true;
			}
		}

		static Dimuat(s: ImgObj): boolean {
			return s.load;
		}

		static StatusDrag(s: ImgObj): boolean {
			return s.dragged;
		}

		static kontek(s: ImgObj): CanvasRenderingContext2D {
			return s.ctx;
		}

		static Panjang(s: ImgObj, pj?: number): number {
			return Ip.panjang(s, pj);
		}

		static Lebar(s: ImgObj, lb?: number): number {
			return Ip.lebar(s, lb);
		}

		static Alpha(s: ImgObj, alpha?: number): number {
			if (typeof (alpha) == 'number') {
				s.alpha = alpha;
			}

			return s.alpha;
		}

		static Rotasi(s: ImgObj, sudut?: number): number {
			if (s && (typeof (sudut) == 'number')) {
				s.rotasi = sudut;
			}

			return Tf.normalizeDeg(s.rotasi);
		}

	}
}