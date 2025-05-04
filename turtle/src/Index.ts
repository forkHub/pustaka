window.onload = () => {
	let canvas = document.createElement('canvas');
	canvas.width = 640;
	canvas.height = 320;
	document.body.appendChild(canvas);

	let turtle = new Turtle(canvas);
	turtle.fill("#ff0000");
	circle(100, 100);
	turtle.fill("#00ff00");
	circle(150, 100);
	turtle.fill("#0000ff");
	circle(200, 100);

	function circle(x: number, y: number) {
		turtle.penDown();
		turtle.position(x, y);
		for (let i = 0; i < 18; i++) {
			turtle.turn(20);
			turtle.line(1);
		}
		turtle.penUp();
	}
}