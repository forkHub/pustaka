window.onload = () => {
	//set graphics. We are working with 320x240 resolution
	Graphics(640, 480);
	let downCtr = 0;
	let upCtr = 0;

	AddEventListener(Basik.Evt.KEYB_DOWN, () => {
		downCtr++;
	});

	AddEventListener(Basik.Evt.KEYB_UP, () => {
		upCtr++;
	});

	//game loop
	AddEventListener("update", () => {

		//clear screen
		Cls();

		//draw image
		StrokeColor(0, 0, 0, 0);
		TextPos(0, 10);
		TextSize(8)
		WriteLn("is down: " + KeyboardIsDown());
		WriteLn("last key: " + LastKey());
		WriteLn("down ctr: " + downCtr);
		WriteLn("up ctr: " + upCtr);

		// TextSize(48);
		// WriteLn("🚗🚓🚕🛺🚙🚌🚐🚎");

		//debugger purpose
		// WriteLn("");
		// WriteLn("global down " + Basik.Input.global.isDown + "/drag " + Basik.Input.global.isDrag);
	})
}

