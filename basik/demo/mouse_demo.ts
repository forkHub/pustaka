window.onload = () => {
	//TODO:

	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);

	//load brush image
	let box: Basik.Image = LoadImage("./imgs/box.png");

	//set image properties
	box.tipeDrag = 3;
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
		Write("Drag anywhere to move the box");
	})
}

