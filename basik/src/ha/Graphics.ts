namespace Basik {

	export class Graphic {
		private static _autoScale: boolean = true;
		private static drawCanvas: HTMLCanvasElement;
		private static mainCanvas: HTMLCanvasElement;	//original canvas should never change

		private static _red: number = 0;
		private static _green: number = 0;
		private static _blue: number = 0;
		private static _transparan: number = 0;

		private static handleWindowResize(): void {
			if (!G._autoScale) return;
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

		static MainCanvas(): HTMLCanvasElement {
			return G.mainCanvas;
		}

		static SetCanvas(canvas: HTMLCanvasElement): void {
			G.drawCanvas = canvas;
		}

		private static initComp() {
			In.init(G.drawCanvas);
			Keyboard.init();
			Camera.init();
			sprInt.init();
		}

		static Graphics(w?: number, h?: number, canvas: HTMLCanvasElement = null, mode: number = 1) {
			console.log('init');

			if (!canvas) canvas = G.buildCanvas(w, h);
			G.mainCanvas = canvas;
			G.drawCanvas = canvas;

			G._autoScale = (mode == 1);
			G.setupMainCanvas(w, h, mode);
			G.initComp();

			function update() {
				// let updater = (window as any)["UpdateEvent"];
				// if (typeof updater === "function") {
				// 	updater();
				// }
				Event.dispatchEvent("update");
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

		private static setupMainCanvas(p?: number, l?: number, mode: number = 1): void {
			G.mainCanvas.width = p;
			G.mainCanvas.height = l;

			if (mode == 1) {
				G.mainCanvas.style.width = p + 'px';
				G.mainCanvas.style.padding = '0px';
				G.mainCanvas.style.margin = '0px';
			}

			// if (Graphic.skalaOtomatis) {
			window.addEventListener("resize", (): void => {
				G.handleWindowResize();
			})
		}

		static Cls() {
			let ctx: CanvasRenderingContext2D = G.drawCanvas.getContext('2d');
			ctx.clearRect(0, 0, (G.drawCanvas.width), (G.drawCanvas.height));
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