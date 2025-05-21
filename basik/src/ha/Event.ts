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
		}

		static addListener(type:string, f:() =>void) {
			let e = new Event(type.toLowerCase(), f);
			Event.list.push(e);
			return e;
		}

		static getByType(type: string): Event[] {
			let h: Event[] = [];
			Event.list.forEach((item) => {
				if (item.type === type) {
					h.push(item);
				}
			})
			return h;
		}

	}
}