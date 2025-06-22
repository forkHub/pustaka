//init app
window.onload = () => {
	Graphics(320, 240);

	//load brush
	let brush: Basik.Image;
	brush = LoadImage("./imgs/brush.png");

	//set handle to center
	brush.handleX = 8;
	brush.handleY = 8;

	//clear the screen
	Cls();

	AddEventListener("update", () => {
		if (MouseIsDown(0)) {
			draw();
		}
	})

	//draw brush at mouse position
	function draw() {
		brush.x = MouseX();
		brush.y = MouseY();
		DrawImage(brush);
	}
}

