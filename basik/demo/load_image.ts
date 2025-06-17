//init app on windows load (not necessary but recomended for best practice)
window.onload = () => {

	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);

	//load brush image
	let box: Basik.Image = LoadImage("./imgs/box.png");

	//set image proerties
	box.width = 20;
	box.height = 20;
	box.rotation = 45;
	box.x = 160;
	box.y = 120;
	box.handleX = 10;
	box.handleY = 10;

	//game loop
	AddEventListener("update", () => {

		//clear screen
		Cls();

		//draw image
		DrawImage(box);
	})
}

