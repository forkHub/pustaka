let gl: Hagl;
let canvas: HTMLCanvasElement;
let kanvas2: HTMLCanvasElement;
let gbr: HTMLImageElement;
let gpj: number = 512;
let glb: number = 512;
let kontek: CanvasRenderingContext2D;

window.onload = () => {
	canvas = document.querySelector('canvas') as HTMLCanvasElement;
	kanvas2 = document.querySelector('canvas.kanvas2') as HTMLCanvasElement;
	gbr = document.querySelector('img#tileset') as HTMLImageElement;
	gl = new Hagl(canvas);
	kontek = kanvas2.getContext('2d');
	console.log(kontek);

	console.log(gbr);

	window.onresize = resize;
	resize();
	// render();

	// requestAnimationFrame(update);
	// update();
	update();
}

function update(): void {
	render();
	gambarGaris();
	// requestAnimationFrame(update);
}

function gambarGaris(): void {
	// let ctr: number = 0;

	for (let i: number = 0; i < 32; i++) {
		kontek.moveTo(i * 32, 0);
		kontek.lineTo(i * 32, canvas.height);
		kontek.stroke();

		kontek.moveTo(0, i * 32);
		kontek.lineTo(canvas.width, i * 32);
		kontek.stroke();
	}

	kontek.font = 'bold 12px Arial';

	for (let i: number = 0; i < 256; i++) {
		let x: number = i % 16;
		let y: number = Math.floor(i / 16);

		kontek.fillStyle = '#ffffff';
		kontek.fillText(i + '', x * 32 + 9, y * 32 + 17);
		kontek.fillText(i + '', x * 32 + 7, y * 32 + 15);
		kontek.fillStyle = '#000000';
		kontek.fillText(i + '', x * 32 + 8, y * 32 + 16);
	}
}

function resize() {
	let wp = window.innerWidth;
	let wl = window.innerHeight;

	let ratio = Math.min((wp / gpj), (wl / glb));

	let cp2 = Math.floor(gpj * ratio);
	let cl2 = Math.floor(glb * ratio);

	canvas.style.width = cp2 + 'px';
	canvas.style.height = cl2 + 'px';

	canvas.style.top = ((wl - cl2) / 2) + 'px';
	canvas.style.left = ((wp - cp2) / 2) + 'px';

	canvas.width = gpj;
	canvas.height = glb;

	kanvas2.style.width = cp2 + 'px';
	kanvas2.style.height = cl2 + 'px';

	kanvas2.style.top = ((wl - cl2) / 2) + 'px';
	kanvas2.style.left = ((wp - cp2) / 2) + 'px';

	kanvas2.width = gpj;
	kanvas2.height = glb;

	// render();
}

function drawImage(x: number, y: number, frame: number): void {
	let ux: number = frame % 16;
	let vy: number = Math.floor(frame / 16);


	ux *= 32;
	vy *= 32;

	// console.log(ux + '/' + vy);

	gl.drawImage(gbr, x, y, {
		texU1: ux,
		texV1: vy,
		texU2: ux + 32,
		texV2: vy + 32,
		offsetX: gbr.width / 2,
		offsetY: gbr.height / 2,
		scaleX: 1 / 16,
		scaleY: 1 / 16
	});
}

function render(): void {
	let frame: number = 0;

	gl.clear();

	for (let y: number = 0; y < 16; y++) {
		for (let x: number = 0; x < 16; x++) {
			drawImage(x * 32 + 16, y * 32 + 16, frame);
			frame++;
		}
		// frame++;
	}
}
