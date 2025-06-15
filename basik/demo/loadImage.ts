//init app
window.onload = () => {
	Graphics(320, 240);

	//load brush
	let brush: Basik.Image = LoadImage("./imgs/box.png");
	brush.width = 20;
	brush.tilable = true;
	brush.rotation = 45;

	AddListener("update", () => {
		Cls();
		DrawImage(brush);
	})
}

