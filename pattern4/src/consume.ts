class Pattern {
	private _char: string = '';
	private data: string = '';
	private _ctr: number = 0;

	public get char(): string {
		return this._char;
	}
	public set char(value: string) {
		this._char = value;
		// console.log("set char " + this._char);
		if (!this._char) throw new Error();
	}
	public get ctr(): number {
		return this._ctr;
	}
	public set ctr(value: number) {
		this._ctr = value;
	}

	constructor(char: string) {
		this._char = char;
	}

	collect(): [string, number] {
		return [this._char, this._ctr];
	}

	validate(str: string): void {
		let jml = this.jml(str);
		if (jml != this._ctr) {
			console.log("jml " + jml + "/this.ctr: " + this._ctr);
			throw Error("invalid");
		}
	}

	jml(str: string, idx: number = 0): number {
		let idx2 = str.indexOf(this._char, idx);
		if (idx2 < 0) {
			return 0;
		}

		return this.jml(str, idx2 + this.char.length) + 1;
	}

	poll(char: string): void {
		// console.group("poll " + char);
		this.data += char;
		// console.log(this.data);

		if (this.data.length == this._char.length) {
			if (this.data == this._char) {
				this._ctr++;
				this.data = "";
			}
			else {
				this.data = this.data.slice(1);
			}
		}
		else if (this.data.length > this._char.length) {
			console.log(this.data);
			console.log(this._char.length);
			throw Error("");
		}
		else {
			//data tidak cukup
		}

		// console.log(this.data);
		// console.groupEnd();
	}
}

class MPattern {
	private _len: number = 0;
	private data: string = '';
	readonly list: Pattern[] = [];

	static readonly list: MPattern[] = [];

	public get len(): number {
		return this._len;
	}
	public set len(value: number) {
		this._len = value;
	}

	private static validate(str: string): void {
		MPattern.list.forEach((item) => {
			item.validate(str);
		})
	}

	static start(data: string): void {
		let data2: string = data;
		MPattern.reset();
		while (data.length > 0) {
			let char = data.charAt(0)
			data = data.slice(1);
			let time = Date.now();
			MPattern.poll(char);
			console.log(data.length + "/" + (Date.now() - time));
		}
		MPattern.clean();
		console.log(MPattern.collect());
		MPattern.validate(data2);
	}

	private static poll(char: string) {
		MPattern.list.forEach((item) => {
			item.poll(char);
		})
	}

	private static reset() {
		while (MPattern.list.length > 0) MPattern.list.pop();

		for (let i = 1; i <= 2; i++) {
			MPattern.list.push(new MPattern(i));
		}
	}

	private static clean() {
		for (let i = MPattern.list.length - 1; i >= 0; i--) {
			MPattern.list[i].clean();
			if (MPattern.list[i].list.length == 0) {
				MPattern.list.splice(i, 1);
			}
		}
	}

	private static collect(): Array<[string, number]> {
		let res: Array<[string, number]> = [];

		MPattern.list.forEach((item) => {
			item.collect().forEach((item2) => {
				res.push(item2)
			})
		})

		return res;
	}

	validate(str: string): void {
		this.list.forEach((item) => {
			item.validate(str);
		})
	}

	constructor(len: number) {
		this.len = len;
	}

	// static getMPattern(len: number): MPattern {
	// 	let res: MPattern;

	// 	this.list.forEach((item) => {
	// 		if (item.len == len) {
	// 			res = item;
	// 		}
	// 	})

	// 	return res;
	// }

	// static checkSebelum(char: string): boolean {
	// 	let mPattern = this.getMPattern(char.length - 1);
	// 	if (!mPattern) return false;
	// 	let char2 = char.slice(0, char.length - 1);

	// 	return (mPattern.checkAda(char2));
	// }

	checkAda(char: string): boolean {
		let res: boolean = false;

		this.list.forEach((item) => {
			if (item.char == char) res = true;
		})

		return res;
	}

	poll(charP: string) {
		if (charP.length > 1) throw Error('');
		// console.log("charP: " + charP + "/data: " + this.data);
		
		this.list.forEach((item) => {
			item.poll(charP);
		})

		this.data += charP;

		if (this.data.length == this._len) {
			if (this.checkAda(this.data)) {
				//sudah ada
				this.data = this.data.slice(1);
			}
			else {
				//belum data, simpan baru
				let p = new Pattern(this.data);
				p.char = this.data;
				p.ctr = 1;
				this.list.push(p);
				this.data = "";
				// console.log("pattern baru", p, p.char);
			}
		}
		else if (this.data.length < this._len) {
			//belum selesai
		}
		else {
			console.log("data.l: " + this.data.length)
			console.log("this.l: " + this._len);
			throw Error("")
		}
	}

	clean(): void {
		for (let i = this.list.length - 1; i >= 0; i--) {
			if (this.list[i].ctr <= 1) {
				this.list.splice(i, 1);
			}
		}
	}

	collect(): Array<[string, number]> {
		let res: Array<[string, number]> = [];

		this.list.forEach((item) => {
			res.push(item.collect())
		})
		return res;
	}
}

const fileInput = document.createElement('input');
fileInput.type = 'file';
document.body.appendChild(fileInput);

fileInput.addEventListener('change', function () {
	const file = fileInput.files[0];
	if (!file) {
		console.log("no file selected");
		// output.textContent = 'No file selected.';
		return;
	}

	const reader = new FileReader();

	reader.onload = function (e) {
		let str = e.target.result.toString();
		console.log("start");
		MPattern.start(str);
		// check().then(() => {
		// 	console.log("end");
		// })
		// output.textContent = e.target.result;
	};

	reader.onerror = function () {
		console.log("error reading file");
		// output.textContent = 'Error reading file.';
	};

	reader.readAsText(file); // You can change this to readAsDataURL or readAsArrayBuffer
});

// MPattern.reset();

// while (data.length > 0) {
// 	let char = data.charAt(0)
// 	data = data.slice(1);
// 	MPattern.poll(char);
// }
// MPattern.clean();
// console.log(MPattern.list);
// console.log("selesai")
