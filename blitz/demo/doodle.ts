window.onload = () => {
	Basik.Graphic.Start(320, 240);
	let brush = Basik.Image.Load("./imgs/brush.png");
	brush.handleX = 8;
	brush.handleY = 8;
	Basik.Graphic.Cls(0, 0, 0);

	function update() {

		if (Basik.Input.Pencet()) {
			brush.x = Basik.Input.InputX();
			brush.y = Basik.Input.InputY();
			Basik.Image.Draw(brush);
		}

		window.requestAnimationFrame(update);
	}
	window.requestAnimationFrame(update);

}