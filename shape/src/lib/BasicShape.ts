///<reference path="./Trans.ts"/>
namespace shape {

	/**
	 * Empty shape
	 */
	export class BasicShape {
		static readonly shapes: BasicShape[] = [];

		readonly vs: TPoint[] = [];
		readonly trans: Trans = new Trans();
		protected readonly childs: BasicShape[] = [];

		protected _parent: BasicShape | null = null;
		protected _w: number = 0;
		protected _h: number = 0;
		private _debug: boolean = false;

		protected readonly lastPos: Point = new Point();

		protected get parent(): BasicShape | null {
			return this._parent;
		}
		protected set parent(value: BasicShape | null) {
			this._parent = value;
		}

		public get w(): number {
			return this._w;
		}
		public set w(value: number) {
			this._w = value;
		}
		public get h(): number {
			return this._h;
		}
		public set h(value: number) {
			this._h = value;
		}

		protected get debug(): boolean {
			return this._debug;
		}
		protected set debug(value: boolean) {
			this._debug = value;
		}

		constructor(w: number = 10, h: number = 10) {
			this._w = w;
			this._h = h;
			BasicShape.shapes.push(this);
		}

		public drawPoints(ctx: CanvasRenderingContext2D) {
			this.vs.forEach((item) => {
				// ctx.beginPath();
				ctx.strokeRect(item.globalPos.x, item.globalPos.y, 4, 4);
				// ctx.stroke();
			});

			this.childs.forEach((item) => {
				item.drawPoints(ctx);
			})
		}

		protected _addShape(c: BasicShape): BasicShape {
			this.childs.push(c);
			return this;
		}

		/**
		 * 
		 * @param pt parent transform info
		 */
		_update(pt: Trans, parentPos: Point) {
			pt = pt ? pt : new Trans();
			// console.groupCollapsed("update");

			//merge trans from parent to local
			let mTrans: Trans = this.trans.mergeWith(pt);
			let firstPoint: TPoint | null;

			// console.log("this", this);
			// console.log("this trans", this.trans.clone());
			// console.log("merged trans ", mTrans.clone());

			this.vs.forEach((item: TPoint, idx: number) => {

				// console.group("update item");
				// console.log("idx", idx, "item", item.globalPos.clone());

				//reset position
				item.globalPos.position(item.localPos);

				if (idx == 0) {
					// console.group("first point");
					// console.log("initial", item.globalPos.clone().obj);

					firstPoint = item;
					let pos = this.trans.pos.clone();
					// console.log("trans pos", pos.clone().obj);
					pos.scale(pt.scale);
					// console.log("trans pos scaled", pos.clone().obj);

					//update origin position relative to parent trans
					item.globalPos.position(parentPos);
					// console.log("parent pos", item.globalPos.clone().obj);

					item.globalPos.move(pos);
					// console.log("move ", item.globalPos.clone().obj);

					//scale
					// item.global.scale(mTrans.scale);
					// console.log("scale ", item.global.clone().obj);
					// console.log("trans scale ", pt.scale.clone().obj);

					//update rot
					item.globalPos.rotateRel(parentPos, pt.rot);
					item.globalPos.position(Point.result);

					// console.log("rotate ", item.globalPos.clone().obj);
					// console.log("parent rotation ", pt.rot);
					// console.groupEnd();

				} else {
					// console.log("next point");
					// console.log("initial ", item.globalPos.clone());
					let p: TPoint = this.vs[0];

					//position
					let pos = item.globalPos;

					pos.scale(mTrans.scale);
					// console.log("scaled ", item.globalPos.clone());

					pos.move(p.globalPos);

					// console.log("move ", item.globalPos.clone());

					//scale
					//item.globalPos.scale(mTrans.scale);
					//console.log("scale ", item.globalPos.clone());

					//rotation
					item.globalPos.rotateRel(p.globalPos, mTrans.rot);
					item.globalPos.position(Point.result);
				}

				// console.log("item after trans", item.globalPos.clone());
				// console.groupEnd();

				//children
			})

			//update child
			this.childs.forEach((item) => {
				item._update(mTrans, firstPoint ? firstPoint.globalPos : new Point());
			})

			// console.groupEnd();
		}

		render(ctx: CanvasRenderingContext2D, debug: boolean = false) {
			// this.update();
			// ctx;
			this.childs.forEach((item) => {
				item.render(ctx, debug);
			})
		}

		protected _position(p: Point): BasicShape {
			this.trans.pos.copyFrom(p);
			return this;
		}

		protected _scale(p: Point): BasicShape {
			this.trans.scale.copyFrom(p);
			return this;
		}

		protected _rotation(n: number): BasicShape {
			this.trans.rot = n;
			return this;
		}
	}

} 