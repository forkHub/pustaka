let gl: Hagl;
let canvas: HTMLCanvasElement;
let gbr: HTMLImageElement;
let gbr2: HTMLImageElement;
let gbr3: HTMLImageElement;
let gbrKotak: HTMLImageElement;

window.onload = () => {
	console.log('window onload');
	canvas = document.querySelector('canvas') as HTMLCanvasElement;
	gbr = document.querySelector('img') as HTMLImageElement;
	gbr2 = document.querySelector('img#pan') as HTMLImageElement;
	gbr3 = document.querySelector('img#pan2') as HTMLImageElement;
	gbrKotak = document.querySelector('img#kotak') as HTMLImageElement;
	// console.log(gbrKotak);

	gl = new Hagl(canvas);

	window.onresize = () => {
		resize();
	}
	resize();

}

function gambarKotak(): void {
	// gl.clear();
	for (let i: number = 0; i < 10; i++) {
		gl.drawImage(gbrKotak, i * 32, 0, {
			texU1: 0,
			texV1: 0,
			texU2: 2,
			texV2: 2
		});
	}
	for (let i: number = 0; i < 10; i++) {
		gl.drawImage(gbrKotak, i * 48, 64, { scaleX: 1.5, scaleY: 2 });
	}
}

function render(): void {
	console.log('render');
	gl.drawImage(gbr, 200, 200, { alpha: 1, rotation: 0, offsetX: 0, offsetY: 0 });
	gl.drawImage(gbr, 200, 200, { alpha: .5, rotation: 0, scaleX: 1.2, scaleY: 1.2, offsetX: 128, offsetY: 128 });
	gl.drawImage(gbrKotak, 0, 0);
}

function gambarKotakText(): void {
	gl.drawImage(gbrKotak, 32, 32, {
		texU1: 0,
		texV1: 0,
		texU2: 64,
		texV2: 64,
		scaleX: 14,
		scaleY: 14
	});

}

function gambarKotak1(): void {
	gl.drawImage(gbrKotak, 0, 0);
}

//ekspektasi tidak buat buffer baru
function testImageSamaUVSama(): void {
	gl.drawImage(gbrKotak, 0, 0);
	gl.drawImage(gbrKotak, 32, 0);
	gl.drawImage(gbrKotak, 64, 0);
}


//buat uv dua kali
function testImageSamaUVBeda(): void {
	gl.drawImage(gbrKotak, 0, 0);
	gl.drawImage(gbrKotak, 32, 0);
	gl.drawImage(gbrKotak, 64, 0, { texU1: 0, texV1: 0, texU2: 16, texV2: 16 });
}

//buat uv dua kali
function testImageSamaUVBeda2(): void {
	gl.drawImage(gbrKotak, 0, 0);
	gl.drawImage(gbrKotak, 32, 0, { texU1: 0, texV1: 0, texU2: 16, texV2: 16 });
	gl.drawImage(gbrKotak, 64, 0);
	gl.drawImage(gbrKotak, 96, 0);
}

function testImage2(): void {
	gl.drawImage(gbrKotak, 0, 0);
	gl.drawImage(gbr2, 16, 0);
	gl.drawImage(gbrKotak, 64, 0);
	gl.drawImage(gbr3, 92, 0);
}


function resize(): void {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	gl.clear();
	// gambarKotak1();
	// testImageSamaUVSama();
	// testImageSamaUVBeda();
	// testImageSamaUVBeda2();
	testImage2();
}


