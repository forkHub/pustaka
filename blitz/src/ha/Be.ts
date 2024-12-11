namespace Basik {

	export class Graphic {
		private static _skalaOtomatis: boolean = true;
		private static _canvas: HTMLCanvasElement;

		static get context(): CanvasRenderingContext2D {
			return Graphic.canvas.getContext('2d');
		}

		public static get canvas(): HTMLCanvasElement {
			if (!Graphic._canvas) {
				Graphic._canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
			}

			if (!Graphic._canvas) {
				Graphic._canvas = document.createElement('canvas') as HTMLCanvasElement;
				document.body.appendChild(Graphic._canvas);
			}

			return Graphic._canvas;
		}

		// public static set canvas(value: HTMLCanvasElement) {
		// 	Graphic._canvas = value;
		// }

		private static _merah: number = 0;
		private static _hijau: number = 0;
		private static _biru: number = 0;
		private static _transparan: number = 0;

		private static warnaBackup: IWarna = {
			m: 0,
			b: 0,
			h: 0,
			t: 1
		}

		static Pause() {
			debugger;
			// this.canvasAktif.canvas.getcon
		}

		private static handleWindowResize(): void {
			if (!Graphic._skalaOtomatis) return;
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = Graphic.canvas;

			let cp = Graphic.canvas.width;
			let cl = Graphic.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			//TODO: rechek apakah masih dipakai
			// Graphic.canvasAktif.ratioX = ratio;
			// Graphic.canvasAktif.ratioY = ratio;

			canvas.style.position = 'fixed';
			canvas.style.zIndex = '1';
			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		static buatCanvas(canvasEl: HTMLCanvasElement): ImageObj {
			let canvas: ImageObj = new ImageObj();
			canvas.canvas = canvasEl;
			canvas.ctx = canvasEl.getContext('2d');
			canvas.lebar = canvasEl.height;
			canvas.panjang = canvasEl.width;
			canvas.frameH = canvasEl.height;
			canvas.frameW = canvasEl.width;
			canvas.rect = Kotak.buat();
			canvas.load = true;
			canvas.panjangDiSet = true;
			canvas.lebarDiSet = true;


			// {
			// 	canvas: canvasEl,
			// 	ctx: canvasEl.getContext('2d'),
			// 	lebar: canvasEl.height,
			// 	panjang: canvasEl.width,
			// 	frameH: canvasEl.height,
			// 	frameW: canvasEl.width,
			// 	handleX: 0,
			// 	handleY: 0,
			// 	img: null,
			// 	isAnim: false,
			// 	rotasi: 0,
			// 	alpha: 1,
			// 	rect: Kotak.buat(),
			// 	load: true,
			// 	panjangDiSet: true,
			// 	lebarDiSet: true,
			// 	ratioX: 1,
			// 	ratioY: 1,
			// 	ctrIdx: 0,
			// }

			return canvas;
		}

		// static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void {
		// 	// let canvas: ImageObj = Graphic.buatCanvas(canvasBelakang);
		// 	// Graphic._canvasAr.push(canvas);

		// 	// canvas = Graphic.buatCanvas(canvasDepan);
		// 	// Graphic._canvasAr.push(canvas);

		// 	// Graphic.canvasAktif = canvas;
		// 	Teks.Rata("center");
		// }

		private static backupWarna(): void {
			Graphic.warnaBackup.b = Graphic.biru;
			Graphic.warnaBackup.h = Graphic.hijau;
			Graphic.warnaBackup.m = Graphic.merah;
			Graphic.warnaBackup.t = Graphic.transparan;
		}

		private static restoreWarna(): void {
			Graphic.biru = Graphic.warnaBackup.b;
			Graphic.hijau = Graphic.warnaBackup.h;
			Graphic.merah = Graphic.warnaBackup.m;
			Graphic.transparan = Graphic.warnaBackup.t;
			Graphic.updateStyleWarna();
		}

		static Cls(red: number = 0, hijau: number = 0, biru: number = 0, transparan: number = 100): void {
			let ctx: CanvasRenderingContext2D = Graphic.context;
			// window.getComputedStyle()
			Graphic.backupWarna();
			ctx.clearRect(0, 0, parseInt(Graphic.canvas.style.width), parseInt(Graphic.canvas.style.height));
			ctx.fillStyle = `rgba(${red}, ${hijau}, ${biru}, ${transparan / 100})`;
			ctx.fillRect(0, 0, parseInt(Graphic.canvas.style.width), parseInt(Graphic.canvas.style.height));
			Graphic.restoreWarna();
		}

		static FillColor(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
			let h = Graphic;

			h.merah = r;
			h.biru = b;
			h.hijau = g;
			h.transparan = a / 100;
			h.updateStyleWarna();
		}

		static StrokeColor(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
			Graphic.context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		}

		static NoColor() {
			Graphic.context.strokeStyle = 'none';
		}

		private static updateStyleWarna(): void {
			// Graphics
			Graphic.context.fillStyle = `rgba(${Graphic.merah}, ${Graphic.hijau}, ${Graphic.biru}, ${Graphic.transparan})`;
		}

		/**
		 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
		 * @returns (number) warna merah
		 */
		static Hijau(): number {
			return Graphic.hijau;
		}

		static Merah(): number {
			return Graphic.merah;
		}

		/**
		 * Mengembalikan warna biru dari perintah AmbilPixel terakhir
		 * @returns (number) warna biru
		 */
		static Biru(): number {
			return Graphic.biru;
		}

		/**
		 * 
		 * @returns 
		 */
		static Transparan(): number {
			return Math.floor(Graphic.transparan * 100);
		}

		// public static set context(value: CanvasRenderingContext2D) {
		// 	Graphic._context = value;
		// }

		// private static getCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
		// 	//coba cari canvas
		// 	if (!canvas) {
		// 		canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
		// 	}

		// 	if (!canvas) {
		// 		document.body.appendChild(document.createElement('canvas'));
		// 	}

		// 	return canvas;
		// }


		static Start(panjang: number = 320, lebar: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true, input: boolean = true) {

			if (canvas) {
				Graphic._canvas = canvas;
			}
			Graphic._skalaOtomatis = fullScreen;

			console.log('inisialisasi');
			// Graphic.init(canvas, canvas);
			Graphic.Grafis2(panjang, lebar, Graphic._skalaOtomatis);

			if (input) {
				Input.init(Graphic.canvas);
			}

			// if (Graphic.skalaOtomatis) {
			window.addEventListener("resize", (): void => {
				Graphic.handleWindowResize();
			})

			// window.onresize = (): void => {
			// 	if (Graphic.skalaOtomatis) {
			// 		Graphic.handleWindowResize();
			// 	}
			// }
			// }


			setTimeout(() => {
				Graphic.handleWindowResize();
			}, 100);

			// setTimeout(() => {
			// 	ha.be.Blijs.repeat();
			// }, 0);

			//font default
			// Teks.Font("12px cursive");
			Teks.Rata("center");
			Teks.Goto(169, 10);
			Graphic.FillColor(255, 255, 255, 100);
			Graphic.context.strokeStyle = "#ffffff";

		}


		/** 
		 * @private 
		 * helper method
		 * */
		private static Grafis2(p: number = 320, l: number = 240, fullScreen: boolean): void {
			let canvas = Graphic.canvas;

			canvas.width = p;
			canvas.height = l;

			if (fullScreen) {
				canvas.style.width = p + 'px';
				canvas.style.height = l + 'px';
				canvas.style.padding = '0px';
				canvas.style.margin = '0px';
			}

			// canvas.panjang = p;
			// canvas.lebar = l;

			setTimeout(() => {
				Graphic.handleWindowResize();
			}, 0);

			// if (canvas2) {
			// 	Main.canvasAktif.canvas.classList.add('gl');
			// }
			// else {
			// 	Main.canvasAktif.canvas.classList.remove('gl');
			// }

			// if (skalaOtomatis) {
			// 	Main.canvasAktif.canvas.classList.add('pixel');
			// }

			// ha_blitz.Main.windowResize();
		}

		/**
		 * 
		 * @param Ax 
		 * @param Ay 
		 * @param Bx 
		 * @param By 
		 */
		static Garis(Ax: number, Ay: number, Bx: number, By: number) {
			let ctx: CanvasRenderingContext2D = Graphic.context;

			Ax = Math.floor(Ax);
			Ay = Math.floor(Ay);
			Bx = Math.floor(Bx);
			By = Math.floor(By);

			ctx.beginPath();
			ctx.moveTo(Ax, Ay);
			ctx.lineTo(Bx, By);
			ctx.stroke();
		}

		/**
		 * 
		 * @param x1 
		 * @param y1 
		 * @param x2 
		 * @param y2 
		 * @param isi 
		 * @param garis 
		 * @param rotasi 
		 */
		static Kotak(x1: number, y1: number, x2: number, y2: number, isi: boolean = false, garis: boolean = true, rotasi: number = 0) {
			let ctx: CanvasRenderingContext2D = Graphic.context;

			//TODO: rotasi
			rotasi;

			if (isi) {
				ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
			}

			if (garis) {
				ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
			}
		}

		/**
		 * Menggambar Oval
		 * @param x posisi x
		 * @param y posisi y
		 * @param radius radius
		 * @param skalaX skala horizontal
		 * @param skalaY skala vertikal
		 * @param rotasi sudut oval
		 */
		static Oval(x: number = 0, y: number = 0, radius: number, skalaX: number = 1, skalaY = .5, rotasi: number = 0) {
			let ctx: CanvasRenderingContext2D = Graphic.context

			// save state
			ctx.save();

			// translate context
			ctx.translate(x, y);

			ctx.rotate(rotasi * (Math.PI / 180));

			// scale context horizontally
			ctx.scale(skalaX, skalaY);

			// draw circle which will be stretched into an oval
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);

			// restore to original state
			ctx.restore();
			ctx.stroke();
		}

		// public static get canvasAktif(): ImageObj {
		// 	return Graphic._canvasAktif;
		// }

		// public static set canvasAktif(value: ImageObj) {
		// 	Graphic._canvasAktif = value;
		// }

		// public static get canvasAr(): ImageObj[] {
		// 	return Graphic._canvasAr;
		// }
		// public static set canvasAr(value: ImageObj[]) {
		// 	Graphic._canvasAr = value;
		// }

		// public static get skalaOtomatis(): boolean {
		// 	return Graphic._skalaOtomatis;
		// }

		// public static set skalaOtomatis(value: boolean) {
		// 	Graphic._skalaOtomatis = value;
		// }

		public static get merah(): number {
			return Graphic._merah;
		}

		public static set merah(value: number) {
			Graphic._merah = value;
		}

		public static get hijau(): number {
			return Graphic._hijau;
		}

		public static set hijau(value: number) {
			Graphic._hijau = value;
		}

		public static get biru(): number {
			return Graphic._biru;
		}

		public static set biru(value: number) {
			Graphic._biru = value;
		}

		public static get transparan(): number {
			return Graphic._transparan;
		}

		public static set transparan(value: number) {
			Graphic._transparan = value;
		}
	}

	interface IWarna {
		m: number,
		h: number,
		b: number,
		t: number
	}
}