/**
 * 
 */
namespace basik {

	/**
	 * 
	 */
	export class Data {
		static readonly list: data.Obj[] = [];
		// private static last: data.Obj;

		/**
		 * 
		 * @param name 
		 * @returns 
		 */
		static Create(name: string): data.Obj {
			let obj: data.Obj = new data.Obj();
			obj.nama = name;

			Data.list.forEach((item) => {
				if (item.nama == name) throw Error(`Data with name ${name} already exists`);
			})

			Data.list.push(obj);
			// Data.last = obj;
			return obj;
		}

		/**
		 * 
		 * @param data 
		 * @param item 
		 */
		static Data(data: data.Obj, item: any[]) {
			item.forEach((i) => {
				data.entry.push(i);
			})
		}

		/**
		 * 
		 * @param data 
		 * @returns 
		 */
		static Read(data: data.Obj): any {
			let h = data.entry[data.id]
			data.id++;
			if (data.id >= data.entry.length) {
				data.id = data.entry.length - 1;
			}

			return h;
		}

		/**
		 * 
		 * @param data 
		 */
		static Restore(data: data.Obj) {
			data.id = 0;
		}

		//TODO:
		//before
		//next
	}

}

/**
 * 
 */
namespace basik {

	/**
	 * 
	 */
	export namespace data {

		/**
		 * 
		 */
		export class Obj {
			private _id: number = 0;
			private _entry: any[];
			private _nama: string = '';

			public get id(): number {
				return this._id;
			}
			public set id(value: number) {
				this._id = value;
			}

			public get entry(): any[] {
				return this._entry;
			}
			public set entry(value: any[]) {
				this._entry = value;
			}
			public get nama(): string {
				return this._nama;
			}
			public set nama(value: string) {
				this._nama = value;
			}
		}
	}
}