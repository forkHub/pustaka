class Turtle {
	private _velX: number = 10;
	private _velY: number = 10;
	readonly commandStroke: Array<() => void> = [];
	readonly commandStrokeBatch: Array<() => void> = [];
	readonly commandColor: Array<() => void> = [];
	private ctx: CanvasRenderingContext2D;
	private canvas: HTMLCanvasElement;
	private lastX: number = 0;
	private lastY: number = 0;
	private updateColorCtr: number = 0;
	private updateColorCtrMax: number = 0;

	private angle: number = 0;
	private _penDown: boolean = true;
	private resultX: number = 0;
	private resultY: number = 0;

	private readonly DEG2RAD = Math.PI / 180;


	public get velX(): number {
		return this._velX;
	}
	public set velX(value: number) {
		this._velX = value;
	}
	public get velY(): number {
		return this._velY;
	}
	public set velY(value: number) {
		this._velY = value;
	}

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		window.requestAnimationFrame(this.update.bind(this));
		this.reset();
		this.commandStroke.push(() => {
			this.ctx.beginPath();
		})
		this.commandStroke.push(() => {
			this.ctx.moveTo(this.lastX, this.lastY);
		})
	}

	clear(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	fill(clr: string) {
		this.commandStroke.push(() => {
			this.ctx.fillStyle = clr;
		})

		this.commandColor.push(() => {
			this.ctx.fillStyle = clr;
		});
	}

	rotateRelXY(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, deg: number = 0): void {
		let xr: number = x - xt;
		let yr: number = y - yt;
		let x1: number = 0;
		let y1: number = 0;

		deg *= this.DEG2RAD;

		x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
		y1 = xr * Math.sin(deg) + yr * Math.cos(deg);

		this.resultX = x1 + xt;
		this.resultY = y1 + yt;

		this.resultX;
		this.resultY;
	}

	update() {

		let f = this.commandStroke.shift();
		if (f) {
			this.commandStrokeBatch.push(f);
			this.drawStrokeBatch();
			if (this._penDown == true) {
				this.ctx.fill();
				this.ctx.stroke();
			}
		}

		// if (this.commandStroke.length > 0) {
		// 	// this.drawColorBatch();

		// 	let f = this.commandStroke.shift();
		// 	if (f) {
		// 		this.commandStrokeBatch.push(f);
		// 	}
		// 	this.drawStrokeBatch();
		// } else {
		// 	// this.drawColorBatch();
		// }

		window.requestAnimationFrame(this.update.bind(this));
	}

	penDown(): void {
		this.commandStroke.push(() => {
			if (this._penDown == false) {
				this._penDown = true;
				this.ctx.beginPath();
				this.ctx.moveTo(this.lastX, this.lastY);
				// console.log("pen down stroke");
			}
		});

		this.commandColor.push(() => {
			if (this._penDown == false) {
				this._penDown = true;
				this.ctx.beginPath();
				this.ctx.moveTo(this.lastX, this.lastY);
				// console.log("pen down color");
			}
		});
	}

	penUp(): void {
		this.commandStroke.push(() => {
			// console.log("pen up, stroke");
			if (this._penDown) {
				this._penDown = false;
				this.updateColorCtrMax++;
				this.ctx.stroke();
				this.ctx.fill();
				// console.group("pen up stroke 2");
			}
		});

		this.commandColor.push(() => {
			// console.log("pen up, color");
			if (this._penDown) {
				this._penDown = false;
				this.ctx.stroke();
				this.ctx.fill();
				this.updateColorCtr++;
				// console.log('stroke and fill');
			}
		});
	}

	reset() {
		this.lastX = 0;
		this.lastY = 0;
		this.angle = 0;
		this.ctx.lineWidth = 1;
		this._penDown = true;
		this.ctx.fillStyle = '#00ff00';
		this.ctx.strokeStyle = '#0000ff';
	}

	drawColorBatch() {
		if (this.updateColorCtrMax <= 0) return;

		this.reset();
		this.updateColorCtr = 0;
		for (let i = 0; i < this.commandColor.length; i++) {
			this.commandColor[i]();
			if (this.updateColorCtr >= this.updateColorCtrMax) {
				return;
			}
		}
	}

	drawStrokeBatch() {
		if (this.commandStrokeBatch.length <= 0) return;

		this.reset();
		this.updateColorCtrMax = 0;

		// console.group('draw stroke batch');
		this.commandStrokeBatch.forEach((f) => {
			// console.log(f);
			this.drawStrokeSingle(f);
		});
		// console.groupEnd();
	}

	drawStrokeSingle(f: () => void) {
		if (f) f();
	}

	turn(angle: number = 0) {
		this.commandStroke.push(() => {
			this.angle += angle;

			// console.log("turn stroke", angle);
		});

		this.commandColor.push(() => {
			this.angle += angle;

			// console.log("turn color", angle);
		});
	}

	position(x: number, y: number) {
		// console.log("init command position");

		this.commandStroke.push(() => {
			this.lastX = x;
			this.lastY = y;
			this.ctx.moveTo(this.lastX, this.lastY);
			// console.log("position stroke, last x", this.lastX + "/last y", this.lastY);
		});

		this.commandColor.push(() => {
			this.lastX = x;
			this.lastY = y;
			this.ctx.moveTo(this.lastX, this.lastY);
			// console.log("position color, last x", this.lastX + "/last y", this.lastY);
		});
	}

	line(l: number): void {
		this._lineStroke(l);

		//coloring
		this.commandColor.push(() => {
			let angleDraw = this.angle;
			angleDraw = angleDraw * (Math.PI / 180);
			let stepX = l * Math.cos(angleDraw) * this._velX;
			let stepY = l * Math.sin(angleDraw) * this._velY;
			this.lastX += stepX;
			this.lastY += stepY;
			this.ctx.lineTo(this.lastX, this.lastY);
			// console.log("line color");
		})
	}

	curve(radius: number, angleRot: number): void {

		for (let i = 0; i < angleRot; i++) {
			this.commandStroke.push(() => {
				let xr = this.lastX + radius;
				let yr = this.lastY;

				this.ctx.beginPath();
				this.ctx.moveTo(this.lastX, this.lastY);

				this.angle += i;
				this.rotateRelXY(this.lastX, this.lastY, xr, yr, this.angle);
				this.lastX = this.resultX;
				this.lastY = this.resultY;

				this.ctx.lineTo(this.lastX, this.lastY);
				this.ctx.stroke();
			});
		}
	}

	_lineStroke(repeat: number) {
		let stepX: number = 0;
		let stepY: number = 0;

		for (let i = 0; i < repeat; i++) {
			this.commandStroke.push(() => {
				let angleDraw = this.angle;
				angleDraw = angleDraw * (Math.PI / 180);
				stepX = this.velX * Math.cos(angleDraw);
				stepY = this.velY * Math.sin(angleDraw);

				if (this._penDown == true) {
					// this.ctx.beginPath();
					// this.ctx.moveTo(this.lastX, this.lastY);
					this.lastX += stepX;
					this.lastY += stepY;
					this.ctx.lineTo(this.lastX, this.lastY);
					// this.ctx.stroke();
					// console.log("line stroke, pendown ", this._penDown);
				} else {
					this.lastX += stepX;
					this.lastY += stepY;
					this.ctx.moveTo(this.lastX, this.lastY);
					// console.log("line stroke, pendown ", this._penDown);
				}
			});
		}
	}
}