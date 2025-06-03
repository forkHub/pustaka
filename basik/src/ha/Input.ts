

namespace Basik {

	namespace input {
		export class EventHandler {

			move(input: IInput, buffer: HTMLCanvasElement, e: MouseEvent): void {
				let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
				input.x = pos.x;
				input.y = pos.y;
				input.button = e.button;

				if (input.isDown) {
					input.isDrag = true;
					input.xDrag = input.x - input.xStart;
					input.yDrag = input.y - input.yStart;

					Event.call("mousedrag");
				}

				Event.call("mousemove");
			}

			down(input: IInput, key: number, pos: IV2D): void {
				if (input.isDown == false) {
					Event.call("mousedown");
				}

				input.xStart = pos.x
				input.yStart = pos.y;
				input.xDrag = 0;
				input.yDrag = 0;
				input.x = pos.x;
				input.y = pos.y;
				input.isDown = true;
				input.isTap = false;
				input.isDrag = false;
				input.button = key;
				input.timerStart = Date.now();

			}

			up(input: IInput): void {
				if (input.isDown) {
					Event.call("mouseup");
				}
				input.isDown = false;
				input.isDrag = false;
				input.timerEnd = Date.now();
				// input.button = e.button;
				// input.pointerId = e.pointerId;

				let isTap = this.checkTap(input);
				input.isTap = (isTap == '');

				if (input.isTap) {
					// try {
					// 	(window as any).MouseClickEvent(input.key);
					// }
					// catch (e) { e; }
					Event.call("mouseclick");
				}

				// try {
				// 	(window as any).MouseUpEvent(input.key);
				// }
				// catch (e) { e; }
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
		private static readonly lst: IInput[] = [];

		public static get debug(): boolean {
			return Input._debug;
		}
		public static set debug(value: boolean) {
			Input._debug = value;
		}

		// private static _obj: IInput;
		private static _evt: input.EventHandler = new input.EventHandler();

		constructor() {
		}

		static reg(e: PointerEvent): IInput {
			let inp = Input.buatInput(e);
			Input.lst.push(inp);
			return inp;
		}

		static IsDown(btn: number): boolean {
			let lst = Input.lst;
			for (let i = 0; i < lst.length; i++) {
				let o = lst[i];
				if (o.button == btn) return o.isDown;
			}

			return false;
		}

		static getInput(e: PointerEvent): IInput {
			let lst = Input.lst;

			for (let i = 0; i < lst.length; i++) {
				let o = lst[i];

				if (e.pointerType == 'mouse') {
					if (o.button == e.button) return o;
				} else if (e.pointerType == 'touch') {
					if (o.pointerId == e.pointerId) {
						return o;
					}
				} else {
					console.warn("pointer not supported; " + e.pointerType);
					return null;
				}
			}

			let inp: IInput = this.reg(e);
			return inp;
		}

		//TODO: refaktor input
		static init(buffer: HTMLCanvasElement): void {
			console.log('Input init');

			// Input._obj = this.buatInputDefault();

			buffer.style.touchAction = 'none';

			buffer.addEventListener(
				"pointerdown",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
					let button: number = e.button;

					Input.event.down(Input.getInput(e), button, pos);
					sprInt.inputDown(pos, e.button);
				});

			buffer.addEventListener(
				"pointermove",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);

					// Input._obj.evt = e;
					Input.event.move(this.getInput(e), buffer, e);
					sprInt.inputMove(pos, e.button);
				});

			buffer.addEventListener(
				"pointerout",
				(e: PointerEvent) => {
					pointerUp(e);
				});

			buffer.addEventListener(
				"pointerup",
				(e: PointerEvent) => {
					pointerUp(e);
				})

			function pointerUp(e: PointerEvent): void {
				e.stopPropagation();
				e.preventDefault();
				Input.event.up(Input.getInput(e));
				Ip.daftar.forEach((img: Image) => {
					img.down = false;
					img.dragged = false;
				});
			}
		}

		private static buatInput(e: PointerEvent): IInput {
			return {
				pointerType: e.pointerType,
				isDown: false,
				isDrag: false,
				isTap: false,
				button: e.button,
				timerEnd: 0,
				timerStart: 0,
				x: 0,
				xDrag: 0,
				xStart: 0,
				y: 0,
				yDrag: 0,
				yStart: 0,
				evt: null,
				pointerId: e.button
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

		// public static get obj(): IInput {
		// 	return Input._obj;
		// }

	}
	export const In = Input;
}