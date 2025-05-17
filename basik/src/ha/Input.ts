

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

				let f = (window as any)["MouseMove"];
				if (typeof f === 'function') f();
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
				// input.type = type;
				input.timerStart = Date.now();

				let f = (window as any)["MouseDown"];
				if (typeof f === 'function') f();
			}

			up(input: IInput): void {
				input.isDown = false;
				input.isDrag = false;
				input.timerEnd = Date.now();

				let isTap = this.checkTap(input);
				input.isTap = (isTap == '');

				if (input.isTap) {
					let f = (window as any)["MouseTap"];
					if (typeof f === 'function') f();
				}

				let f = (window as any)["MouseUp"];
				if (typeof f === 'function') f();
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

					let f = (window as any)["MouseHit"];
					if (typeof f === "function") f();
				});

			buffer.addEventListener(
				"mousemove",
				(e: MouseEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
					Input.event.move(this.obj, buffer, e);

					//sprite
					sprInt.inputMove(pos, e.button);
				});

			buffer.addEventListener(
				"mouseout",
				(e: MouseEvent) => {
					e.stopPropagation();
					e.preventDefault();

					Input.event.up(Input.obj);
					Ip.daftar.forEach((img: ImgObj) => {
						img.down = false;
						img.dragged = false;
					});
				});

			buffer.addEventListener(
				"mouseup",
				(e: MouseEvent) => {
					e.stopPropagation();
					e.preventDefault();
					Input.event.up(this.obj);
					Ip.daftar.forEach((img: ImgObj) => {
						img.down = false;
						img.dragged = false;
					});
				})
		}

		/**
		 * posisi x awal drag
		 * @returns (number)
		 * 
		 * */
		static InputDragStartX(): number {
			return Input.obj.xStart;
		}

		/**
		 * posisi y awal drag
		 * @returns (number)
		 */
		static InputDragStartY(): number {
			return Input.obj.yStart;
		}

		/**
		 * posisi x pointer
		 * @returns (number)
		 */
		static InputX(): number {
			return Input.obj.x;
		}

		/**
		 * posisi y pointer
		 * @returns 
		 */
		static InputY(): number {
			return Input.obj.y;
		}

		/**
		 * berapa jauh pointer digeser sejajar sumbu x
		 * @returns (number)
		 */
		static InputDragX(): number {
			return Input.obj.xDrag
		}

		/**
		 * berapa jauh pointer di drag sejajar sumbu y
		 * @returns (number)
		 */
		static InputDragY(): number {
			return Input.obj.yDrag
		}

		/**
		 * menghapus data input
		 */
		static FlushInput(): void {
			Input.flush();
		}

		/**
		 * mengecek apakah pointer sedang ditekan
		 * @returns (boolean) 
		 */
		static InputIsDown(): boolean {
			return Input.obj.isDown;
		}

		/**
		 * mengecheck apakah pointer sedang di drag
		 * @returns (boolean)
		 */
		static InputIsDragged(): boolean {
			return Input.obj.isDrag;
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

		private static flush(): void {
			// while (Input.inputs.length > 0) {
			// 	Input.inputs.pop();
			// }
			Input.flushByInput(Input._obj);
		}

		private static flushByInput(input: IInput): void {
			input.isDown = false;
			input.isDrag = false;
			input.isTap = false;
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