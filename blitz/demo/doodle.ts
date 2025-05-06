window.onload = () => {
	Graphics(320, 240);
	let brush = LoadImage("./imgs/brush.png");
	brush.handleX = 8;
	brush.handleY = 8;
	Cls(0, 0, 0);

	function update() {

		if (InputIsDown()) {
			brush.x = InputX();
			brush.y = InputY();
			DrawAllImage();
		}

		window.requestAnimationFrame(update);
	}
	update();

}