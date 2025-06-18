window.onload = () => {

	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);

	//load brush image
	let box: Basik.Image = LoadImage("./imgs/box.png");

	//set image properties
	box.tipeDrag = 2;
	box.x = 160;
	box.y = 120;
	box.handleX = 16;
	box.handleY = 16;

	//game loop
	AddEventListener("update", () => {

		//clear screen
		Cls();

		//draw image
		DrawImage(box);
		StrokeColor(0, 0, 0, 0);
		TextPos(0, 10);
		Write("Drag the box to rotate the box")
		debugMouse();
	})

	function debugMouse() {
		TextSize(10);
		TextPos(0, 50);
		WriteLn("Input Id " + In.global.id);
		WriteLn("Input drag x " + In.global.xDrag + "/y " + In.global.yDrag);
		WriteLn("Input dragged " + In.global.isDrag);
		WriteLn("Input down " + In.global.isDown);
		WriteLn("");
		WriteLn("Image id " + box.inputId);
		WriteLn("Image pressed " + box.down);
		WriteLn("Image dragged " + box.dragged);
		WriteLn("Image drag x " + box.drgStartX + "/y " + box.drgStartY);
		WriteLn("Image x " + box.x);
		WriteLn("Image y " + box.y);
	}
}

