window.onload = () => {
	//set graphics. We are working with 320x240 resolution
	Graphics(640, 480);
	let tapCtr = 0;

	AddEventListener(Basik.Evt.MOUSE_TAP, () => {
		if (MouseButton() == 0) tapCtr++;
	})

	//TODO: more mouse event demo

	//game loop
	AddEventListener("update", () => {

		//clear screen
		Cls();

		//draw image
		StrokeColor(0, 0, 0, 0);
		TextPos(0, 10);
		TextSize(8)
		WriteLn("Mouse left button: ");
		WriteLn("is down: " + MouseIsDown(0));
		WriteLn("tap count: " + tapCtr);
		WriteLn("last button: " + MouseButton());
		WriteLn("x: " + MouseX());
		WriteLn("y: " + MouseY());
		WriteLn("drag start x: " + MouseDragStartX(0));
		WriteLn("drag start y: " + MouseDragStartY(0));
		WriteLn("dragged x: " + MouseDraggedX(0));
		WriteLn("dragged y: " + MouseDraggedY(0));
		WriteLn("is dragged: " + MouseIsDragged(0));

		//debugger purpose
		// WriteLn("");
		// WriteLn("global down " + Basik.Input.global.isDown + "/drag " + Basik.Input.global.isDrag);
	})
}

