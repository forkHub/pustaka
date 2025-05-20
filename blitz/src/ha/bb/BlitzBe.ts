///<reference path="./Route.ts"/>

const G = Basik.G;
const T = Basik.Tk;
const Im = Basik.Im;
const Ip = Basik.Ip;
const In = Basik.In;

/**
 * 
 * @param w 
 * @param h 
 * @param canvas 
 * @param fullScreen 
 * @param input 
 */
function Graphics(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, fullScreen: boolean = true, input: boolean = true) {

	if (canvas) {
		G.canvas = canvas;
	}
	G.skalaOtomatis = fullScreen;

	console.log('inisialisasi');

	G.init(w, h, G.skalaOtomatis);

	if (input) {
		In.init(G.canvas);
	}

	// if (Graphic.skalaOtomatis) {
	window.addEventListener("resize", (): void => {
		G.handleWindowResize();
	})

	function update() {
		let updater = (window as any)["Update"];
		if (typeof updater === "function") {
			updater();
		}
		window.requestAnimationFrame(update);
	}
	update();

	setTimeout(() => {
		G.handleWindowResize();
	}, 100);

	//font default
	// Teks.Font("12px cursive");
	T.Rata("center");
	T.Goto(169, 10);
	G.FillColor(255, 255, 255, 100);
	G.context.strokeStyle = "#ffffff";
	Cls(0, 0, 0);
}

/**
 * 
 * @param r 
 * @param g 
 * @param b 
 * @param a 
 */
function Cls(r?: number, g?: number, b?: number, a?: number) {
	let ctx: CanvasRenderingContext2D = G.context;
	// window.getComputedStyle()
	G.backupWarna();
	ctx.clearRect(0, 0, parseInt(G.canvas.style.width), parseInt(G.canvas.style.height));
	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 100})`;
	ctx.fillRect(0, 0, parseInt(G.canvas.style.width), parseInt(G.canvas.style.height));
	G.restoreColor();
}

/**
 * 
 * @param r 
 * @param g 
 * @param b 
 * @param a 
 */
function StrokeColor(r: number = 0, g: number = 0, b: number = 0, a: number = 100): void {
	G.context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
 * @returns (number) warna merah
 */
function Hijau(): number {
	return G.hijau;
}

function Merah(): number {
	return G.merah;
}

/**
 * Mengembalikan warna biru dari perintah AmbilPixel terakhir
 * @returns (number) warna biru
 */
function Biru(): number {
	return G.biru;
}

/**
 * 
 * @returns 
 */
function Transparan(): number {
	return Math.floor(G.transparan * 100);
}

/**
 * 
 * @param x 
 * @param y 
 * @returns 
 */
function GetPixel(x: number = 0, y: number = 0): number[] {
	return Ip.AmbilPiksel(x, y);
}

function SetPiksel(x: number = 0, y: number = 0) {
	return Ip.AmbilPiksel(x, y);
}


function Garis(Ax: number, Ay: number, Bx: number, By: number) {
	let ctx: CanvasRenderingContext2D = G.context;

	Ax = Math.floor(Ax);
	Ay = Math.floor(Ay);
	Bx = Math.floor(Bx);
	By = Math.floor(By);

	ctx.beginPath();
	ctx.moveTo(Ax, Ay);
	ctx.lineTo(Bx, By);
	ctx.stroke();
}

function Kotak(x1: number, y1: number, x2: number, y2: number, isi: boolean = false, garis: boolean = true, rotasi: number = 0) {
	let ctx: CanvasRenderingContext2D = G.context;

	//TODO: rotasi
	rotasi;

	if (isi) {
		ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
	}

	if (garis) {
		ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
	}
}

function Oval(x: number = 0, y: number = 0, radius: number, skalaX: number = 1, skalaY = .5, rotasi: number = 0) {
	let ctx: CanvasRenderingContext2D = G.context

	// save state
	ctx.save();

	// translate context
	ctx.translate(x, y);

	ctx.rotate(rotasi * (Math.PI / 180));

	// scale context horizontally
	ctx.scale(skalaX, skalaY);

	// draw circle which will be stretched into an oval
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);

	// restore to original state
	ctx.restore();
	ctx.stroke();
}

//TODO:
const CreateDict = Dict.create;
// const DictGetValue = Dict.GetValue;
// const DictAddAttr = Dict.AddAttr;
// const DictGetKeyList = Dict.GetKeyList;
// const DictGetValueList = Dict.GetValueList;   
