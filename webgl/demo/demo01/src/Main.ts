let gl: Hagl;
let canvas: HTMLCanvasElement;
let gbr: HTMLImageElement;
let jml: number = 0;
let spr: Sprite[] = [];

window.onload = () => {
	// console.log('window onload');
	canvas = document.querySelector('canvas') as HTMLCanvasElement;
	gbr = document.querySelector('img#sprite') as HTMLImageElement;
	// console.log(gbr);

	gl = new Hagl(canvas);

	window.onresize = resize;
	resize();

	requestAnimationFrame(update);
}

function resize(): void {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

function buatSprite(): Sprite {
	return {
		x: Math.random() * canvas.width / 2,
		y: canvas.height / 2,
		grav: Math.random() * 10 + 5,
		kec: Math.random() * 10 + 5,
		op: 1
	}
}


function update(): void {
	// console.log('update');
	if (jml < 500) {
		jml++;
		spr.push(buatSprite());
	}

	spr.forEach((item: Sprite) => {
		item.y -= item.kec;
		if (item.y < 0) {
			item.y = canvas.height;
			item.x = Math.random() * canvas.width;
			item.kec = Math.floor(Math.random() * 10) + 10;
		}
	})

	render();

	// setTimeout(() => {
	requestAnimationFrame(update)
	// }, 30);
}

function render(): void {
	gl.clear();
	spr.forEach((item: Sprite) => {
		gl.drawImage(gbr, item.x, item.y);
	})
}

interface Sprite {
	x: number,
	y: number,
	grav: number,
	kec: number,
	op: number
}

