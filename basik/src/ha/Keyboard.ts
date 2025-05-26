namespace Basik {
	export class Keyboard {
		private static _obj: KeyboardEvent;
		public static get obj(): KeyboardEvent {
			return Keyboard._obj;
		}

		public static init() {

			window.addEventListener("keydown", (e: KeyboardEvent) => {
				// try {
				// 	(window as any).KeyDownEvent(e.key);
				// }
				// catch (e) { e; }

				Keyboard._obj = e;
				Event.call("keydown");
			})

			window.addEventListener("keyup", (e: KeyboardEvent) => {
				// try {
				// 	(window as any).KeyUpEvent(e.key);
				// }
				// catch (e) { e; }

				Keyboard._obj = e;
				Event.call("keyup");
			})
		}
	}
}