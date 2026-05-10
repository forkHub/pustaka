class SpiderLeg {
	private angleBase: number; // sudut awal mengelilingi tubuh
	private length: number;
	private phaseOffset: number;
	private angle: number = 0;
	private pivot: { x: number; y: number } = { x: 0, y: 0 };

	constructor(angleBase: number, length: number, phaseOffset: number) {
		this.angleBase = angleBase;
		this.length = length;
		this.phaseOffset = phaseOffset;
	}

	update(tick: number, bodyPos: { x: number; y: number }, bodyRadius: number) {
		// pivot mengikuti tubuh + sudut awal
		this.pivot.x = bodyPos.x + Math.cos(this.angleBase) * bodyRadius;
		this.pivot.y = bodyPos.y + Math.sin(this.angleBase) * bodyRadius;

		// osilasi kecil di sekitar sudut awal
		this.angle = this.angleBase + Math.sin((tick + this.phaseOffset) / 20) * 0.3;
	}

	getEndPoint() {
		return {
			x: this.pivot.x + Math.cos(this.angle) * this.length,
			y: this.pivot.y + Math.sin(this.angle) * this.length,
		};
	}

	render(ctx: CanvasRenderingContext2D) {
		const end = this.getEndPoint();
		// garis lengan
		ctx.beginPath();
		ctx.moveTo(this.pivot.x, this.pivot.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();

		// telapak kaki
		ctx.beginPath();
		ctx.arc(end.x, end.y, 5, 0, Math.PI * 2);
		ctx.fill();
	}
}

export class Spider {
	private legs: SpiderLeg[] = [];
	private position: { x: number; y: number };
	private radius: number = 15;

	constructor(x: number, y: number) {
		this.position = { x, y };
		// empat kaki dengan sudut awal mengelilingi tubuh
		this.legs.push(new SpiderLeg(0, 40, 0));             // kanan
		this.legs.push(new SpiderLeg(Math.PI / 2, 40, 10));  // bawah
		this.legs.push(new SpiderLeg(Math.PI, 40, 20));      // kiri
		this.legs.push(new SpiderLeg(3 * Math.PI / 2, 40, 30)); // atas
	}

	update(tick: number) {
		// tubuh bergerak sesuai resultan gaya kaki
		let totalForce = { x: 0, y: 0 };
		this.legs.forEach(leg => {
			leg.update(tick, this.position, this.radius);
			const end = leg.getEndPoint();
			totalForce.x += (end.x - this.position.x);
			totalForce.y += (end.y - this.position.y);
		});
		this.position.x += totalForce.x / this.legs.length * 0.01;
		this.position.y += totalForce.y / this.legs.length * 0.01;
	}

	render(ctx: CanvasRenderingContext2D) {
		// tubuh
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx.fill();

		// kaki
		this.legs.forEach(leg => leg.render(ctx));
	}
}
