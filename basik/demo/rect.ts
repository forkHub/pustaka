window.onload = () => {
	Graphics(640, 480);

	class Rect {
		private _c: Basik.Point = Basik.Point.create();
		private _p: Basik.Point = Basik.Point.create();
		private cImg: Basik.ImageObj = LoadAnimImage("./web/balls.png", 32, 32);
		private pImage: Basik.ImageObj = LoadAnimImage("./web/balls.png", 32, 32);
		private dots: Basik.Point[] = [
			Basik.Point.create(),
			Basik.Point.create(),
			Basik.Point.create(),
			Basik.Point.create(),
		];

		updateData() {
			let radius = this.pImage.x - this._c.x;
			radius; //TODO
			this.dots;
		}

		update() {
			DrawImage(this.cImg);
			DrawImage(this.pImage);
		}

		public get p(): Basik.Point {
			return this._p;
		}
		public get c(): Basik.Point {
			return this._c;
		}
	}

	let r = new Rect();

	function Update() {
		Cls();
		r.update();
		requestAnimationFrame(Update);
	}
	requestAnimationFrame(Update);
}