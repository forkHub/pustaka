let gl: Hagl;
let canvas: HTMLCanvasElement;
let gbr: HTMLImageElement;
let skala: number = 0;
let sudut: number = 0;

window.onload = () => {
	canvas = document.querySelector('canvas') as HTMLCanvasElement;
	gbr = document.querySelector('img#sprite') as HTMLImageElement;
	gl = new Hagl(canvas);

	window.onresize = resize;
	resize();

	requestAnimationFrame(update);
}

function resize(): void {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

function update(): void {

	sudut += 5;

	if (sudut > 360) {
		sudut -= 360;
	}

	skala = Math.sin(sudut * (Math.PI / 180.0));
	skala = Math.abs(skala);
	skala *= 5;
	skala += 1;

	render();
	requestAnimationFrame(update)
}

function render(): void {
	gl.clear();
	gl.drawImage(gbr, canvas.width / 2, canvas.height / 2, {
		offsetX: gbr.width / 2,
		offsetY: gbr.height / 2,
		scaleX: skala,
		scaleY: skala
	})
}
