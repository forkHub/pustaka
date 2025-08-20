window.onload = () => {

}

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let ctr = 0;
let col = 0;
let row = 0;
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
let s3 = Math.floor(256 / 3);

ctx.textAlign = "center";

for (let r = 0; r <= 3; r++) {
	for (let g = 0; g <= 3; g++) {
		for (let b = 0; b <= 3; b++) {
			col = ctr % 16;
			row = Math.floor(ctr / 16);
			ctx.fillStyle = `rgba(${r * s3}, ${g * s3}, ${b * s3}, 1)`;
			ctx.fillRect(col * 32, row * 64, 30, 30);
			console.log(r * s3, g * s3, b * s3, ctr);
			ctx.fillStyle = '#000';
			ctx.fillText(ctr + '', col * 32 + 16, row * 64 + 48);
			ctr++;
		}
	}
}

for (let i = 0; i < 16; i++) {
	s3 = (i / 15) * 255;
	ctx.fillStyle = `rgba(${s3}, ${s3}, ${s3}, 1)`;
	ctx.fillRect(i * 32, row * 64 + 64, 30, 30);
	ctx.fillStyle = '#000';
	ctx.fillText(ctr + '', i * 32 + 16, (row + 1) * 64 + 48);
	ctr++;
}