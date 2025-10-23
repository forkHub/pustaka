namespace Basik {

	export class Graphic {
		private static _skalaOtomatis: boolean = true;
		public static get skalaOtomatis(): boolean {
			return G._skalaOtomatis;
		}
		public static set skalaOtomatis(value: boolean) {
			G._skalaOtomatis = value;
		}
		private static _canvas: HTMLCanvasElement;

		static get context(): CanvasRenderingContext2D {
			return G.canvas.getContext('2d');
		}

		public static get canvas(): HTMLCanvasElement {
			if (!G._canvas) {
				G._canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
			}

			if (!G._canvas) {
				G._canvas = document.createElement('canvas') as HTMLCanvasElement;
				document.body.appendChild(G._canvas);
			}

			return G._canvas;
		}

		public static set canvas(c: HTMLCanvasElement) {
			G._canvas = c;
		}

		private static _merah: number = 0;
		private static _hijau: number = 0;
		private static _biru: number = 0;
		private static _transparan: number = 0;

		private static warnaBackup: IRGB = {
			r: 0,
			b: 0,
			g: 0,
			t: 1
		}

		static Pause() {
			debugger;
			// this.canvasAktif.canvas.getcon
		}

		static handleWindowResize(): void {
			if (!G._skalaOtomatis) return;
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = G.canvas;

			let cp = G.canvas.width;
			let cl = G.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			//TODO: rechek apakah masih dipakai
			// G.canvasAktif.ratioX = ratio;
			// G.canvasAktif.ratioY = ratio;

			canvas.style.position = 'fixed';
			canvas.style.zIndex = '1';
			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		static buatCanvas(canvasEl: HTMLCanvasElement): ImgObj {
			let canvas: ImgObj = new ImgObj();
			canvas.canvas = canvasEl;
			canvas.ctx = canvasEl.getContext('2d');
			canvas.lebar = canvasEl.height;
			canvas.panjang = canvasEl.width;
			canvas.frameH = canvasEl.height;
			canvas.frameW = canvasEl.width;
			canvas.rect = Ktk.buat();
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

		static backupWarna(): void {
			G.warnaBackup.b = G.biru;
			G.warnaBackup.g = G.hijau;
			G.warnaBackup.r = G.merah;
			G.warnaBackup.t = G.transparan;
		}

		static restoreColor(): void {
			G.biru = G.warnaBackup.b;
			G.hijau = G.warnaBackup.g;
			G.merah = G.warnaBackup.r;
			G.transparan = G.warnaBackup.t;
			G.updateStyleWarna();
		}

		static FillColor(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
			let h = G;

			h.merah = r;
			h.biru = b;
			h.hijau = g;
			h.transparan = a / 100;
			h.updateStyleWarna();
		}


		static NoColor() {
			G.context.strokeStyle = 'none';
		}

		static updateStyleWarna(): void {
			// Gs
			G.context.fillStyle = `rgba(${G.merah}, ${G.hijau}, ${G.biru}, ${G.transparan})`;
		}

		static init(p: number = 320, l: number = 240, fullScreen: boolean): void {
			let canvas = G.canvas;

			canvas.width = p;
			canvas.height = l;

			if (fullScreen) {
				canvas.style.width = p + 'px';
				canvas.style.height = l + 'px';
				canvas.style.padding = '0px';
				canvas.style.margin = '0px';
			}

			// window.

			// canvas.panjang = p;
			// canvas.lebar = l;

			setTimeout(() => {
				G.handleWindowResize();
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

		public static get merah(): number {
			return G._merah;
		}

		public static set merah(value: number) {
			G._merah = value;
		}

		public static get hijau(): number {
			return G._hijau;
		}

		public static set hijau(value: number) {
			G._hijau = value;
		}

		public static get biru(): number {
			return G._biru;
		}

		public static set biru(value: number) {
			G._biru = value;
		}

		public static get transparan(): number {
			return G._transparan;
		}

		public static set transparan(value: number) {
			G._transparan = value;
		}
	}
	export const G = Graphic;

	export interface IEvent {
		id: string;
		type: string,
		handle: () => void;
	}

	interface IRGB {
		r: number,
		g: number,
		b: number,
		t: number
	}
}