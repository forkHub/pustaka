namespace Basik {

	export class Graphic {
		private static _autoScale: boolean = true;
		private static canvas: HTMLCanvasElement;
		private static mainCanvas: HTMLCanvasElement;

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
			let canvas: HTMLCanvasElement = G.canvas;

			let cp = G.canvas.width;
			let cl = G.canvas.height;

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

		private static buildCanvas(w: number, h: number): HTMLCanvasElement {
			let canvas: HTMLCanvasElement;

			canvas = document.body.querySelector('canvas') as HTMLCanvasElement;

			if (!canvas) {
				canvas = document.createElement('canvas') as HTMLCanvasElement;
				document.body.appendChild(canvas);
				canvas.width = w;
				canvas.height = h;
			}
			return canvas;
		}

		static Canvas(): HTMLCanvasElement {
			return G.canvas;
		}

		static MainCanvas(): HTMLCanvasElement {
			return G.mainCanvas;
		}

		static SetCanvas(canvas: HTMLCanvasElement): void {
			G.mainCanvas = canvas;
		}

		static Graphics(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true) {

			if (!canvas) canvas = G.buildCanvas(w, h);

			G.mainCanvas = canvas;
			G.canvas = canvas;

			G.autoScale = fullScreen;

			console.log('inisialisasi');

			G.setupMainCanvas(w, h, G.autoScale);

			In.init(G.canvas);

			// if (Graphic.skalaOtomatis) {
			window.addEventListener("resize", (): void => {
				G.handleWindowResize();
			})

			function update() {
				// let updater = (window as any)["UpdateEvent"];
				// if (typeof updater === "function") {
				// 	updater();
				// }
				Event.call("update");
				window.requestAnimationFrame(update);
			}
			window.requestAnimationFrame(update);

			setTimeout(() => {
				G.handleWindowResize();
			}, 100);
			G.handleWindowResize();

			// NoStroke();
			Cls();
		}

		private static setupMainCanvas(p: number = 320, l: number = 240, fullScreen: boolean): void {
			G.mainCanvas.width = p;
			G.mainCanvas.height = l;

			if (fullScreen) {
				G.mainCanvas.style.width = p + 'px';
				G.mainCanvas.style.padding = '0px';
				G.mainCanvas.style.margin = '0px';
			}
		}

		static Cls() {
			let ctx: CanvasRenderingContext2D = G.canvas.getContext('2d');
			ctx.clearRect(0, 0, (G.canvas.width), (G.canvas.height));
		}

		public static get red(): number {
			return G._merah;
		}

		public static set red(value: number) {
			G._merah = value;
		}

		public static get green(): number {
			return G._hijau;
		}

		public static set green(value: number) {
			G._hijau = value;
		}

		public static get blue(): number {
			return G._biru;
		}

		public static set blue(value: number) {
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