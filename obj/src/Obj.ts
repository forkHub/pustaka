namespace ha {
	export class Obj {

		static klon() {

		}

		static cariAr(objAr: Array<any>, key: string, res: any[]): void {
			if (Array.isArray(objAr) == false) return;

			objAr.forEach((item) => {
				this.cariKey(item, key, res);
			})
		}

		static cariKey(obj: any, key: string, res: any[]): void {

			if (Array.isArray(obj)) {
				this.cariAr(obj, key, res);
			}

			if (typeof obj != "object") return;

			//cari di property
			Object.keys(obj).forEach((keyItem) => {
				if (keyItem == key) {
					res.push(obj[keyItem]);
				}
				else {
					let objItem: any = obj[keyItem];
					if (Array.isArray(objItem)) {
						this.cariAr(objItem, key, res);
					} else if (typeof objItem === 'string') {
						//nothing
					} else if (typeof objItem === "number") {
						//nothing
					} else if (typeof objItem === "object") {
						Obj.cariKey(objItem, key, res);
					} else if (typeof objItem === "boolean") {
						//skip
					} else if (typeof objItem === "function") {
						//skip
					} else {
						throw Error("type tidak valid, untk key " + key + (typeof objItem));
					}

				}
			})

			// Object.keys(obj).forEach((key) => {
			// })
		}

		static cariFuncAr(objAr: Array<any>, func: (obj: any) => boolean, res: any[]): void {
			if (Array.isArray(objAr) == false) return;

			objAr.forEach((item) => {
				this.cariFunc(item, func, res);
			})
		}

		static cariFunc(obj: any, func: (objP: any) => boolean, res: any[]): void {

			if (Array.isArray(obj)) {
				this.cariFuncAr(obj, func, res);
			}

			if (typeof obj != "object") return;

			if (func(obj)) {
				res.push(obj);
			}

			//cari di property
			Object.keys(obj).forEach((keyItem) => {
				let objItem: any = obj[keyItem];

				if (Array.isArray(objItem)) {
					this.cariFuncAr(objItem, func, res);
				} else if (typeof objItem === 'string') {
					//nothing
				} else if (typeof objItem === "number") {
					//nothing
				} else if (typeof objItem === "object") {
					Obj.cariFunc(objItem, func, res);
				} else if (typeof objItem === "boolean") {
					//skip
				} else if (typeof objItem === "function") {
					//skip
				} else {
					throw Error("type tidak valid," + (typeof objItem));
				}

			})
		}

	}
}