let brush = muatImage("../../asset/brush.png");
brush.handleX = 8;
brush.handleY = 8;

function update() {
	if (mouseDitahan()) {
		brush.x = mouseX();
		brush.y = mouseY();
		gambarImage(brush);
	}
	bersihkanLayar(0, 200, 320, 240);
	posisiTeks(0, 210);
	tulis("Drag to draw");
}
