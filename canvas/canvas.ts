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

async function canvasToTRgb(canvas: HTMLCanvasElement): Promise<TRgb[][]> {
	log("canvas to rgb", cont);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas context tidak tersedia");

	const { width, height } = canvas;
	const imageData = ctx.getImageData(0, 0, width, height);
	const data = imageData.data; // RGBA flat array

	const result: TRgb[][] = [];
	for (let y = 0; y < height; y++) {
		const row: TRgb[] = [];
		await delay();
		for (let x = 0; x < width; x++) {
			const idx = (y * width + x) * 4;
			const r = data[idx];
			const g = data[idx + 1];
			const b = data[idx + 2];
			const a = data[idx + 3] //(jika perlu)
			row.push({ r, g, b, a });
		}
		result.push(row);
	}
	return result;
}

function createCanvasDoc(img: HTMLImageElement, skala: number): HTMLCanvasElement {
	let canvasDoc = document.createElement('canvas');

	let w = img.width + (img.width % skala);
	let h = img.height + (img.height % skala);

	canvasDoc.width = w;
	canvasDoc.height = h;
	canvasDoc.getContext('2d')!.drawImage(img, 0, 0, w, h);

	return canvasDoc;
}