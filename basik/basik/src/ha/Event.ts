namespace Basik {
	export enum Evt {
		MOUSE_DOWN = "mouseDitekan",
		MOUSE_UP = "mouseDilepas",
		MOUSE_MOVE = "mouseGerak",
		MOUSE_CLICK = "mouseKlik",
		MOUSE_START_DRAG = "mouseMulaiDrag",	//demo belum ada
		MOUSE_END_DRAG = "mouseSelesaiDrag",	//demo belum ada

		KEYB_DOWN = "keyboardDitekan",
		KEYB_UP = "keyboardDilepas",

		// SOUND_LOADED = "Sound",
		SOUND_ENDED = "suaraSelesai",

		UPDATE = "update",
		MULAI = "mulai",
		GAMBAR_DILOAD = "gambarDiload",
		RESIZE = "resize"
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

		static addEventListener(type: string, f: () => void): Event {
			let e = new Event(type.toLowerCase(), f);
			Event.list.push(e);
			console.log("add listener: type ", type);
			// console.log(f);
			return e;
		}

		static removeListener(e: Event): void {
			for (let i = Event.list.length - 1; i >= 0; i--) {
				if (Event.list[i] === e) {
					Event.list.splice(i, 1);
					return;
				}
			}
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