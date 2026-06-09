namespace Basik {

	export class Graphic {
		private static _autoScale: boolean = true;
		private static _drawCanvas: HTMLCanvasElement;
		public static get drawCanvas(): HTMLCanvasElement {
			return Graphic._drawCanvas;
		}
		public static set drawCanvas(value: HTMLCanvasElement) {
			Graphic._drawCanvas = value;
		}
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

		private static _merah: number = 0;
		private static _green: number = 0;
		private static _blue: number = 0;
		private static _transparan: number = 0;

		private static handleWindowResize(): void {
			if (!G._autoScale) return;
			if (G.callFunc("resize")) return;

			let canvas: HTMLCanvasElement = G._drawCanvas;

			let cp = G._drawCanvas.width;
			let cl = G._drawCanvas.height;

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

		static Kanvas(): HTMLCanvasElement {
			if (!G._drawCanvas) {
				G.Graphics();
			}
			return G._drawCanvas;
		}

		static Kontek(): CanvasRenderingContext2D {
			return Graphic.Kanvas().getContext('2d')
		}

		static SetCanvas(canvas: HTMLCanvasElement): void {
			G._drawCanvas = canvas;
		}

		static Graphics(w?: number, h?: number, canvas: HTMLCanvasElement = null, mode: number = 1) {
			console.groupCollapsed("init");

			if (!canvas) canvas = G.buildCanvas(w, h);
			G._drawCanvas = canvas;

			G._autoScale = (mode == 1);
			G.setupMainCanvas(w, h, mode);

			In.init(G._drawCanvas);

			// Keyboard.init();
			// Warna.init();
			// sprInt.init();
			// G.initEvent();

			function update() {
				try {
					G._isUpdating = true;
					Event.dispatchEvent(Evt.UPDATE);
					Event.dispatchEvent(Evt.RENDER);
					window.requestAnimationFrame(update);
					G._isUpdating = false;
				}
				catch (e) {
					console.error(e);
					console.log(e);
					console.warn(e);
					console.log("error !!!");
				}
			}
			window.requestAnimationFrame(update);

			setTimeout(() => {
				G.handleWindowResize();
			}, 100);
			G.handleWindowResize();

			bersihkanLayar();
			warnaGaris(120);
			warna(215);
			posisiTeks(20, 20);
			ukuranTeks(20);
			tebalGaris(1);
			G.Kanvas().getContext('2d').lineWidth = 1;
			console.groupEnd();
		}

		static Cls(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
			let ctx: CanvasRenderingContext2D = G._drawCanvas.getContext('2d');
			w = w || G._drawCanvas.width;
			h = h || G._drawCanvas.height;
			ctx.clearRect(x, y, w, h);
		}

		private static callFunc(str: string): boolean {
			try {
				let w = window as any;
				if (w[str] && (typeof w[str] == 'function')) {
					w[str]();
					return true;
				}
				return false;
			} catch (e) {
				dialog(`Ada kesalahan di fungsi ${str}. Silahkan check codenya.<hr/>${(e as any).message}<hr/>${(e as any).stack}`);
				throw (e);
			}
		}

		static initEvent() {
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
			Event.addEventListener(Evt.MOUSE_TAP, () => {
				G.callFunc(Evt.MOUSE_TAP);
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
				Ip.daftar.forEach((gbr) => {
					if (gbr.pendingStempel) {
						gbr.pendingStempel = false;
						Ip.Draw(gbr);
					}
				})
			});

			Event.addEventListener(Evt.RENDER, () => {
				if (G.callFunc(Evt.RENDER)) {

				}
				else {
					//auto render bila belum ada render
					bersihkanLayar();
					Ip.daftar.forEach((gbr) => {
						stempel(gbr);
					})
				}
			})
		}

		private static setupMainCanvas(p?: number, l?: number, mode: number = 1): void {
			if (p) G._drawCanvas.width = p;
			if (l) G._drawCanvas.height = l;

			if (mode == 1) {
				G._drawCanvas.style.width = p + 'px';
				G._drawCanvas.style.padding = '0px';
				G._drawCanvas.style.margin = '0px';
				window.addEventListener("resize", (): void => {
					G.handleWindowResize();
				})
			}
		}

		public static alert(msg: string): void {
			let overlay = document.getElementById("customAlertOverlay");
			if (!overlay) {
				overlay = document.createElement("div");
				overlay.id = "customAlertOverlay";
				overlay.className = "custom-alert-overlay";

				const box = document.createElement("div");
				box.className = "custom-alert-box";

				const msg = document.createElement("div");
				msg.id = "customAlertMessage";

				const btn = document.createElement("button");
				btn.textContent = "OK";
				btn.onclick = () => {
					overlay.style.display = "none";
				};

				box.appendChild(msg);
				box.appendChild(btn);
				overlay.appendChild(box);
				document.body.appendChild(overlay);
			}

			document.getElementById("customAlertMessage").innerHTML = msg;
			overlay.style.display = "flex";
		}

		public static get merah(): number {
			return G._merah;
		}

		public static set merah(value: number) {
			G._merah = value;
		}

		public static get hijau(): number {
			return G._green;
		}

		public static set hijau(value: number) {
			G._green = value;
		}

		public static get biru(): number {
			return G._blue;
		}

		public static set biru(value: number) {
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