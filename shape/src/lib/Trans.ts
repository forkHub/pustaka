///<reference path="./Point.ts"/>
namespace shape {
	export class Trans {
		readonly pos: Point = new Point();
		readonly scale: Point = new Point(1, 1);
		readonly center: Point = new Point();
		private _rot: number = 0;

		mergeWith(target: Trans): Trans {
			let t: Trans = this.clone();

			t.pos.move(target.pos);
			t.scale.scale(target.scale);
			t.rot += target.rot;

			return t;
		}

		clone(): Trans {
			let t: Trans = new Trans();

			t.pos.copyFrom(this.pos);
			t.scale.copyFrom(this.scale);
			t.center.copyFrom(this.center);
			t.rot = this.rot;

			return t;
		}

		public get rot(): number {
			return this._rot;
		}
		public set rot(value: number) {
			this._rot = value;
		}
	}

}