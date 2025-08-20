window.onload = () => {

	let canvas = document.createElement("canvas") as HTMLCanvasElement;
	canvas.width = 800;
	canvas.height = 600;
	let ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	for (let i = 0; i < 255; i++) {
		let str = ("000000000" + i.toString(2));
		str = str.slice(str.length - 8, Number.MAX_VALUE);
		console.log(str);

		let kali = parseInt(str.slice(0, 2), 2);
		let merah = parseInt(str.slice(2, 4), 2) * 21 * (kali + 1);
		let hijau = parseInt(str.slice(4, 6), 2) * 21 * (kali + 1)
		let biru = parseInt(str.slice(6, 8), 2) * 21 * (kali + 1);

		// console.log("kali: ", kali);
		// console.log("merah: ", merah);
		// console.log("hijau: ", hijau);
		// console.log("biru: ", biru);

		let style = `rgba(${merah}, ${hijau}, ${biru})`;
		console.log(style);

		ctx.fillStyle = style;

		let jmlKol = 16
		let pjg = 32;
		let kol = i % jmlKol;
		let row = Math.floor(i / jmlKol);

		row *= pjg;
		kol *= pjg;

		ctx.fillRect(kol, row, pjg - 2, pjg - 2);
	}
}