//init app
window.onload = () => {
	Graphics(320, 240);

	//load brush
	let brush: Basik.ImgObj;
	brush = LoadImage("./imgs/brush.png");

	//set handle to center
	brush.handleX = 8;
	brush.handleY = 8;

	//clear the screen
	Cls();

	AddListener("mousedrag", () => {
		draw();
	})

	AddListener("mousedown", () => {
		draw();
	})

	//draw brush at mouse position
	function draw() {
		brush.x = MouseX();
		brush.y = MouseY();
		DrawImage(brush);
	}
}

