window.onload = () => {

}

interface IWarna {
	r: number;
	g: number;
	b: number;
}

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let ctr = 0;
let col = 0;
let row = 0;
let colM = 36;
let warnaAr: IWarna[] = [];

canvas.width = 1200;
canvas.height = 600;
document.body.appendChild(canvas);
let s3 = Math.floor(256 / 6);

ctx.textAlign = "center";
ctx.font = "10px Arial";

init();
function warna(idx: number = 0) {
	let item = warnaAr[idx];
	ctx.fillStyle = `rgba(${item.r}, ${item.g}, ${item.b}, 1)`;
}

function warnaGaris(idx: number = 0) {
	let item = warnaAr[idx];
	ctx.strokeStyle = `rgba(${item.r}, ${item.g}, ${item.b}, 1)`;
}

function init() {
	for (let r = 0; r <= 5; r++) {
		for (let g = 0; g <= 5; g++) {
			for (let b = 0; b <= 5; b++) {
				warnaAr.push({
					r: Math.floor(r * s3),
					g: Math.floor(g * s3),
					b: Math.floor(b * s3)
				})
			}
		}
	}

	for (let i = 0; i < colM; i++) {
		s3 = (i / colM) * 255;
		warnaAr.push({
			r: Math.floor(s3),
			g: Math.floor(s3),
			b: Math.floor(s3)
		})
	}
}

warnaAr.forEach((item, idx) => {
	ctx.beginPath();
	warnaGaris(idx);
	// ctx.fillStyle = `rgba(${item.r}, ${item.g}, ${item.b}, 1)`;
	// ctx.strokeStyle = `rgba(${item.r}, ${item.g}, ${item.b}, 1)`;
	ctx.moveTo(0, idx);
	ctx.lineTo(200, idx);
	ctx.stroke();
	item;
	// console.log(item);
})

console.log(warnaAr.length)