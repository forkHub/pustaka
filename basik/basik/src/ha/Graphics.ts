namespace Basik {

	export class Graphic {
		private static _autoScale: boolean = true;
		private static drawCanvas: HTMLCanvasElement;
		private static _lastX: number = 0;
		private static _isUpdating: boolean = false;
		public static get isUpdating(): boolean {
			return Graphic._isUpdating;
		}
		public static set isUpdating(value: boolean) {
			Graphic._isUpdating = value;
		}

		public static get lastX(): number {
			return Graphic._lastX;
		}
		public static set lastX(value: number) {
			Graphic._lastX = value;
		}
		private static _lastY: number = 0;
		public static get lastY(): number {
			return Graphic._lastY;
		}
		public static set lastY(value: number) {
			Graphic._lastY = value;
		}
		// private static mainCanvas: HTMLCanvasElement;	//original canvas should never change

		private static _red: number = 0;
		private static _green: number = 0;
		private static _blue: number = 0;
		private static _transparan: number = 0;

		private static handleWindowResize(): void {
			if (!G._autoScale) return;
			if (G.callFunc("resize")) return;

			let canvas: HTMLCanvasElement = G.drawCanvas;

			let cp = G.drawCanvas.width;
			let cl = G.drawCanvas.height;

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
		}

		private static buildCanvas(w?: number, h?: number): HTMLCanvasElement {
			let canvas: HTMLCanvasElement;

			canvas = document.body.querySelector('canvas') as HTMLCanvasElement;

			if (!canvas) {
				canvas = document.createElement('canvas') as HTMLCanvasElement;
				document.body.appendChild(canvas);
				if (w) canvas.width = w;
				if (h) canvas.height = h;
			}

			return canvas;
		}

		static Canvas(): HTMLCanvasElement {
			return G.drawCanvas;
		}

		static SetCanvas(canvas: HTMLCanvasElement): void {
			G.drawCanvas = canvas;
		}

		static Start(canvas: HTMLCanvasElement): void {
			G.Graphics(0, 0, canvas, 0);
		}

		static Graphics(w?: number, h?: number, canvas: HTMLCanvasElement = null, mode: number = 1) {
			console.log('init');

			if (!canvas) canvas = G.buildCanvas(w, h);
			// G.mainCanvas = canvas;
			G.drawCanvas = canvas;

			G._autoScale = (mode == 1);
			G.setupMainCanvas(w, h, mode);
			// G.initComp();
			In.init(G.drawCanvas);
			Keyboard.init();
			// Camera.init();
			sprInt.init();
			G.initEvent();

			function update() {
				try {
					G._isUpdating = true;
					Event.dispatchEvent(Evt.UPDATE);
					window.requestAnimationFrame(update);
					G._isUpdating = false;
				}
				catch (e) {
					console.error(e);
					//TODO: error on update
				}
			}
			window.requestAnimationFrame(update);

			setTimeout(() => {
				G.handleWindowResize();
			}, 100);
			G.handleWindowResize();

			// NoStroke();
			bersihkanLayar();
			warnaGaris(0, 0, 0, 0);
			posisiTeks(0, 10);
			ukuranTeks(10);
		}

		static Cls(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
			let ctx: CanvasRenderingContext2D = G.drawCanvas.getContext('2d');
			w = w || G.drawCanvas.width;
			h = h || G.drawCanvas.height;
			ctx.clearRect(x, y, w, h);
		}

		// private static initComp() {
		// 	In.init(G.drawCanvas);
		// 	Keyboard.init();
		// 	// Camera.init();
		// 	sprInt.init();
		// }

		private static callFunc(str: string): boolean {
			try {
				let w = window as any;
				if (w[str] && (typeof w[str] == 'function')) {
					w[str]();
					return true;
				}
				return false;
			} catch (e) {
				return false;
			}
		}

		private static initEvent() {
			Event.addEventListener(Evt.KEYB_DOWN, () => {
				G.callFunc(Evt.KEYB_DOWN);
			});

			Event.addEventListener(Evt.KEYB_UP, () => {
				G.callFunc(Evt.KEYB_UP);
			});

			Event.addEventListener(Evt.MOUSE_DOWN, () => {
				G.callFunc(Evt.MOUSE_DOWN);
			});
			Event.addEventListener(Evt.MOUSE_END_DRAG, () => {
				G.callFunc(Evt.MOUSE_END_DRAG);
			});
			Event.addEventListener(Evt.MOUSE_MOVE, () => {
				G.callFunc(Evt.MOUSE_MOVE);
			});
			Event.addEventListener(Evt.MOUSE_START_DRAG, () => {
				G.callFunc(Evt.MOUSE_START_DRAG);
			});
			Event.addEventListener(Evt.MOUSE_CLICK, () => {
				G.callFunc(Evt.MOUSE_CLICK);
			});
			Event.addEventListener(Evt.MOUSE_UP, () => {
				G.callFunc(Evt.MOUSE_UP);
			});
			Event.addEventListener(Evt.UPDATE, () => {
				G.callFunc(Evt.UPDATE);
			})
			Event.addEventListener(Evt.SOUND_ENDED, () => {
				G.callFunc(Evt.SOUND_ENDED);
			})
			Event.addEventListener(Evt.GAMBAR_DILOAD, () => {
				//gambar pending 
				Ip.daftar.forEach((gbr) => {
					if (gbr.pendingStempel) {
						gbr.pendingStempel = false;
						Ip.Draw(gbr);
					}
				})
			});
		}

		private static setupMainCanvas(p?: number, l?: number, mode: number = 1): void {
			if (p) G.drawCanvas.width = p;
			if (l) G.drawCanvas.height = l;

			if (mode == 1) {
				G.drawCanvas.style.width = p + 'px';
				G.drawCanvas.style.padding = '0px';
				G.drawCanvas.style.margin = '0px';
				window.addEventListener("resize", (): void => {
					G.handleWindowResize();
				})
			}
		}

		public static get red(): number {
			return G._red;
		}

		public static set red(value: number) {
			G._red = value;
		}

		public static get green(): number {
			return G._green;
		}

		public static set green(value: number) {
			G._green = value;
		}

		public static get blue(): number {
			return G._blue;
		}

		public static set blue(value: number) {
			G._blue = value;
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