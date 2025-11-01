namespace Basik {
	namespace keyb {
		export class KeybObj {
			key: string = '';
			isDown: boolean = false;

			constructor(key: string, isDown: boolean) {
				this.key = key;
				this.isDown = isDown;
			}
		}
	}

	export class Keyboard {

		private static readonly list: keyb.KeybObj[] = [];
		private static anyKey: keyb.KeybObj = new keyb.KeybObj('', false);
		private static _lastKey: string = '';
		public static get lastKey(): string {
			return Keyboard._lastKey;
		}

		private static _obj: KeyboardEvent;
		public static get obj(): KeyboardEvent {
			return Keyboard._obj;
		}

		private static getByKey(key: string): keyb.KeybObj {
			for (let i = 0; i < Keyboard.list.length; i++) {
				if (Keyboard.list[i].key == key) return Keyboard.list[i];
			}

			return Keyboard.reg(key, false);
		}

		private static reg(key: string, isDown: boolean): keyb.KeybObj {
			console.log('new key registered: ' + key);
			let k = new keyb.KeybObj(key, isDown);
			Keyboard.list.push(k);
			return k;
		}

		private static setDown(key: string, downState: boolean): keyb.KeybObj {
			let lst = Keyboard.list;

			for (let i = 0; i < lst.length; i++) {
				let o = lst[i];
				if (o.key == key) {
					o.isDown = downState;
					return o
				}
			}

			return Keyboard.reg(key, downState);
		}

		public static IsDown(key: string = ''): boolean {
			let lst = Keyboard.list;

			for (let i = 0; i < lst.length; i++) {
				let o = lst[i];
				if (o.key == key) {
					return o.isDown;
				}
			}

			this.reg(key, false)
			return false;
		}

		public static init() {
			window.addEventListener("keydown", (e: KeyboardEvent) => {
				Keyboard.anyKey.isDown = true;
				Keyboard._lastKey = e.key;
				Keyboard._obj = e;
				let k = Keyboard.getByKey(e.key);
				if (k.isDown == false) {
					Keyboard.setDown(e.key, true);
					Keyboard.setDown('', true);
					Event.dispatchEvent(Evt.KEYB_DOWN);
				}
			})

			window.addEventListener("keyup", (e: KeyboardEvent) => {
				Keyboard.anyKey.isDown = false;
				Keyboard._lastKey = e.key;
				Keyboard._obj = e;
				Keyboard.setDown(e.key, false);
				Keyboard.setDown('', false);
				Event.dispatchEvent(Evt.KEYB_UP);
			})
		}
	}
}