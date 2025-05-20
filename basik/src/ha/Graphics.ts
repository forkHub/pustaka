namespace Basik {

	export class Graphic {
		private static _autoScale: boolean = true;
		private static _canvas: HTMLCanvasElement;
		public static get canvas(): HTMLCanvasElement {
			return Graphic._canvas;
		}
		private static _context: CanvasRenderingContext2D;
		public static get context(): CanvasRenderingContext2D {
			return Graphic._context;
		}
		public static set context(value: CanvasRenderingContext2D) {
			Graphic._context = value;
		}

		private static _mainCtx: CanvasRenderingContext2D;
		public static get mainCtx(): CanvasRenderingContext2D {
			return Graphic._mainCtx;
		}

		public static get autoScale(): boolean {
			return G._autoScale;
		}

		public static set autoScale(value: boolean) {
			G._autoScale = value;
		}

		private static _merah: number = 0;
		private static _hijau: number = 0;
		private static _biru: number = 0;
		private static _transparan: number = 0;

		// static Pause() {
		// 	debugger;
		// 	// this.canvasAktif.canvas.getcon
		// }

		static handleWindowResize(): void {
			if (!G._autoScale) return;
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = G._canvas;

			let cp = G._canvas.width;
			let cl = G._canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			canvas.style.position = 'fixed';
			canvas.style.zIndex = '1';
			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}

		private static buildCanvas(w: number, h: number) {
			if (!G._canvas) {
				G._canvas = document.body.querySelector('canvas') as HTMLCanvasElement;
			}

			if (!G._canvas) {
				G._canvas = document.createElement('canvas') as HTMLCanvasElement;
				document.body.appendChild(G._canvas);
				G._canvas.width = w;
				G._canvas.height = h;
			}
		}

		static Graphics(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true) {

			if (canvas) {
				G._canvas = canvas;
			}
			G.buildCanvas(w, h);
			this._mainCtx = G._canvas.getContext("2d");
			this._context = this._mainCtx;

			G.autoScale = fullScreen;

			console.log('inisialisasi');

			G.setupCanvas(w, h, G.autoScale);

			In.init(G._canvas);

			// if (Graphic.skalaOtomatis) {
			window.addEventListener("resize", (): void => {
				G.handleWindowResize();
			})

			function update() {
				let updater = (window as any)["Update"];
				if (typeof updater === "function") {
					updater();
				}
				window.requestAnimationFrame(update);
			}
			window.requestAnimationFrame(update);

			setTimeout(() => {
				G.handleWindowResize();
			}, 100);
			G.handleWindowResize();

			NoStroke();
			Cls();
		}

		private static setupCanvas(p: number = 320, l: number = 240, fullScreen: boolean): void {
			G._canvas.width = p;
			G._canvas.height = l;

			if (fullScreen) {
				G._canvas.style.width = p + 'px';
				G._canvas.style.padding = '0px';
				G._canvas.style.margin = '0px';
			}
		}

		static Cls() {
			let ctx: CanvasRenderingContext2D = G.context;
			ctx.clearRect(0, 0, (G._canvas.width), (G._canvas.height));
		}

		public static get red(): number {
			return G._merah;
		}

		public static set red(value: number) {
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

		public static get alpha(): number {
			return G._transparan;
		}

		public static set alpha(value: number) {
			G._transparan = value;
		}
	}
	export const G = Graphic;
}