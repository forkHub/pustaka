namespace Basik {

	namespace input {
		export class EventHandler {

			move(input: IInput, buffer: HTMLCanvasElement, e: PointerEvent): void {
				let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
				input.x = pos.x;
				input.y = pos.y;
				input.moveX = e.movementX;
				input.moveY = e.movementY;
			}

			down(input: IInput, pos: IV2D): void {

				input.xStart = pos.x
				input.yStart = pos.y;
				input.xDrag = 0;
				input.yDrag = 0;
				input.x = pos.x;
				input.y = pos.y;
				input.isDown = true;
				input.isTap = false;
				input.isDrag = false;
				input.timerStart = Date.now();

			}

			up(input: IInput): void {
				input.isDown = false;
				input.isDrag = false;
				input.timerEnd = Date.now();

			}


		}
	}

	export class Input {
		private static _debug: boolean = false;
		private static readonly lst: IInput[] = [];
		private static _pointerEvent: PointerEvent;
		private static _keyboardEvent: KeyboardEvent;

		public static get keyboardEvent(): KeyboardEvent {
			return Input._keyboardEvent;
		}
		public static set keyboardEvent(value: KeyboardEvent) {
			Input._keyboardEvent = value;
		}
		public static get pointerEvent(): PointerEvent {
			return Input._pointerEvent;
		}

		//for touch event that is not consistent and does not have button
		static readonly global: IInput = {
			id: '',
			pointerType: "",
			xStart: 0,
			yStart: 0,
			xDrag: 0,
			yDrag: 0,
			x: 0,
			y: 0,
			isDrag: false,
			isDown: false,
			isTap: false,
			evt: undefined,
			button: 0,
			timerStart: 0,
			timerEnd: 0,
			pointerId: 0,
			moveX: 0,
			moveY: 0
		}

		public static get debug(): boolean {
			return Input._debug;
		}
		public static set debug(value: boolean) {
			Input._debug = value;
		}

		private static evt: input.EventHandler = new input.EventHandler();

		constructor() {
		}

		static getByButton(btn?: number): IInput {
			for (let i = 0; i < Input.lst.length; i++) {
				let inp = Input.lst[i];
				if (inp.pointerType == 'mouse') {
					if (inp.button == btn) {
						return inp;
					}
				}
			}

			return Input.global;
		}

		private static getId(e: PointerEvent): string {
			return e.pointerType == "mouse" ? e.pointerType + e.button : e.pointerType + e.pointerId;
		}

		private static getInput(e: PointerEvent): IInput {
			let lst = Input.lst;
			let id = Input.getId(e);

			for (let i = 0; i < lst.length; i++) {
				let o = lst[i];

				if (o.id == id) {
					return o;
				}
			}

			return this.reg(e);
		}

		//check tap
		private static checkTap(input: IInput): string {
			if (Math.abs(input.xDrag) > 5) return "drag x " + input.xDrag;
			if (Math.abs(input.yDrag) > 5) return "drag y " + input.xDrag;

			let timer = input.timerEnd - input.timerStart;
			if ((timer) > 500) return "timer " + timer;

			return '';
		}


		static init(buffer: HTMLCanvasElement): void {
			console.log('Input init');

			buffer.style.touchAction = 'none';

			buffer.addEventListener(
				"pointerdown",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);

					let inp = Input.getInput(e)
					Input.evt.down(inp, pos);
					Input.evt.down(Input.global, pos);
					Input.global.id = Input.getId(e);

					Input._pointerEvent = e;
					if (inp.isDown == false) {
						Event.dispatchEvent(Evt.MOUSE_DOWN);
					}

				});

			buffer.addEventListener(
				"pointermove",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					// let pos: any = Input.getPos(e.clientX, e.clientY, buffer);

					let input = this.getInput(e);
					Input.evt.move(this.getInput(e), buffer, e);
					Input.evt.move(Input.global, buffer, e);
					Input._pointerEvent = e;
					Input.global.id = Input.getId(e);

					if (input.isDown) {
						if (!input.isDrag) {
							Event.dispatchEvent(Evt.MOUSE_START_DRAG);
						}

						input.isDrag = true;
						input.xDrag = input.x - input.xStart;
						input.yDrag = input.y - input.yStart;
					}

					Event.dispatchEvent(Evt.MOUSE_MOVE);
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


				let input = Input.getInput(e);
				if (input.isDrag == false) {
					Event.dispatchEvent(Evt.MOUSE_END_DRAG);
				}

				Input.evt.up(input);
				Input.evt.up(Input.global);
				Input._pointerEvent = e;
				Input.global.id = Input.getId(e);

				let isTap = Input.checkTap(input);
				input.isTap = (isTap == '');

				if (input.isTap) {
					Event.dispatchEvent(Evt.MOUSE_TAP);
				}

				Event.dispatchEvent(Evt.MOUSE_UP);
			}
		}

		private static reg(e: PointerEvent): IInput {
			console.log("reg input type " + e.pointerType + "/button " + e.button + "/id " + e.pointerId);
			let inp: IInput = {
				id: Input.getId(e),
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
				pointerId: e.pointerId,
				moveX: 0,
				moveY: 0
			}

			Input.lst.push(inp);
			return inp;
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
	}

	export const In = Input;
}