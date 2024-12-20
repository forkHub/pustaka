let gl: Hagl;
let kanvas: HTMLCanvasElement;
let gbr: HTMLImageElement;
let gpj: number = 32 * 8;
let glb: number = 32 * 8;
let kontek: CanvasRenderingContext2D;
let peta = [
	"01234555",
	"01236777",
	"012eggf0",
	"01222230",

	"0899d230",
	"00001230",
	"00001230",
	"00001230"
];

window.onload = () => {
	kanvas = document.querySelector('canvas') as HTMLCanvasElement;
	gbr = document.querySelector('img#tileset') as HTMLImageElement;
	gl = new Hagl(kanvas);
	console.log(kontek);

	console.log(gbr);

	window.onresize = resize;
	resize();

	gambar();
}

function petaNilai(x: number, y: number): string {
	return peta[y].charAt(x);
}

function nilai2Frame(s: string): number {
	if ("0" == s) return 177;
	if ("1" == s) return 16;
	if ("2" == s) return 17;
	if ("3" == s) return 18;
	if ("4" == s) return 178;
	if ("5" == s) return 163;
	if ("6" == s) return 177;
	if ("7" == s) return 161;
	if ("8" == s) return 32;
	if ("9" == s) return 33;
	if ("d" == s) return 49;
	if ("e" == s) return 64;
	if ("f" == s) return 2;
	if ("g" == s) return 1;
	throw new Error(s);
}


function gambar(): void {
	gl.clear();
	for (let i: number = 0; i < 8; i++) {
		for (let j: number = 0; j < 8; j++) {
			let n: string = petaNilai(i, j);
			let f: number = nilai2Frame(n);
			gambarFrame(i * 32 + 16, j * 32 + 16, f);
		}
	}
}

function resize() {
	let wp = window.innerWidth;
	let wl = window.innerHeight;

	let ratio = Math.min((wp / gpj), (wl / glb));

	let cp2 = Math.floor(gpj * ratio);
	let cl2 = Math.floor(glb * ratio);

	kanvas.style.width = cp2 + 'px';
	kanvas.style.height = cl2 + 'px';

	kanvas.style.top = ((wl - cl2) / 2) + 'px';
	kanvas.style.left = ((wp - cp2) / 2) + 'px';

	kanvas.width = gpj;
	kanvas.height = glb;
}

function gambarFrame(x: number, y: number, frame: number): void {
	let ux: number = frame % 16;
	let vy: number = Math.floor(frame / 16);

	ux *= 32;
	vy *= 32;

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

