namespace Drag {
	export interface IHandler {

	}

	export class Handler {
		private _el: HTMLElement;
		private _isDown: boolean;
		private _in: boolean;
		private _startX: number;
		private _startY: number;

		constructor(el: HTMLElement) {
			this._el = el;
			this.init();
		}

		private init() {
			this._el.addEventListener("mouseenter", this.enter.bind(this));
			this._el.addEventListener("mouseleave", this.leave.bind(this));
			this._el.addEventListener("mousedown", this.down.bind(this));
			this._el.addEventListener("mouseup", this.down.bind(this));
		}

		up(e: Event) {
			if (e.currentTarget != this._el) return;
			this._isDown = false;
		}

		enter(e: Event) {
			if (e.currentTarget != this._el) return;
			this._in = true;
			this.el.style.outline = "1px solid blue";
		}

		leave(e: Event) {
			if (e.currentTarget != this._el) return;
			this._in = false;
			this.el.style.outline = "none";
		}

		down(e: Event) {
			if (e.currentTarget != this._el) return;
			this._isDown = true;
			this._startX = (e as MouseEvent).clientX;
			this._startY = (e as MouseEvent).clientY;
		}

		public get startY(): number {
			return this._startY;
		}
		public set startY(value: number) {
			this._startY = value;
		}

		public get startX(): number {
			return this._startX;
		}
		public set startX(value: number) {
			this._startX = value;
		}

		public get in(): boolean {
			return this._in;
		}
		public set in(value: boolean) {
			this._in = value;
		}
		public get isDown(): boolean {
			return this._isDown;
		}
		public set isDown(value: boolean) {
			this._isDown = value;
		}

		public get el(): HTMLElement {
			return this._el;
		}
		public set el(value: HTMLElement) {
			this._el = value;
		}
	}
}