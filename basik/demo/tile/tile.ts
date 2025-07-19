let box: Basik.Image;

function Start() {
	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);

	//load brush image
	box = LoadImage("../imgs/box.png");

	//set image properties
	box.tilable = true;
}

function Update() {

	//clear screen
	Cls();

	//draw image
	DrawImage(box);
}

