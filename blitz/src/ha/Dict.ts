namespace Dict {
	export function create(): DictObj {
		let d = new DictObj();
		return d;
	}

	export function setAttr(d: DictObj, key: string, value: any): void {
		for (let i: number = 0; i < d.attrs.length; i++) {
			if (d.attrs[i].key == key) {
				d.attrs[i].value = value;
				return;
			}
		}

		d.attrs.push(new Attr(key, value));
	}

	export function value(d: DictObj, key: string) {
		for (let i = 0; i < d.attrs.length; i++) {
			if (d.attrs[i].key == key) {
				return d.attrs[i].value;
			}
		}

		return null;
	}

	class DictObj {
		readonly attrs: Attr[] = [];
	}

	class Attr {
		private _key: string = '';
		private _value: any;

		public get key(): string {
			return this._key;
		}
		public get value(): any {
			return this._value;
		}
		public set value(value: any) {
			this._value = value;
		}

		constructor(key: string, value: any) {
			this._key = key;
			this._value = value;
		}

	}
}
