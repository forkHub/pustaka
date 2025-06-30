window.onload = () => {
	//set graphics. We are working with 320x240 resolution
	Graphics(640, 480);

	class Particle extends Basik.Image {
		velY: number = 0;
		velAlpha: number = .1;

		constructor(url: string = "./imgs/brush.png") {
			super(url);
		}
	}

	class Emitter {
		ctr: number = 0;
		x: number = 0;
		y: number = 0;
		velAlpha: number = .1;
		velY: number = 0;
	}

	// let brush = new Particle("./imgs/brush.png");
	let ems: Emitter[] = [];
	let particles: Particle[] = [];
	let img = CreateImage(64, 100);
	let img2 = CreateImage(64 * 8, 100);
	let ctr = 0;
	let ctrPick = 0;
	// let ctx = MainCanvas().getContext('2d');
	let imgCtx = img.canvas.getContext('2d');

	for (let i = 0; i < 20; i++) {
		let em: Emitter = new Emitter();
		em.ctr = Math.floor(Math.random() * 8);
		em.velAlpha = Math.ceil(Math.random() * 5) + 4;
		em.velY = Math.ceil(Math.random() * 5);
		em.x = Math.floor(Math.random() * 8) * 2 + 32;
		ems.push(em);
	}

	//game loop
	AddEventListener("update", () => {
		Cls();

		ems.forEach((item) => {
			item.ctr++;
			if (item.ctr > 8) {
				item.ctr = 0;
				let p = getParticle();
				p.x = item.x;
				p.y = 400;
				p.alpha = 100;
				p.velAlpha = item.velAlpha;
				p.velY = item.velY;
			}
		})

		particles.forEach((p) => {
			p.y -= p.velY;
			p.alpha -= p.velAlpha;
			if (p.alpha <= 0) p.alpha = 0;
			DrawImage(p);
		})

		FillColor(0, 0, 0, 0);
		Rect(32, 315, 64, 415);
		// DrawImage(img);

		ctr++;
		if (ctr > 100) {
			if (ctrPick < 8) {
				imgCtx.clearRect(0, 0, 64, 100);
				imgCtx.drawImage(MainCanvas(), -32, -315);
				img.x = ctrPick * 32;
				img.y = 0;
				SetCanvas(img2.canvas);
				DrawImage(img);
				SetCanvas(MainCanvas());
			}
			ctrPick++;
		}

		DrawImage(img2);
	})

	function getParticle(): Particle {
		for (let i = 0; i < particles.length; i++) {
			let item = particles[i];
			if (item.alpha <= 0) {
				return item;
			}
		}

		let p = new Particle();
		particles.push(p);
		return p;
	}


}

