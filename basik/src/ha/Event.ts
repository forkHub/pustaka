namespace Basik {
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

		static addListener(type: string, f: () => void) {
			let e = new Event(type.toLowerCase(), f);
			Event.list.push(e);
			console.log("add listener: type ", type);
			return e;
		}

		static call(type: string): void {
			// console.log("call event ", type);

			Event.list.forEach((item) => {
				if (item.type === type.toLowerCase()) {
					// console.log("event found ", type);
					item.f();
					return;
				}
			});

			// console.log("event not found, type ", type);
		}


	}
}