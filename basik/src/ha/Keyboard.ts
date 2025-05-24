namespace Basik {
	export class Keyboard {
		private static _key: string;

		public static get key(): string {
			return Keyboard._key;
		}
		public static set key(value: string) {
			Keyboard._key = value;
		}

		public static init() {

			window.addEventListener("keydown", (e: KeyboardEvent) => {
				// try {
				// 	(window as any).KeyDownEvent(e.key);
				// }
				// catch (e) { e; }

				Keyboard.key = e.key;
				Event.call("keydown");
			})

			window.addEventListener("keyup", (e: KeyboardEvent) => {
				// try {
				// 	(window as any).KeyUpEvent(e.key);
				// }
				// catch (e) { e; }

				Keyboard.key = e.key;
				Event.call("keyup");
			})
		}
	}
}