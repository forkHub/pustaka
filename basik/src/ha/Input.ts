

namespace Basik {
	namespace input {
		export class EventHandler {

			move(input: IInput, buffer: HTMLCanvasElement, e: MouseEvent): void {
				let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
				input.x = pos.x;
				input.y = pos.y;
				input.key = e.button;

				if (input.isDown) {
					input.isDrag = true;
					input.xDrag = input.x - input.xStart;
					input.yDrag = input.y - input.yStart;
				}

				try {
					(window as any).MouseMoveEvent();
				}
				catch (e) { e; }
			}

			down(input: IInput, key: number, pos: IV2D): void {
				input.xStart = pos.x
				input.yStart = pos.y;
				input.xDrag = 0;
				input.yDrag = 0;
				input.x = pos.x;
				input.y = pos.y;
				input.isDown = true;
				input.isTap = false;
				input.isDrag = false;
				input.key = key;
				input.timerStart = Date.now();

				try {
					(window as any).MouseDownEvent(key);
				}
				catch (e) { e; }
			}

			up(input: IInput, key: number): void {
				input.isDown = false;
				input.isDrag = false;
				input.timerEnd = Date.now();
				input.key = key;

				let isTap = this.checkTap(input);
				input.isTap = (isTap == '');

				if (input.isTap) {
					try {
						(window as any).MouseClickEvent(input.key);
					}
					catch (e) { e; }
				}

				try {
					(window as any).MouseUpEvent(input.key);
				}
				catch (e) { e; }
			}

			//check tap
			private checkTap(input: IInput): string {
				if (Math.abs(input.xDrag) > 5) return "drag x " + input.xDrag;
				if (Math.abs(input.yDrag) > 5) return "drag y " + input.xDrag;

				let timer = input.timerEnd - input.timerStart;
				if ((timer) > 500) return "timer " + timer;

				return '';
			}

		}
	}

	export class Input {
		private static _debug: boolean = false;

		public static get debug(): boolean {
			return Input._debug;
		}
		public static set debug(value: boolean) {
			Input._debug = value;
		}

		private static _obj: IInput;
		private static _evt: input.EventHandler = new input.EventHandler();

		constructor() {
		}

		static init(buffer: HTMLCanvasElement): void {
			console.log('Input init');

			Input._obj = this.buatInputDefault();

			buffer.style.touchAction = 'none';

			buffer.addEventListener(
				"mousedown",
				(e: MouseEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
					let key: number = e.button;

					Input.event.down(Input._obj, key, pos);
					sprInt.inputDown(pos, e.button);
				});

			buffer.addEventListener(
				"mousemove",
				(e: MouseEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
					Input.event.move(this.obj, buffer, e);
					sprInt.inputMove(pos, e.button);
				});

			buffer.addEventListener(
				"mouseout",
				(e: MouseEvent) => {
					e.stopPropagation();
					e.preventDefault();

					Input.event.up(Input.obj, e.button);
					Ip.daftar.forEach((img: ImgObj) => {
						img.down = false;
						img.dragged = false;
					});
					//gak ada event handler
				});

			buffer.addEventListener(
				"mouseup",
				(e: MouseEvent) => {
					e.stopPropagation();
					e.preventDefault();

					Input.event.up(this.obj, e.button);
					Ip.daftar.forEach((img: ImgObj) => {
						img.down = false;
						img.dragged = false;
					});


				})
		}

		private static buatInputDefault(): IInput {
			return {
				isDown: false,
				isDrag: false,
				// isHit: false,
				isTap: false,
				key: 0,
				timerEnd: 0,
				timerStart: 0,
				// type: EInput.DEF,
				x: 0,
				xDrag: 0,
				xStart: 0,
				y: 0,
				yDrag: 0,
				yStart: 0,
			}
		}

		static getPos = (cx: number, cy: number, c: HTMLCanvasElement) => {
			let r: DOMRect = c.getBoundingClientRect();

			let cSclX = parseInt(window.getComputedStyle(c).width) / c.width;
			let cSclY = parseInt(window.getComputedStyle(c).height) / c.height;

			let poslx: number = Math.floor((cx - r.x) / cSclX);
			let posly: number = Math.floor((cy - r.y) / cSclY);

			return {
				x: poslx,
				y: posly
			}
		}

		public static get event(): input.EventHandler {
			return Input._evt;
		}

		public static get obj(): IInput {
			return Input._obj;
		}

	}
	export const In = Input;
}