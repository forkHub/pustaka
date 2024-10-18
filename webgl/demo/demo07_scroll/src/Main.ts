let gl: Hagl;
let canvas: HTMLCanvasElement;
let gbr: HTMLImageElement;
let gpj: number = 800;
let glb: number = 450;
let gbrs: IGbr[] = [];
let backs: IGbrBack[] = [];
let gbr1: IGbr;
let gbr2: IGbr;
let gbr3: IGbr;
let gbr4: IGbr;
let gbr5: IGbr;
let gbr6: IGbr;
let viewLoading: HTMLDivElement;
let viewLoadingP: HTMLParagraphElement;

window.onload = () => {
	canvas = document.querySelector('canvas') as HTMLCanvasElement;
	gbr = document.querySelector('img#kotak') as HTMLImageElement;
	gl = new Hagl(canvas);

	viewLoading = document.querySelector('div.loading');
	viewLoadingP = viewLoading.querySelector('p');

	window.onresize = resize;
	resize();

	init();
}

function update(): void {
	setTimeout(() => {
		render();
		backs.forEach((item: IGbrBack) => {
			item.x -= item.kec;
			if ((item.x + item.gbr.gbr.width) < 0) {
				item.x += item.gbr.gbr.width;
			}
		})

		requestAnimationFrame(update);

	}, 30);
}

async function init(): Promise<void> {
	await loading();
	backs.push(buatBack(gbr1, 0));
	backs.push(buatBack(gbr2, 1));
	backs.push(buatBack(gbr3, 2));
	backs.push(buatBack(gbr4, 4));
	backs.push(buatBack(gbr5, 8));
	backs.push(buatBack(gbr6, 16));
	viewLoading.style.display = 'none';
	requestAnimationFrame(update);
}

function buatBack(gbr: IGbr, kec: number): IGbrBack {
	return {
		gbr: gbr,
		x: 0,
		kec: kec
	}
}

async function loading(): Promise<void> {
	viewLoadingP.innerHTML = 'Loading 1/6';
	gbr1 = await load('gbr/back02.png');
	viewLoadingP.innerHTML = 'Loading 2/6';
	gbr2 = await load('gbr/house3.png');
	viewLoadingP.innerHTML = 'Loading 3/6';
	gbr3 = await load('gbr/houses2.png');
	viewLoadingP.innerHTML = 'Loading 4/6';
	gbr4 = await load('gbr/houses1.png');
	viewLoadingP.innerHTML = 'Loading 5/6';
	gbr5 = await load('gbr/fence.png');
	viewLoadingP.innerHTML = 'Loading 6/6';
	gbr6 = await load('gbr/road2.png');
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

function render(): void {
	gl.clear();
	backs.forEach((item: IGbrBack) => {
		gl.drawImage(item.gbr.gbr, item.x, 0);
		gl.drawImage(item.gbr.gbr, item.x + item.gbr.gbr.width, 0);
	})
}

function ambilGbrDariPool(url: string): IGbr {
	let hasil: IGbr;
	gbrs.forEach((gbr) => {
		if (gbr.url == url) {
			console.log('ambil dari pool');
			hasil = gbr;
		}
	});

	if (!hasil) {
		let gbr: HTMLImageElement = document.createElement('img');
		console.log('buat baru');
		return {
			url: url,
			gbr: gbr,
			loaded: false
		}
	}

	return hasil;
}

async function load(url: string): Promise<IGbr> {
	return new Promise((resolve, reject) => {
		let gbr: IGbr;
		gbr = ambilGbrDariPool(url);
		if (gbr.loaded) resolve(gbr);
		gbr.gbr.onload = () => {
			gbr.loaded = true;
			resolve(gbr);
		}
		gbr.gbr.onerror = () => {
			reject();
		}
		gbr.gbr.src = gbr.url;
	});
}

interface IGbr {
	url: string,
	gbr: HTMLImageElement,
	loaded: boolean
}

interface IGbrBack {
	gbr: IGbr,
	x: number,
	kec: number
}