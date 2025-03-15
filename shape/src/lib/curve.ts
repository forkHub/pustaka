///<reference path="./shape.ts"/>
namespace shape {

	/**
	 * Curve
	 */
	export class Curve extends BasicShape {

		constructor(w: number = 8, h: number = 8, flip: boolean = false) {
			super(w, h);
			console.log("curve constructor " + flip);
			if (flip) {
				this.vs.push(new TPoint());
				this.vs.push(new TPoint(0, h / 2));
				this.vs.push(new TPoint(w / 2, h));
				this.vs.push(new TPoint(w, h));
			}
			else {
				this.vs.push(new TPoint());
				this.vs.push(new TPoint(w / 2, 0));
				this.vs.push(new TPoint(w, h / 2));
				this.vs.push(new TPoint(w, h));
			}
		}

		position(x: number, y: number): Curve {
			this._position(new Point(x, y));
			return this;
		}

		scale(x: number, y: number): Curve {
			this._position(new Point(x, y));
			return this;
		}

		rotation(n: number): Curve {
			this._rotation(n);
			return this;
		}


		render(ctx: CanvasRenderingContext2D) {
			// console.log("curve render");
			// ctx.moveTo(this.vs[0].globalPos.x, this.vs[0].globalPos.y);
			ctx.bezierCurveTo(
				this.vs[1].globalPos.x, this.vs[1].globalPos.y,
				this.vs[2].globalPos.x, this.vs[2].globalPos.y,
				this.vs[3].globalPos.x, this.vs[3].globalPos.y,
			);
		}
	}
}