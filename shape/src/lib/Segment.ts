///<reference path="./shape.ts"/>
namespace shape {

	/**
	 * Segment
	 */
	class Line extends BasicShape {

		constructor(w: number = 10, h: number = 10) {
			super(w, h);
			this.vs.push(new TPoint());
			this.vs.push(new TPoint(w, h));
		}

		position(x: number, y: number): Line {
			this._position(new Point(x, y));
			return this;
		}

		scale(x: number, y: number): Line {
			this._position(new Point(x, y));
			return this;
		}

		rotation(n: number): Line {
			this._rotation(n);
			return this;
		}


		render(ctx: CanvasRenderingContext2D) {
			console.log("render segment")
			// ctx.moveTo(this.vs[0].globalPos.x, this.vs[0].globalPos.y);

			ctx.lineTo(this.vs[1].globalPos.x, this.vs[1].globalPos.y);

			// this.childs.forEach((item) => {
			// 	item.render(ctx);
			// })
		}
	}

	export function segment(w: number = 10, h: number = 10): Line {
		return new Line(w, h);
	}
}