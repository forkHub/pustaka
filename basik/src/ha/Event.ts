namespace Basik {
	export enum Evt {
		MOUSE_DOWN = "mousedown",
		MOUSE_UP = "mouseup",
		MOUSE_MOVE = "mousemove",
		MOUSE_TAP = "mousetap",

		MOUSE_START_DRAG = "mousestartdrag",
		MOUSE_END_DRAG = "mouseenddrag",

		KEYB_DOWN = "keybdown",
		KEYB_UP = "keybup",
	}

	export class Event {
		private static readonly list: Event[] = [];

		private _type: string = '';
		private _f: () => void;

		public get type(): string {
			return this._type;
		}
		public get f(): () => void {
			return this._f;
		}

		constructor(type: string, f: () => void) {
			this._type = type;
			this._f = f;

			//todo: filter
		}

		static addEventListener(type: string, f: () => void) {
			let e = new Event(type.toLowerCase(), f);
			Event.list.push(e);
			console.log("add listener: type ", type);
			// console.log(f);
			return e;
		}

		static dispatchEvent(type: string): void {

			Event.list.forEach((item) => {
				if (item.type === type.toLowerCase()) {
					item.f();
				}
			});
		}


	}
}