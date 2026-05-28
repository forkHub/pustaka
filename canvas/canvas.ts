function drawFilledRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	r: number,
	g: number,
	b: number,
	a: number = 255
): void {
	// Convert alpha from 0–255 → 0–1
	const alpha = a / 255;

	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
	ctx.fillRect(x, y, width, height);
}

function insideCanvas(x: number, y: number, canvas: HTMLCanvasElement): boolean {
	if (x < 0) return false;
	if (y < 0) return false;
	if (x >= canvas.width) return false;
	if (y >= canvas.height) return false;
	return true;
}

function getPixelEx(x: number, y: number, canvas: HTMLCanvasElement): TPixel[] {
	let res: TPixel[] = [];

	res.push(getPixel(x, y, canvas));
	res.push(getPixel(x + 1, y, canvas));
	res.push(getPixel(x + 1, y + 1, canvas));
	res.push(getPixel(x, y + 1, canvas));

	return res;
}

function getPixelEx2(x: number, y: number, n: number, canvas: HTMLCanvasElement): TPixel[] {
	let res: TPixel[] = [];

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			res.push(getPixel(x, y, canvas));
		}
	}

	return res;
}

function getPixel(x: number, y: number, canvas: HTMLCanvasElement): TPixel {
	if (insideCanvas(x, y, canvas)) {
		let ctx = canvas.getContext('2d');
		const data: Uint8ClampedArray = ctx!.getImageData(x, y, 1, 1).data;

		const pixel: TPixel = {
			x,
			y,
			rgb: {
				r: data[0]!,
				g: data[1]!,
				b: data[2]!,
				a: data[3]!
			}
		};

		lastPixel = pixel;
	}

	// console.groupEnd();

	return lastPixel;
}