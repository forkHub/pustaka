class Pattern {
	private _char: string = '';
	private _ctr: number = 0;
	private _idx: number = 0;
	public get idx(): number {
		return this._idx;
	}
	public set idx(value: number) {
		this._idx = value;
	}

	public get char(): string {
		return this._char;
	}
	public set char(value: string) {
		this._char = value;
		if (!this._char) throw new Error();
	}
	public get ctr(): number {
		return this._ctr;
	}
	public set ctr(value: number) {
		this._ctr = value;
	}

	constructor(char: string, startIdx: number) {
		this._char = char;
		this._idx = startIdx;
		this._ctr = 1;
		console.log("new pattern char " + this.charToNumber(this._char) + "/idx " + startIdx);
	}

	charToNumber(str: string): string {
		let hasil: string = '';
		for (let i = 0; i < str.length; i++) {
			hasil += "_" + str.charCodeAt(i);
		}

		return hasil;
	}

	onData(data: string, idx: number): boolean {
		// console.log("on data, data: " + this.charToNumber(data) + "/idx " + idx + "/next idx " + this._idx);

		if (data != this._char) {
			return false;
		}

		if (idx < this._idx) return true;
		// if (idx > this._idx) throw Error("message")

		this._ctr++;
		this._idx += this._char.length;
		return true;
	}


	toString(): [string, number] {
		return [this._char, this._ctr];
	}

}

class MPattern {
	private _len: number = 0;
	private static data: string;
	readonly list: Pattern[] = [];

	static readonly list: MPattern[] = [];

	public get len(): number {
		return this._len;
	}
	public set len(value: number) {
		this._len = value;
	}

	static start(data: string): void {
		this.data = data;
		MPattern.reset();

		for (let i = 0; i < data.length; i++) {
			MPattern.list.forEach((item) => {
				item.onData(i);
			})
		}

		MPattern.clean();
		let res = MPattern.collect().sort((a, b): number => {
			return b[1] - a[1];
		}).slice(0, 100);
		console.log(res);

		let ctr = 0;
		res.forEach((item) => {
			ctr += item[1];
		});
		console.log((ctr * 2) + "/" + data.length);
		console.log(((ctr * 2) / data.length) * 100);
	}

	private static reset() {
		while (MPattern.list.length > 0) MPattern.list.pop();

		// for (let i = 2; i <= 2; i++) {
		MPattern.list.push(new MPattern(2));
		// }
	}

	static clean() {
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
			item.debug().forEach((item2) => {
				res.push(item2)
			})
		})

		return res;
	}

	constructor(len: number) {
		this.len = len;
	}

	onData(idx: number): void {
		let data = MPattern.data.slice(idx, idx + this._len);
		if (data.length < this._len) return;

		let ada = false;
		this.list.forEach((item) => {
			ada = ada || item.onData(data, idx);
		})

		if (!ada) {
			this.list.push(new Pattern(data, idx + this._len));
		}
	}

	clean(): void {
		for (let i = this.list.length - 1; i >= 0; i--) {
			if (this.list[i].ctr <= 1) {
				this.list.splice(i, 1);
			}
		}
	}

	debug(): Array<[string, number]> {
		let res: Array<[string, number]> = [];

		this.list.forEach((item) => {
			res.push(item.toString())
		})
		return res;
	}
}

const fileInput = document.createElement('input');
fileInput.type = 'file';
document.body.appendChild(fileInput);
MPattern.start("aaaa");

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
