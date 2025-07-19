let box: Basik.Image;

function Start() {
	Graphics(320, 240);

	//load brush image
	box = LoadImage("../imgs/box.png");

	//set image properties
	box.dragType = 3;
	box.x = 160;
	box.y = 120;
	box.handleX = 16;
	box.handleY = 16;
}

//game loop
function Update() {

	//clear screen
	Cls();

	//draw image
	DrawImage(box);
	StrokeColor(0, 0, 0, 0);
	TextPos(0, 10);
	Write("Drag anywhere to move the box");
}
