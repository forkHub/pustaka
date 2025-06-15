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

		private static _obj: KeyboardEvent;
		public static get obj(): KeyboardEvent {
			return Keyboard._obj;
		}

		private static reg(key: string, isDown: boolean): void {
			console.log('new key registered: ' + key);
			Keyboard.list.push(new keyb.KeybObj(key, isDown));
		}

		private static setDown(key: string, downState: boolean): void {
			let lst = Keyboard.list;

			for (let i = 0; i < lst.length; i++) {
				let o = lst[i];
				if (o.key == key) {
					o.isDown = downState;
					return;
				}
			}

			Keyboard.reg(key, downState);
		}

		public static IsDown(key: string): boolean {
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
				Keyboard._obj = e;
				Keyboard.setDown(e.key, true);
				Event.dispatchEvent(Evt.KEYB_DOWN);
			})

			window.addEventListener("keyup", (e: KeyboardEvent) => {
				Keyboard._obj = e;
				Keyboard.setDown(e.key, false);
				Event.dispatchEvent(Evt.KEYB_UP);
			})
		}
	}
}