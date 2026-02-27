///<reference path="./Route.ts"/>

function bukaPath(x: number = 0, y: number = 0, rotasi: number = 0): void {
	let ctx = G.Canvas().getContext('2d');
	rotasi; //TODO:
	ctx.beginPath();
	ctx.moveTo(x, y);
	G.lastX = x;
	G.lastY = y;
}

function garisKe(x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.lineTo(G.lastX + x, G.lastY + y);
}

function kurvaKe(cx: number, cy: number, x: number, y: number): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.quadraticCurveTo(cx, cy, x, y);
	//TODO: dibuat bezier
}

function bezier(): void {

}

function tutupPath() {
	let ctx = G.Canvas().getContext('2d');
	ctx.stroke();
	ctx.fill();
}

function garis(x1: number = 100, y1: number = 100, x2: number = 200, y2: number = 100) {
	let ctx = G.Canvas().getContext('2d');
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function lingkaran(x: number = 100, y: number = 100, radius: number = 20, awal: number = 0, akhir: number = 360): void {
	let ctx = G.Canvas().getContext('2d');
	ctx.beginPath();
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.arc(x, y, radius, awal, akhir);
	ctx.stroke();
	ctx.fill();
}

function elip(x: number = 0, y: number = 0, radiusX: number = 0, radiusY: number = 0, awal: number = 0, akhir: number = 360): void {
	let ctx = G.Canvas().getContext('2d');
	awal *= (Math.PI / 180);
	akhir *= Math.PI / 180;
	ctx.ellipse(x, y, radiusX, radiusY, 0, awal, akhir);
	ctx.stroke();
	ctx.fill();
}

function kotak(x1: number = 10, y1: number = 10, x2: number = 100, y2: number = 100) {
	let ctx = G.Canvas().getContext('2d');
	ctx.fillRect(x1, y1, x2, y2);
	ctx.strokeRect(x1, y1, x2, y2);
}

function segitiga(
	x: number, // titik tengah bawah segitiga (posisi X)
	y: number, // titik tengah bawah segitiga (posisi Y)
	base: number, // panjang sisi segitiga
	height: number,
	position: number
): void {
	let ctx = G.Context();

	if (height == undefined && position == undefined) {
		// Hitung tinggi segitiga sama sisi
		const height = (Math.sqrt(3) / 2) * base;

		// Hitung koordinat titik-titik segitiga
		const x1 = x - base / 2; // kiri bawah
		const y1 = y;

		const x2 = x + base / 2; // kanan bawah
		const y2 = y;

		const x3 = x; // puncak atas
		const y3 = y - height;

		// Gambar segitiga
		G.Context().beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.closePath();

		ctx.stroke(); // garis segitiga
		ctx.fill();
	}
	else if (position == undefined) {
		// Hitung koordinat titik-titik segitiga
		const x1 = x - base / 2; // kiri alas
		const y1 = y;

		const x2 = x + base / 2; // kanan alas
		const y2 = y;

		const x3 = x; // puncak atas
		const y3 = y - height;

		// Gambar segitiga
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.closePath();

		ctx.stroke(); // garis segitiga
		ctx.fill(); // jika ingin diwarnai
	}
	else {
		let x1 = x, y1 = y; // sudut siku
		let x2: number, y2: number;
		let x3: number, y3: number;

		// type RightAnglePosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";
		switch (position) {
			case 0:
				x2 = x + base; y2 = y;       // alas ke kanan
				x3 = x; y3 = y - height;     // tinggi ke atas
				break;

			case 1:
				x2 = x - base; y2 = y;       // alas ke kiri
				x3 = x; y3 = y - height;     // tinggi ke atas
				break;

			case 2:
				x2 = x + base; y2 = y;       // alas ke kanan
				x3 = x; y3 = y + height;     // tinggi ke bawah
				break;

			default:
				x2 = x - base; y2 = y;       // alas ke kiri
				x3 = x; y3 = y + height;     // tinggi ke bawah
				break;
		}

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.closePath();

		ctx.stroke();
		ctx.fill(); // jika ingin diwarnai
	}
}

function pie(
	x: number, // pusat lingkaran
	y: number,
	radius: number, // jari-jari
	startAngleDeg: number, // sudut awal (derajat)
	endAngleDeg: number,   // sudut akhir (derajat)
): void {
	// Konversi derajat ke radian
	const startAngle = (startAngleDeg * Math.PI) / 180;
	const endAngle = (endAngleDeg * Math.PI) / 180;

	let ctx = G.Context();
	ctx.beginPath();
	ctx.moveTo(x, y); // mulai dari pusat
	ctx.arc(x, y, radius, startAngle, endAngle); // gambar busur
	ctx.lineTo(x, y); // kembali ke pusat
	ctx.closePath();

	// ctx.fillStyle = fillColor;
	ctx.fill();
	ctx.stroke();
}

function polygonTeratur(
	x: number, // pusat poligon
	y: number,
	radius: number, // jari-jari (jarak dari pusat ke titik sudut)
	sides: number, // jumlah sisi (misalnya 6 untuk hexagon)
): void {
	if (sides < 3) return; // minimal segitiga

	const angleStep = (2 * Math.PI) / sides;

	let ctx = G.Context();
	ctx.beginPath();
	for (let i = 0; i < sides; i++) {
		const px = x + radius * Math.cos(angleStep * i - Math.PI / 2);
		const py = y + radius * Math.sin(angleStep * i - Math.PI / 2);

		if (i === 0) {
			ctx.moveTo(px, py);
		} else {
			ctx.lineTo(px, py);
		}
	}
	ctx.closePath();

	// ctx.fillStyle = fillColor;
	ctx.fill();
	ctx.stroke();
}

function bintang(
	ctx: CanvasRenderingContext2D,
	x: number, // posisi tengah bintang (X)
	y: number, // posisi tengah bintang (Y)
	spikes: number, // jumlah sudut (misalnya 5)
	outerRadius: number, // jari-jari luar
	innerRadius: number, // jari-jari dalam
	fillColor: string = "gold" // warna isi
): void {
	let rot = Math.PI / 2 * 3;
	let step = Math.PI / spikes;
	let cx = x;
	let cy = y;

	ctx.beginPath();
	ctx.moveTo(cx, cy - outerRadius);

	for (let i = 0; i < spikes; i++) {
		let x1 = cx + Math.cos(rot) * outerRadius;
		let y1 = cy + Math.sin(rot) * outerRadius;
		ctx.lineTo(x1, y1);
		rot += step;

		let x2 = cx + Math.cos(rot) * innerRadius;
		let y2 = cy + Math.sin(rot) * innerRadius;
		ctx.lineTo(x2, y2);
		rot += step;
	}

	ctx.lineTo(cx, cy - outerRadius);
	ctx.closePath();
	ctx.fillStyle = fillColor;
	ctx.fill();
	ctx.stroke();
}
