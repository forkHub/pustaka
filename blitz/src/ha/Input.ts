//TODO: depecreated
enum EInput {
	TOUCH = 'touch',
	MOUSE = 'mouse',
	KEYB = 'keyb',
	DEF = ''
}

namespace Basik {
	class EventHandler {

		move(input: IInput, buffer: HTMLCanvasElement, e: PointerEvent): void {
			let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
			input.x = pos.x;
			input.y = pos.y;
			input.id = e.pointerId;

			if (input.isDown) {

				if (input.isDrag == false) {
					input.dragJml++;
				}

				input.isDrag = true;
				input.xDrag = input.x - input.xStart;
				input.yDrag = input.y - input.yStart;
			}


		}

		down(input: IInput, key: string, type: EInput, pos: IV2D): void {

			if (!input.isDown) {
				input.hitJml++;
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
			input.key = key;
			input.type = type;
			input.timerStart = Date.now();
		}

		up(input: IInput): void {

			if (input.isDrag) {
				input.dragSelesaiJml++;
			}

			input.isDown = false;
			input.isDrag = false;
			input.timerEnd = Date.now();

			let isTap = this.checkTap(input);
			input.isTap = (isTap == '');

			if (input.isTap) {
				if (Input.debug) {
					console.debug('tap ok');
				}
				input.tapJml++;
			}
			else {
				input.upJml++;
				if (Input.debug) {
					console.debug('tap failed');
					console.debug(isTap);
				}
			}
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

	export class Input {

		private static _inputs: IInput[] = [];	//any input, todo: clean up
		private static _debug: boolean = false;

		public static get debug(): boolean {
			return Input._debug;
		}
		public static set debug(value: boolean) {
			Input._debug = value;
		}

		private static _inputGlobal: IInput;	//global input

		private static _evt: EventHandler = new EventHandler();

		constructor() {
		}

		/**
		 * berapa kali tap terjadi sejak pemanggilan terakhir kali
		 * @returns (number)
		 */
		static InputTapCount(): number {
			let tap = Input.global.tapJml;
			// Input.global.tapJml = 0;
			return tap;
		}

		/**
		 * berapa kali pointer diangkat  sejak pemanggilan terakhir kali
		 * @returns (number)
		 */
		static JmlUp(): number {
			let up = Input.global.upJml;
			// Input.global.tapJml = 0;
			return up;
		}

		/**
		 * berapa jumlah drag selesai sejak pemanggilan terakhir kali
		 * @returns 
		 */
		static InputDragEndCount(): number {
			let s = Input.global.dragSelesaiJml;
			// Input.global.dragSelesaiJml = 0;
			return s;
		}

		/**
		 * (depecreated) type input dari event terkhir
		 * @returns (EInput) 
		 */
		static InputType(): EInput {
			return Input.global.type;
		}

		/**
		 * berapa kali pointer di tekan sejak terakhir kali perintah dipanggil
		 * @returns (number)
		 */
		static InputHit(): number {
			let hit: number = Input.global.hitJml;
			// Input.global.hitJml = 0;

			return hit;
		}

		/**
		 * posisi x awal drag
		 * @returns (number)
		 * 
		 * */
		static InputDragStartX(): number {
			return Input.global.xStart;
		}

		/**
		 * posisi y awal drag
		 * @returns (number)
		 */
		static InputDragStartY(): number {
			return Input.global.yStart;
		}

		/**
		 * posisi x pointer
		 * @returns (number)
		 */
		static InputX(): number {
			return Input.global.x;
		}

		/**
		 * posisi y pointer
		 * @returns 
		 */
		static InputY(): number {
			return Input.global.y;
		}

		/**
		 * berapa jauh pointer digeser sejajar sumbu x
		 * @returns (number)
		 */
		static InputDragX(): number {
			return Input.global.xDrag
		}

		/**
		 * berapa jauh pointer di drag sejajar sumbu y
		 * @returns (number)
		 */
		static InputDragY(): number {
			return Input.global.yDrag
		}

		/**
		 * menghapus data input
		 */
		static FlushInput(): void {
			Input.flush();
		}

		/**
		 * berapa kali drag dimulai sejak pemanggilan terakhir
		 * 
		 */
		static InputDragStartCount(): number {
			let hasil = Input.global.dragJml;
			// Input.global.dragJml = 0;

			return hasil;
		}

		/**
		 * mengecek apakah pointer sedang ditekan
		 * @returns (boolean) 
		 */
		static InputIsDown(): boolean {
			return Input.global.isDown;
		}

		/**
		 * mengecheck apakah pointer sedang di drag
		 * @returns (boolean)
		 */
		static InputIsDragged(): boolean {
			return Input.global.isDrag;
		}

		private static getMouseKeyId(e: PointerEvent): string {
			if (e.pointerType == 'touch') {
				return e.pointerId + '';
			}
			else if (e.pointerType == 'mouse') {
				return e.button + '';
			}

			throw Error('');
		}

		static init(buffer: HTMLCanvasElement): void {
			console.log('input init');

			Input._inputGlobal = this.buatInputDefault();

			buffer.style.touchAction = 'none';

			buffer.addEventListener(
				"pointerdown",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
					let key: string = Input.getMouseKeyId(e);
					let input: IInput = Input.baru(key, e.pointerType as EInput);

					Input.event.down(input, key, e.pointerType as EInput, pos);
					Input.event.down(this._inputGlobal, key, e.pointerType as EInput, pos);

					sprInt.inputDown(pos, e.pointerId);
				});

			buffer.addEventListener(
				"pointermove",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let pos: any = Input.getPos(e.clientX, e.clientY, buffer);
					let key: string = this.getMouseKeyId(e);
					let input: IInput = this.baru(key, e.pointerType as EInput);

					Input.event.move(input, buffer, e);
					Input.event.move(this.global, buffer, e);

					//sprite
					sprInt.inputMove(pos, e.pointerId);
				});

			buffer.addEventListener(
				"pointerout",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();
				});

			buffer.addEventListener(
				"pointercancel",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();
				});

			buffer.addEventListener(
				"pointerup",
				(e: PointerEvent) => {
					e.stopPropagation();
					e.preventDefault();

					let key: string = this.getMouseKeyId(e);
					let input: IInput = this.baru(key, e.pointerType as EInput);

					Input.event.up(input);
					Input.event.up(this.global);

					//sprite up
					//sprite hit
					Ip.daftar.forEach((item: ImgObj) => {
						if (e.pointerId == item.inputId) {
							if (item.down) {
								item.jmlHit++;
							}

							item.down = false;
							item.dragged = false;
						}
					});
				})
		}

		private static buatInputDefault(): IInput {
			return {
				id: 0,
				isDown: false,
				isDrag: false,
				// isHit: false,
				isTap: false,
				key: '',
				timerEnd: 0,
				timerStart: 0,
				type: EInput.DEF,
				x: 0,
				xDrag: 0,
				xStart: 0,
				y: 0,
				yDrag: 0,
				yStart: 0,
				hitJml: 0,
				dragJml: 0,
				dragSelesaiJml: 0,
				tapJml: 0,
				upJml: 0
			}
		}

		static flush(): void {
			while (Input.inputs.length > 0) {
				Input.inputs.pop();
			}
			Input.flushByInput(Input._inputGlobal);
		}

		private static flushByInput(input: IInput): void {
			input.isDown = false;
			input.isDrag = false;
			input.isTap = false;
			input.hitJml = 0;
			input.tapJml = 0;
			input.dragJml = 0;
			input.dragSelesaiJml = 0;
		}

		private static getInput(key: string, inputType: string): IInput {
			let inputHasil: IInput;

			for (let i: number = 0; i < Input.inputs.length; i++) {
				let input: IInput = Input.inputs[i];
				if (input.type == inputType && input.key == key) {
					inputHasil = input;
					return inputHasil;
				}
			}

			return inputHasil;
		}

		private static baru(keyId: string, inputType: EInput): IInput {
			let input: IInput = Input.getInput(keyId, inputType);

			if (!input) {
				input = {
					key: keyId,
					type: inputType,
					isDown: false,
					isDrag: false,
					isTap: false,
					timerEnd: 0,
					timerStart: 0,
					x: 0,
					xDrag: 0,
					xStart: 0,
					y: 0,
					yDrag: 0,
					yStart: 0,
					id: 0,
					hitJml: 0,
					dragJml: 0,
					dragSelesaiJml: 0,
					tapJml: 0,
					upJml: 0
				}

				Input.inputs.push(input);
			}

			return input;
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

		public static get inputs(): IInput[] {
			return Input._inputs;
		}

		public static get event(): EventHandler {
			return Input._evt;
		}

		public static get global(): IInput {
			return Input._inputGlobal;
		}

	}
	export const In = Input;
}


// Input
//======
// KeyDown
// KeyHit
// GetKey
// WaitKey
// FlushKeys

// MoveMouse
// MouseDown
// MouseHit
// GetMouse
// WaitMouse
// MouseX
// MouseY
// MouseZ
// MouseXSpeed
// MouseYSpeed
// MouseZSpeed
// FlushMouse

// JoyType
// JoyDown
// JoyHit
// GetJoy
// WaitJoy
// JoyX
// JoyY
// JoyZ
// JoyU
// JoyV
// JoyXDir
// JoyYDir
// JoyZDir
// JoyUDir
// JoyVDir
// JoyYaw
// JoyPitch
// JoyRoll
// JoyHat
// FlushJoy