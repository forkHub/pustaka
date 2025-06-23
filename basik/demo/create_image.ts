window.onload = () => {
	//set graphics. We are working with 320x240 resolution
	Graphics(640, 480);

	let img = CreateImage(48, 48);
	let ctx1 = img.canvas.getContext('2d');
	// SetCanvas()
	StrokeColor(0, 0, 0, 100);
	ctx1.beginPath();
	ctx1.moveTo(0, 0);
	ctx1.lineTo(48, 20);
	ctx1.rect(0, 0, 48, 48);
	ctx1.stroke();

	let ctx = MainCanvas().getContext('2d');
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(100, 100);
	ctx.stroke();

	// ctx.drawImage(img.canvas, 0, 0);
	// DrawImage(img);

	//game loop
	AddEventListener("update", () => {
		//clear screen
		Cls();
		DrawImage(img);

		StrokeColor(0, 0, 0, 0);
		TextPos(0, 10);
		WriteLn("loaded: " + img.load);
		WriteLn("width: " + img.width + "/h " + img.height);
	})
}

