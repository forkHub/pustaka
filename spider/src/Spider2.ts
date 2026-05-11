import type { Pos } from "./geom";
import { Pijakan } from "./Pijakan";

class SpiderData {
	protected _x: number = 0;
	protected _y: number = 0;
	protected pijakan: Pijakan[] = [];
	protected pijakanIdx: number = 0;
	protected radius: number = 30;
	protected _ctr: number = 10;
	protected target: Pos = { x: 0, y: 0 }
	protected min: Pos = { x: 0, y: 0 }
	protected max: Pos = { x: 0, y: 0 }
	protected avg: Pos = { x: 0, y: 0 }
	protected aktif: boolean = false;

	public get ctr(): number {
		return this._ctr;
	}
	public set ctr(value: number) {
		this._ctr = value;
	}

	public get x(): number {
		return this._x;
	}
	public set x(value: number) {
		this._x = value;
	}
	public get y(): number {
		return this._y;
	}
	public set y(value: number) {
		this._y = value;
	}
}

export class Spider extends SpiderData {

	constructor(x: number, y: number, ty:number=0) {
		super();
		this._x = x;
		this._y = y;

		this.pijakan.push(new Pijakan(x - 50, y - 50, ty));
		this.pijakan.push(new Pijakan(x + 50, y + 50, ty));
		this.pijakan.push(new Pijakan(x + 50, y - 50, ty));
		this.pijakan.push(new Pijakan(x - 50, y + 50, ty));

		this.setPijakanTarget(0, this.target);
	}

	normalPos() {
		this.pijakan[0].setPos(this._x - 50, this._y - 50);
		this.pijakan[1].setPos(this._x + 50, this._y + 50);
		this.pijakan[2].setPos(this._x + 50, this._y - 50);
		this.pijakan[3].setPos(this._x - 50, this._y + 50);
	}

	render(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.arc(this._x, this._y, this.radius, 0, Math.PI * 2);
		ctx.stroke();

		this.pijakan.forEach((item) => {

			ctx.beginPath();
			ctx.moveTo(this._x, this._y);
			ctx.lineTo(item.x, item.y);
			ctx.stroke();

			item.render(ctx);
		})
	}

	setMinMax(): void {
		this.pijakan.forEach((item, idx) => {
			if (idx === 0) {
				this.min.x = item.x;
				this.min.y = item.y;
				this.max.x = item.x;
				this.max.y = item.y;
			}
			else {
				if (item.x < this.min.x) {
					this.min.x = item.x;
				}

				if (item.x > this.max.x) {
					this.max.x = item.x;
				}

				if (item.y < this.min.y) {
					this.min.y = item.y;
				}

				if (item.y > this.max.y) {
					this.max.y = item.y;
				}
			}
		})
	}

	setAvg() {
		this.setMinMax();
		this.avg.x = (this.max.x + this.min.x) / 2;
		this.avg.y = (this.max.y + this.min.y) / 2;
	}

	setPijakanTarget(idx: number, p: Pos) {
		let pj = this.pijakan[idx];

		if (idx == 0) {
			pj.setTarget(p.x - 50, p.y - 50);
		}
		else if (idx == 1) {
			pj.setTarget(p.x + 50, p.y + 50);
		}
		else if (idx == 2) {
			pj.setTarget(p.x + 50, p.y - 50);
		}
		else if (idx == 3) {
			pj.setTarget(p.x - 50, p.y + 50);
		}
	}

	setTarget(x: number, y: number) {
		this.target.x = x;
		this.target.y = y;
		this.aktif = true;
		this.setPijakanTarget(0, this.target);
		this.ctr = 10;
		this.pijakanIdx = 0;
		this.normalPos();
	}

	update() {
		if (!this.aktif) return;

		//update badan;
		this.setAvg();
		this._x = this.avg.x;
		this._y = this.avg.y;

		if (this.ctr > 0) {
			this.ctr--;
		}
		else {
			this.ctr = 10;
			this.pijakanIdx++;

			if (this.pijakanIdx > 3) {
				this.pijakanIdx = 0;
			}

			this.setPijakanTarget(this.pijakanIdx, this.target);

			// console.log('ganti pijakan' + this.pijakanIdx);
		}

		this.pijakan.forEach((item, idx) => {
			if (this.pijakanIdx === idx) {
				item.update();
			}
		})


	}



}