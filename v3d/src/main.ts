// Cube setup
const vertices: Vertex3D[] = [
	[-100, -100, -100],
	[100, -100, -100],
	[100, 100, -100],
	[-100, 100, -100],
	[-100, -100, 100],
	[100, -100, 100],
	[100, 100, 100],
	[-100, 100, 100]
];
const faces: number[][] = [
	[0, 1, 2, 3],
	[4, 5, 6, 7],
	[0, 1, 5, 4],
	[2, 3, 7, 6],
	[0, 3, 7, 4],
	[1, 2, 6, 5]
];

// Canvas + animation
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
let angle = 0;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const { projected, transformed } = projectVertices(
		vertices,
		500,              // focal length
		2000,             // camera distance / zoom / bigger = far
		[angle, angle / 2, 0], // camera rotation
		[300, 0, 0]       // camera position
	);

	// Shift to canvas center
	const shifted = projected.map(([x, y]) => [
		x + canvas.width / 2,
		y + canvas.height / 2
	] as Point2D);

	renderFaces(ctx, shifted, transformed, faces);

	angle += 0.01;
	requestAnimationFrame(draw);
}

draw();
