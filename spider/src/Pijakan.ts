import { geom, type Pos } from "./geom";

export class Pijakan {
	private _x: number = 0;
	private _y: number = 0;
	private radius = 10;
	private _target: Pos = { x: 0, y: 0 };
	private speed: number = 5;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	update() {
		if (Math.hypot(this._target.x - this._x, this.target.y - this._y) < this.speed) return;

		let sudut = geom.sudutNormal(this._target.x - this._x, this._target.y - this._y);
		this._x += Math.cos(sudut * geom.deg2rad) * this.speed;
		this._y += Math.sin(sudut * geom.deg2rad) * this.speed;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this._x, this._y, this.radius, 0, Math.PI * 2);
		ctx.stroke();
	}

	setTarget(x: number, y: number) {
		this._target.x = x;
		this._target.y = y;
	}

	setPos(x: number, y: number) {
		this.x = x;
		this._y = y;
	}

	public get y(): number {
		return this._y;
	}
	public set y(value: number) {
		this._y = value;
	}

	public get x(): number {
		return this._x;
	}
	public set x(value: number) {
		this._x = value;
	}
	public get target(): Pos {
		return this._target;
	}
	public set target(value: Pos) {
		this._target = value;
	}

}