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

		export class InpuObj implements IInput {
			id: string = '';
			pointerType: string = '';
			xStart: number = 0;
			yStart: number = 0;
			xDrag: number = 0;
			yDrag: number = 0;
			moveX: number = 0;
			moveY: number = 0;
			x: number = 0;
			y: number = 0;
			private _isDrag: boolean = false;
			isDown: boolean = false;
			isTap: boolean = false;
			evt: PointerEvent = null;
			button: number = -1;
			timerStart: number = 0;
			timerEnd: number = 0;
			pointerId: number = 0;

			public get isDrag(): boolean {
				return this._isDrag;
			}
			public set isDrag(value: boolean) {
				this._isDrag = value;
			}
		}
	}

	export class Input {
		private static _debug: boolean = false;
		private static readonly lst: IInput[] = [];
		private static _pointerEvent: PointerEvent;
		private static _keyboardEvent: KeyboardEvent;
		private static _lastButton: number;

		public static get lastButton(): number {
			return Input._lastButton;
		}

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
		static readonly global: IInput = new input.InpuObj()
		// {
		// 	id: '',
		// 	pointerType: "",
		// 	xStart: 0,
		// 	yStart: 0,
		// 	xDrag: 0,
		// 	yDrag: 0,
		// 	x: 0,
		// 	y: 0,
		// 	isDrag: false,
		// 	isDown: false,
		// 	isTap: false,
		// 	evt: undefined,
		// 	button: 0,
		// 	timerStart: 0,
		// 	timerEnd: 0,
		// 	pointerId: 0,
		// 	moveX: 0,
		// 	moveY: 0
		// }

		public static get debug(): boolean {
			return Input._debug;
		}
		public static set debug(value: boolean) {
			Input._debug = value;
		}

		private static evt: input.EventHandler = new input.EventHandler();

		constructor() {
		}

		static getMouse(): IInput {
			for (let i = 0; i < Input.lst.length; i++) {
				let inp = Input.lst[i];
				if (inp.pointerType == 'mouse') {
					return inp;
				}
			}

			return null;
		}

		// static getByDraggedStatus(btn: number): IInput {
		// 	for (let i = 0; i < Input.lst.length; i++) {
		// 		let inp = Input.lst[i];
		// 		if (inp.isDrag && (inp.pointerType == 'mouse') && inp.button == btn) {
		// 			return inp;
		// 		}
		// 		if (inp.isDrag && (inp.pointerType == 'touch')) {
		// 			return inp;
		// 		}
		// 	}

		// 	return null;
		// }

		static getDraggedInput(): IInput {
			for (let i = 0; i < Input.lst.length; i++) {
				let inp = Input.lst[i];
				if (inp.isDrag) return inp;
			}

			return null;
		}

		static getDownInput(): IInput {
			for (let i = 0; i < Input.lst.length; i++) {
				let inp = Input.lst[i];
				if (inp.isDown) return inp;
			}

			return null;
		}

		// static getByButton(btn?: number): IInput {
		// 	for (let i = 0; i < Input.lst.length; i++) {
		// 		let inp = Input.lst[i];
		// 		if (inp.pointerType == 'mouse') {
		// 			if (inp.button == btn) {
		// 				return inp;
		// 			}
		// 		}
		// 	}

		// 	// if (Input.global.pointerType == 'touch') return Input.global;

		// 	return null;
		// }

		static getById(id: string): IInput {
			for (let i = 0; i < Input.lst.length; i++) {
				let inp = Input.lst[i];
				if (inp.id == id) {
					return inp;
				}
			}

			return null;
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
					let downState = inp.isDown
					Input.evt.down(inp, pos);
					Input.evt.down(Input.global, pos);
					Input._pointerEvent = e;
					Input._lastButton = e.button;

					if (downState == false) {
						console.log("dispatch mouse down event, id " + inp.id);
						Event.dispatchEvent(Evt.MOUSE_DOWN);
					}
<<<<<<< HEAD

=======
>>>>>>> 70ef678fc3cf1a0ccbe3807682164c47d40614ec
				});

			buffer.addEventListener(
				"pointermove",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					move(Input.global);

					//each input
					Input.lst.forEach((input) => {
						move(input);
					});

					function move(input: IInput) {
						Input.evt.move(input, buffer, e);
						Input._pointerEvent = e;

						if (input.isDown) {
							if (!input.isDrag) {
								console.log("dispatch mouse drag, id " + input.id);
								input.isDrag = true;
								input.xStart = input.x;
								input.yStart = input.y;

								if (input != Input.global) {
									Event.dispatchEvent(Evt.MOUSE_START_DRAG);
								}
							}

							input.xDrag = input.x - input.xStart;
							input.yDrag = input.y - input.yStart;
						}
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
					this._lastButton = e.button;
					pointerUp(e);
				})

			function pointerUp(e: PointerEvent): void {
				e.stopPropagation();
				e.preventDefault();

				console.group("pointer up " + Input.getId(e));

				let input = Input.getInput(e);
				Input.evt.up(input);
				Input.evt.up(Input.global);
				Input._pointerEvent = e;
				// Input.global.id = Input.getId(e);
				// Input.global.pointerType = e.pointerType;

				let isTap = Input.checkTap(input);
				input.isTap = (isTap == '');

				if (input.isTap) {
					Event.dispatchEvent(Evt.MOUSE_CLICK);
				}

				//clear up all input status
				Input.lst.forEach((item) => {
					if (item.isDrag) {
						console.log("dispatch mouse drag end id " + input.id);
						Event.dispatchEvent(Evt.MOUSE_END_DRAG);
					}
					Input.evt.up(item);
				})

				Event.dispatchEvent(Evt.MOUSE_UP);
				console.groupEnd();
			}
		}

		private static reg(e: PointerEvent): IInput {
			console.log("reg input type " + e.pointerType + "/button " + e.button + "/id " + e.pointerId);
			let inp: IInput = new input.InpuObj()
			inp.id = Input.getId(e);
			inp.pointerType = e.pointerType;
			inp.isDown = false;
			inp.isDrag = false;
			inp.isTap = false;
			inp.button = e.button;
			inp.timerEnd = 0;
			inp.timerStart = 0;
			inp.x = 0;
			inp.xDrag = 0;
			inp.xStart = 0;
			inp.y = 0;
			inp.yDrag = 0;
			inp.yStart = 0;
			inp.evt = null;
			inp.pointerId = e.pointerId;
			inp.moveX = 0;
			inp.moveY = 0;

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