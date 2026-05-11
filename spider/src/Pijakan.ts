import { geom, type Pos } from "./geom";

interface Gerakan {
	update:()=> void;
}

class PijakanData {
	protected _x: number = 0;
	protected _y: number = 0;
	protected _radiusLengan = 10;
	protected _target: Pos = { x: 0, y: 0 };
	protected _vel: number = 5;

	public get x_1(): number {
		return this._x;
	}
	public set x_1(value: number) {
		this._x = value;
	}
	public get y(): number {
		return this._y;
	}
	public set y(value: number) {
		this._y = value;
	}
	public get radiusLengan() {
		return this._radiusLengan;
	}
	public set radiusLengan(value) {
		this._radiusLengan = value;
	}
	public get target(): Pos {
		return this._target;
	}
	public set target(value: Pos) {
		this._target = value;
	}
	public get vel(): number {
		return this._vel;
	}
	public set vel(value: number) {
		this._vel = value;
	}

}

class GerakanLurus extends PijakanData implements Gerakan {
	update() {
		if (Math.hypot(this._target.x - this._x, this.target.y - this._y) < this._vel) return;

		let sudut = geom.sudutNormal(this._target.x - this._x, this._target.y - this._y);

		//gerak sudut
		this._x += Math.cos(sudut * geom.deg2rad) * this._vel;
		this._y += Math.sin(sudut * geom.deg2rad) * this._vel;
	}
}

export class Pijakan extends PijakanData{
	private updater:Gerakan | undefined;
	private ty:number=0;

	constructor(x: number, y: number, ty:number) {
		super();
		this._x = x;
		this._y = y;

		this.ty == ty;
		if (ty == 0) {
			this.updater = new GerakanLurus();
		}
		else {
			console.error("error type");
		}
	}

	update() {
		this.updater?.update();
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this._x, this._y, this._radiusLengan, 0, Math.PI * 2);
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