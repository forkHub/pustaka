//init app
window.onload = () => {
	Graphics(320, 240);

	//load brush
	let brush: Basik.Image = LoadAnimImage("./imgs/exp2_0.png", 64, 64);
	// brush.width = 20;

	AddListener("update", () => {
		Cls();
		// brush.frame++;
		// if (brush.frame > 15) brush.frame = 0;
		// DrawImage(brush);

		for (let i = 0; i < 16; i++) {
			brush.frame = i;
			brush.x = (i % 4) * 48;
			brush.y = Math.floor(i / 4) * 48;
			brush.width = 32;
			brush.height = 32;
			brush.rotation = 10;
			DrawImage(brush);
		}
	})
}

