///<reference path="./SpriteImage.ts"/>

namespace ha.be {

	export class Spr {
		static readonly daftar: SprObj[] = [];

		private static checkNull(s: SprObj): void {
			if (s == null) throw Error("Image belum di inisialisasi");
		}

		//Attribute [depecrated]
		//depecrated
		static DragMode(s: SprObj, n: number): void {
			Spr.checkNull(s);

			if (n > 0) {
				s.tipeDrag = n;
				s.dragable = true;
			}
		}

		//depecrated
		/**
		 * 
		 * @param s 
		 * @returns 
		 */
		static Dimuat(s: SprObj): boolean {
			Spr.checkNull(s);

			return s.load;
		}

		/**
		 * depecrated
		 * @param s 
		 * @returns 
		 */
		static StatusDrag(s: SprObj): boolean {
			let hasil: boolean = false;

			Spr.checkNull(s);

			Spr.daftar.forEach((item: SprObj) => {
				if (s == item) {
					hasil = s.dragged;
					return;
				}
			});

			return hasil;
		}

		/** 
		 * [depecrated]
		 * @param s 
		 * @returns 
		 */
		static kontek(s: SprObj): CanvasRenderingContext2D {
			Spr.checkNull(s);

			return s.ctx;
		}


		/**
		 * [depecrated]
		 * @param s 
		 * @param pj 
		 * @returns 
		 */
		static Panjang(s: SprObj, pj?: number): number {
			Spr.checkNull(s);

			return SprImg.panjang(s, pj);
		}

		/**
		 * [depacrated]
		 * @param s 
		 * @param lb 
		 * @returns 
		 */
		static Lebar(s: SprObj, lb?: number): number {
			Spr.checkNull(s);
			return SprImg.lebar(s, lb);
		}

		/**
		 * depecrated
		 * @param s 
		 * @param alpha 0-100s
		 * @returns 
		 */
		static Alpha(s: SprObj, alpha?: number): number {
			Spr.checkNull(s);
			if (typeof (alpha) == 'number') {
				s.alpha = alpha;
			}

			return s.alpha;
		}

		/**
		 * depecrated
		 * @param s 
		 * @param sudut 
		 * @returns 
		 */
		static Rotasi(s: SprObj, sudut?: number): number {
			Spr.checkNull(s);
			if (s && (typeof (sudut) == 'number')) {
				s.rotasi = sudut;
			}

			return Transform.normalizeDeg(s.rotasi);
		}

		//method

		/**
		 * 
		 * @param s 
		 * @param x 
		 * @param y 
		 */
		static Posisi(s: SprObj, x: number = 0, y: number = 0) {
			Spr.checkNull(s);
			s.x = x;
			s.y = y;
		}

		/**
		 * depecrated
		 * @param s 
		 * @param x 
		 * @returns 
		 */
		static PosisiX(s: SprObj, x: number | null | undefined = null): number {
			Spr.checkNull(s);
			if (typeof (x) == 'number') {
				s.x = x;
			}

			return s.x;
		}

		/**
		 * depecrated
		 * @param s 
		 * @param y 
		 * @returns 
		 */
		static PosisiY(s: SprObj, y: number | null | undefined = null): number {
			if (typeof (y) == 'number') {
				// debugger;
				s.y = y;
			}

			return s.y;
		}

		/**
		 * 
		 * @param s 
		 * @returns 
		 */
		static Bound(s: SprObj): Ikt {
			SprImg.resetRect(s);
			SprImg.rectToImageTransform(s, s.x, s.y);
			return s.rect;
		}

		//TODO:boundx, boundy, boundX2, boundY2

		/**
		 * 
		 * @param s 
		 * @param x 
		 * @param y 
		 * @returns 
		 */
		static Handle(s: SprObj, x: number = 0, y: number = 0): void {
			if (s) {
				s.handleX = x;
				s.handleY = y;
			}
		}

		//depecrated
		static HandleX(s: SprObj): number { return s.handleX; }
		static HandleY(s: SprObj): number { return s.handleY; }

		/**
		 * 
		 * @param s 
		 * @param w 
		 * @param h 
		 */
		static Ukuran(s: SprObj, w: number, h: number): void {
			SprImg.ukuran(s, w, h);
		}


		//================
		//Image Operation:
		//================

		/**
		 * 
		 * @param s {ISprObj} sprite 
		 * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
		 * @returns 
		 */
		static Copy(s: SprObj, onload?: () => void): SprObj {
			if (!onload) {
				onload = () => { };
			}

			if (s.isAnim) {
				console.debug('copy sprite anim');
				console.debug(s);
				return Spr.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.dragable, s.canvas, s.tipeDrag);
			}
			else {
				return Spr.muatAsyncBerbagiKanvas(s.url, s.dragable, s.canvas, s.tipeDrag, onload)
			}
		}


		/**
		 * 
		 */
		static GambarSemua() {
			for (let i: number = 0; i < Spr.daftar.length; i++) {
				let item: SprObj = Spr.daftar[i];
				Spr.Gambar(item);
			}
		}

		/**
		 * 
		 * @param spr 
		 * @param spr2 
		 * @returns 
		 */
		static Tabrakan(spr: SprObj, spr2: SprObj): boolean {
			return SprImg.tabrakan(spr, Spr.PosisiX(spr), Spr.PosisiY(spr), spr2, Spr.PosisiX(spr2), Spr.PosisiY(spr2))
		}

		//TODO: depecrated
		static TabrakanXY(spr: SprObj, x1: number, y1: number, spr2: SprObj, x2: number, y2: number): boolean {
			return SprImg.tabrakan(spr, x1, y1, spr2, x2, y2)
		}

		private static muatAnimasiAsyncKanvas(
			url: string,
			pf: number,
			lf: number,
			bisaDiDrag: boolean,
			canvas: HTMLCanvasElement,
			tipeDrag: number): SprObj {

			let img: SprObj = SprImg.muatAnimAsyncCanvas(url, pf, lf, canvas);
			return Spr.register(img, bisaDiDrag, url, tipeDrag);
		}

		/**
		 * 
		 * @param url 
		 * @param pf 
		 * @param lf 
		 * @param bisaDiDrag 
		 * @param tipeDrag 
		 * @returns 
		 */
		static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag: boolean = false, tipeDrag: number = 0): SprObj {
			let img: SprObj = SprImg.muatAnimAsync(url, pf, lf);
			return Spr.register(img, bisaDiDrag, url, tipeDrag);
		}

		private static muatAsyncBerbagiKanvas(
			url: string,
			dragable = false,
			canvas: HTMLCanvasElement,
			tipeDrag: number,
			onload: () => void): SprObj {

			let img: SprObj = SprImg.muatAsyncKanvas(url, canvas, onload);
			return Spr.register(img, dragable, url, tipeDrag);
		}

		/**
		 * 
		 * @param url (string) url gambar
		 * @param bisaDiDrag 
		 * @param tipeDrag 
		 * @param onload 
		 * @returns 
		 */
		static Muat(url: string, bisaDiDrag: boolean = false, tipeDrag: number = 0, onload?: () => void): SprObj {
			if (!onload) onload = () => { };
			let img: SprObj = SprImg.muatAsync(url, onload);
			let spr: SprObj = Spr.register(img, bisaDiDrag, url, tipeDrag);
			return spr;
		}

		private static register(
			image: SprObj,
			dragable: boolean = false,
			url: string,
			tipeDrag: number): SprObj {

			let hasil: SprObj;
			hasil = image;
			hasil.dragable = dragable;
			hasil.tipeDrag = tipeDrag;
			hasil.url = url;
			if (hasil.dragable) {
				if (hasil.tipeDrag == 0) {
					hasil.tipeDrag = 1;
				}
			}

			Spr.daftar.push(hasil);

			// console.debug('buat sprite');
			// console.debug(hasil);

			return hasil;
		}

		/**
		 * Menggambar sprite ke layar
		 * @param sprite 
		 * @param frame 
		 */
		static Gambar(sprite: SprObj, frame?: number): void {
			SprImg.gambar(sprite, sprite.x, sprite.y, frame);
		}

		/**
		 * 
		 * @param s 
		 * @param x 
		 * @param y 
		 * @param frame 
		 * @returns 
		 */
		static GambarXY(s: SprObj, x: number, y: number, frame?: number): void {
			s.x = x;
			s.y = y;
			SprImg.gambar(s, x, y, frame);
		}

		/**
		 * 
		 * @param spr 
		 * @param sudut 
		 * @param jarak 
		 * @param x2 
		 * @param y2 
		 * @param skalaX 
		 * @param skalaY 
		 */
		static posisiPolar(spr: SprObj, sudut: number, jarak: number, x2: number, y2: number, skalaX: number = 1, skalaY: number = 1, tilt: number = 0): void {
			let p: IPoint2D = Point.posPolar(jarak, sudut, x2, y2);
			p.y -= y2;
			p.y *= skalaY;
			p.y += y2;

			p.x -= x2;
			p.x *= skalaX;
			p.x += x2;

			//tilt
			Transform.rotateRel(p.x, p.y, x2, y2, tilt);
			p.x = Transform.lastX;
			p.y = Transform.lastY;

			spr.x = p.x;
			spr.y = p.y;
		}

		/**
		 * 
		 * @param spr 
		 * @param x 
		 * @param y 
		 * @param frame 
		 */
		static Ubin(spr: SprObj, x: number = 0, y: number = 0, frame: number = 0) {
			SprImg.gambarUbin(spr, x, y, frame);
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static StatusMuat(spr?: SprObj): boolean {
			let hasil: boolean = true;

			if (spr && spr) {
				return spr.load;
			}

			Spr.daftar.forEach((item: SprObj) => {
				if (!item.load) {
					hasil = false;
				}
			})

			return hasil;
		}

	}

}

