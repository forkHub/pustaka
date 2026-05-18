class Camera {
	private _x: number = 0;
	public get x(): number {
		return this._x;
	}
	public set x(value: number) {
		this._x = value;
	}
	private _y: number = 0;
	public get y(): number {
		return this._y;
	}
	public set y(value: number) {
		this._y = value;
	}
	private isDrag: boolean = false;
	private startX: number = 0;
	private startY: number = 0;

	mouseDown() {
		this.startX = this.x;
		this.startY = this.y;
		this.isDrag = true;
	}

	mouseMove() {
		if (this.isDrag) {
			this.x = this.startX - mouseDragX();
			this.y = this.startY - mouseDragY();
			console.log(mouseDragX());
		}
	}

	mouseUp() {
		this.isDrag = false;
	}

}

export const camera = new Camera();