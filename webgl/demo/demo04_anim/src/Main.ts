let gl: Hagl;
let canvas: HTMLCanvasElement;
let gbr: HTMLImageElement;
let gpj: number = 128;
let glb: number = 128;
let frame: number = 0;
let skala: number = 1 / 8;

window.onload = () => {
	canvas = document.querySelector('canvas') as HTMLCanvasElement;
	gbr = document.querySelector('img#ledakan') as HTMLImageElement;
	gl = new Hagl(canvas);

	window.onresize = resize;
	resize();

	requestAnimationFrame(update);
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
}

function update(): void {

	frame++;
	if (frame >= 64) frame = 0;

	render();
	requestAnimationFrame(update)
}

function render(): void {
	let x: number = frame % 8;
	let y: number = Math.floor(frame / 8);

	let u1: number = x * 64;
	let v1: number = y * 64;
	let u2: number = u1 + 64;
	let v2: number = v1 + 64;

	gl.clear();

	gl.drawImage(gbr, canvas.width / 2, canvas.height / 2, {
		scaleX: skala,
		scaleY: skala,
		offsetX: gbr.width / 2,
		offsetY: gbr.height / 2,
		texU1: u1,
		texV1: v1,
		texU2: u2,
		texV2: v2
	});
}
