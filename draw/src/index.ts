class Pena {
	private _x = 0;
	public get x() {
		return this._x;
	}
	public set x(value) {
		this._x = value;
	}
	private _y = 0;
	public get y() {
		return this._y;
	}
	public set y(value) {
		this._y = value;
	}
}
enum GambarTypeEnum {
	mulai,
	garis,
	kurvaStart,
	kurvaEnd,
}

class GambarData {
	private _type: GambarTypeEnum = GambarTypeEnum.mulai;
	public get type(): GambarTypeEnum {
		return this._type;
	}
	public set type(value: GambarTypeEnum) {
		this._type = value;
	}
	private x: number = 0;
	private y: number = 0;
}

let pena: Pena = new Pena();
let data: GambarData[] = [new GambarData()];

function render() {
	data.forEach((item) => {

	})
}


function inputEvent() {
	window.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.key == "arrowLeft") {
			pena.x--;
		}
		render();
		console.log("key down " + e.key);
	})
}

window.onload = () => {
	let canvas = window.document.createElement('canvas');
	let ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	inputEvent();
}