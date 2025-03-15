///<reference path="./Trans.ts"/>
namespace shape {

	export class Drawing extends BasicShape {
		private readonly root: Group = new Group();
		private readonly ctx: CanvasRenderingContext2D | null;

		constructor(canvas: HTMLCanvasElement) {
			super(0, 0);
			this.ctx = canvas.getContext('2d');
		}

		addShape(s: Shape): Drawing {
			this._addShape(s);
			return this;
		}

		addGroup(s: Group): Drawing {
			this._addShape(s);
			return this;
		}

		update(): void {
			this._update(new Trans(), new Point());
		}
	}

	/**
	 * grouping
	 */
	export class Group extends BasicShape {

		constructor() {
			super(0, 0);
			this.vs.push(new TPoint());
		}

		position(x: number, y: number): Group {
			this._position(new Point(x, y));
			return this;
		}

		scale(x: number, y: number): Group {
			this._position(new Point(x, y));
			return this;
		}

		rotation(n: number): Group {
			this._rotation(n);
			return this;
		}


		addShape(s: Shape): Group {
			this._addShape(s);
			return this;
		}

		addGroup(s: Group): Group {
			this._addShape(s);
			return this;
		}


	}

	export class Shape extends BasicShape {
		constructor() {
			super(0, 0);
			this.vs.push(new TPoint());
		}

		position(x: number, y: number): Shape {
			this._position(new Point(x, y));
			return this;
		}

		scale(x: number, y: number): Shape {
			this._position(new Point(x, y));
			return this;
		}

		rotation(n: number): Shape {
			this._rotation(n);
			return this;
		}

		line(w: number, h: number): Shape {
			this._addShape(segment(w, h).position(this.lastPos.x, this.lastPos.y));
			this.lastPos.x += w;
			this.lastPos.y += h;
			return this;
		}

		curve(w: number, h: number, flip: boolean = false): Shape {
			this._addShape(new Curve(w, h, flip).position(this.lastPos.x, this.lastPos.y));
			this.lastPos.x += w;
			this.lastPos.y += h;
			return this;
		}

		render(ctx: CanvasRenderingContext2D) {
			//TODO: move to first child position;

			// console.log("begin path");
			this.childs.forEach((item, idx) => {
				if (idx == 0) {
					ctx.beginPath();
					ctx.moveTo(item.vs[0].globalPos.x, item.vs[0].globalPos.y);
					// ctx.moveTo(0, 0);
				}
				item.render(ctx);
			})
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			// this.render()
		}

	}


	var _root: Group = new Group();

	// export function update() {
	// 	_root._update(new Trans(), new Point());
	// }

	// export function render(ctx: CanvasRenderingContext2D) {
	// 	_root._render(ctx);
	// }

	// export function addShape(s: Shape): Group {
	// 	return _root.addShape(s);
	// }

	// export function addGroup(s: Group): Group {
	// 	return _root.addGroup(s);
	// }

} 