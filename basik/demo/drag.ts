//init app on windows load (not necessary but recomended for best practice)
window.onload = () => {

	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);

	//load brush image
	let box: Basik.Image = LoadImage("./imgs/box.png");

	//set image properties
	box.tipeDrag = 1;

	//game loop
	AddEventListener("update", () => {

		//clear screen
		Cls();

		//draw image
		DrawImage(box);
		StrokeColor(0, 0, 0, 0);
		debugMouse();
	})

	function debugMouse() {
		TextPos(0, 10);
		WriteLn("Image mouse id " + box.inputId);
		WriteLn("Image pressed " + box.down);
		WriteLn("Image is dragged " + box.dragged);
		WriteLn("Image dragged x " + box.drgStartX + "/dragged y " + box.drgStartY);
		WriteLn("Image x " + box.x);
		WriteLn("Image y " + box.y);
	}
}

