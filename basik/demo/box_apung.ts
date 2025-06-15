window.onload = () => {
	Graphics(320, 240);

	class Box extends Basik.Image {
		/**
		 * state:
		 * 1 = atas air
		 * 2 = bawah air
		 */
		state: number = 0;
		// x: number = 0;
		// y: number = 0;
		vx: number = 0;
		vy: number = 0;
		ax: number = 0;
		ay: number = .1;
		waccy: number = 0;
		// img: Basik.ImgObj;

		// update() {
		// 	this.img.x = this.x;
		// 	this.img.y = this.y
		// }
	}

	let batu = LoadImage("./imgs/box.png") as Box;
	let kotak = LoadImage("./imgs/box.png") as Box

	kotak.x = 150;
	kotak.y = 0;
	kotak.ay = .1;

	batu.x = 150;
	batu.y = 100 - 30;

	// let img = LoadImage('./imgs/box.png');

	AddListener("keydown", () => {
		// batu.state = 1;
		// batu.ay = .1;
	})

	AddListener("update", () => {
		updateKotak();
		updateBatu();

		//render
		Cls();
		DrawImage(kotak);
		DrawImage(batu);
		FillColor(0, 0, 0, 100);
		let ctx = MainCanvas().getContext('2d');
		ctx.strokeRect(0, 100, 320, 1);
		ctx.fillText("b.state " + batu.state, 10, 10)
		ctx.fillText("b.vy " + batu.vy, 10, 20)
		ctx.fillText("kotak.y  " + kotak.y + "/kotak x " + kotak.x, 10, 30)

		//draw line water
		// debugger;
	});

	// function wrapImage(): Box {
	// 	let h = LoadImage("./imgs/box.png") as Box;
	// 	return h
	// }

	function updateKotak() {
		kotak.vy += kotak.ay;
		kotak.y += Clamp(kotak.vy, -10, 10);

		if (kotak.y >= 200) kotak.y = 200;

		if (ImageCollide(kotak, batu)) {
			kotak.y = batu.y - 32;
			kotak.vy = 0;

			if (batu.state == 0) {
				batu.state = 1;
				batu.ay = .1;
			}
		}
	}

	function updateBatu() {
		if (batu.state == 1) {
			batu.vy += batu.ay;
			batu.y += Clamp(batu.vy, -15, 15);

			if (batu.y > 100) {
				batu.state = 2;
				batu.ay = -.2;
			}
		}
		else if (batu.state == 2) {
			batu.vy += batu.ay;
			batu.y += Clamp(batu.vy, -15, 15);

			if (batu.y > 240 - 32) {
				batu.y = 240 - 32;
			}

			if (batu.y < 100 - 32) {
				batu.state = 0;
				batu.y = 100 - 32;
				batu.vy = 0;
			}
		}
	}

	// function drawImage(img: Basik.ImgObj, x: number, y: number) {
	// 	img.x = x;
	// 	img.y = y;
	// 	DrawImage(img);
	// }
}