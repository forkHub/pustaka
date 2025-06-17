//init app on windows load (not necessary but recomended for best practice)
window.onload = () => {

	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);

	//load brush image
	let box: Basik.Image = LoadImage("./imgs/box.png");

	//set image properties
	box.tilable = true;

	//game loop
	AddEventListener("update", () => {

		//clear screen
		Cls();

		//draw image
		DrawImage(box);
	})
}

