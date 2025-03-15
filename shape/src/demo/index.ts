function logError(msg: string) {
	throw new Error(msg);
}

window.onload = () => {
	let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
	canvas.width = 900;
	canvas.height = 600;

	let ctx: CanvasRenderingContext2D = canvas.getContext("2d") ?? (() => { throw new Error("Failed to get 2D context"); })();
	ctx.fillStyle = 'red';
	let d: shape.Drawing = new shape.Drawing(canvas);

	document.body.appendChild(canvas);

	d.addShape(
		new shape.Shape().line(200, 10).line(-100, 50).position(100, 100));
	// d.addGroup(new shape.Group());

	d.update();
	d.render(ctx);
}