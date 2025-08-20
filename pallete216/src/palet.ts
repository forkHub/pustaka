window.onload = () => {

}

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let ctr = 0;
let col = 0;
let row = 0;
let colM = 36;
canvas.width = 1200;
canvas.height = 600;
document.body.appendChild(canvas);
let s3 = Math.floor(256 / 6);

ctx.textAlign = "center";
ctx.font = "10px Arial";

for (let r = 0; r <= 5; r++) {
	for (let g = 0; g <= 5; g++) {
		for (let b = 0; b <= 5; b++) {
			col = ctr % colM;
			row = Math.floor(ctr / colM);
			ctx.fillStyle = `rgba(${r * s3}, ${g * s3}, ${b * s3}, 1)`;
			ctx.fillRect(col * 32, row * 64, 30, 30);
			console.log(r * s3, g * s3, b * s3, ctr);
			ctx.fillStyle = '#000';
			ctx.fillText((ctr + 1) + '', col * 32 + 16, row * 64 + 48);
			ctr++;
		}
	}
}

for (let i = 0; i < colM; i++) {
	s3 = (i / colM) * 255;
	ctx.fillStyle = `rgba(${s3}, ${s3}, ${s3}, 1)`;
	ctx.fillRect(i * 32, row * 64 + 64, 30, 30);
	ctx.fillStyle = '#000';
	ctx.fillText((ctr + 1) + '', i * 32 + 16, (row + 1) * 64 + 48);
	ctr++;
}