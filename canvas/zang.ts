// Representasi matriks citra biner
type ImageMatrix = number[][]; // 0 = putih, 1 = hitam

async function rgbToBinaryMatrix(image: TRgb[][], threshold = 128): Promise<ImageMatrix> {
	log("rgb to binary matrix", cont)
	const result: number[][] = [];

	for (const row of image) {
		const newRow: number[] = [];
		await delay();
		for (const pixel of row) {
			const lum = getLuminance(pixel);
			newRow.push(lum <= threshold ? 1 : 0);
		}
		result.push(newRow);
	}
	return result;
}

async function zhangSuenThinning(imageMatrix: ImageMatrix): Promise<ImageMatrix> {
	log("zang Suen thinning", cont);

	let changed = true;
	const rows = imageMatrix.length;
	const cols = imageMatrix[0].length;
	const maxPhase = 10;
	let crPhase = 0;

	const getNeighbors = (x: number, y: number) => {
		return [
			imageMatrix[x][y - 1] ?? 0,     // P2
			imageMatrix[x + 1][y - 1] ?? 0, // P3
			imageMatrix[x + 1][y] ?? 0,     // P4
			imageMatrix[x + 1][y + 1], // P5
			imageMatrix[x][y + 1],     // P6
			imageMatrix[x - 1][y + 1], // P7
			imageMatrix[x - 1][y],     // P8
			imageMatrix[x - 1][y - 1]  // P9
		];
	};

	const countTransitions = (neighbors: number[]) => {
		let count = 0;
		for (let i = 0; i < neighbors.length; i++) {
			const curr = neighbors[i];
			const next = neighbors[(i + 1) % neighbors.length];
			if (curr === 0 && next === 1) count++;
		}
		return count;
	};

	while (changed) {
		crPhase++;
		if (crPhase > maxPhase) break;
		log("phase " + crPhase, cont);

		changed = false;
		let toDelete: [number, number][] = [];

		// Step 1
		for (let x = 1; x < rows - 1; x++) {
			await delay();
			for (let y = 1; y < cols - 1; y++) {
				if (imageMatrix[x][y] !== 1) continue;
				const neighbors = getNeighbors(x, y);
				const B = neighbors.reduce((a, b) => a + b, 0);
				const A = countTransitions(neighbors);

				if (
					B >= 2 && B <= 6 &&
					A === 1 &&
					neighbors[0] * neighbors[2] * neighbors[4] === 0 &&
					neighbors[2] * neighbors[4] * neighbors[6] === 0
				) {
					toDelete.push([x, y]);
				}
			}
		}
		if (toDelete.length > 0) {
			changed = true;
			toDelete.forEach(([x, y]) => (imageMatrix[x][y] = 0));
		}

		toDelete = [];

		// Step 2
		for (let x = 1; x < rows - 1; x++) {
			await delay();
			for (let y = 1; y < cols - 1; y++) {
				if (imageMatrix[x][y] !== 1) continue;
				const neighbors = getNeighbors(x, y);
				const B = neighbors.reduce((a, b) => a + b, 0);
				const A = countTransitions(neighbors);

				if (
					B >= 2 && B <= 6 &&
					A === 1 &&
					neighbors[0] * neighbors[2] * neighbors[6] === 0 &&
					neighbors[0] * neighbors[4] * neighbors[6] === 0
				) {
					toDelete.push([x, y]);
				}
			}
		}

		if (toDelete.length > 0) {
			changed = true;
			toDelete.forEach(([x, y]) => (imageMatrix[x][y] = 0));
		}

		let clone = JSON.parse(JSON.stringify(imageMatrix));
		await drawFromMatrix(clone);
	}

	log("finish", cont);

	return imageMatrix;
}

async function drawFromMatrix(m: ImageMatrix) {
	log('render', cont);
	let resClr = await binaryToTRgb(m);
	let canvas = await TRgbToCanvas(resClr);
	cont.appendChild(canvas);
}

async function TRgbToCanvas(data: TRgb[][]): Promise<HTMLCanvasElement> {
	const height = data.length;
	const width = data[0].length;

	// Buat canvas baru
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas context tidak tersedia");

	const imageData = ctx.createImageData(width, height);
	const pixels = imageData.data; // RGBA flat array

	for (let y = 0; y < height; y++) {
		await delay();
		for (let x = 0; x < width; x++) {
			const idx = (y * width + x) * 4;
			const { r, g, b } = data[y][x];
			pixels[idx] = r;
			pixels[idx + 1] = g;
			pixels[idx + 2] = b;
			pixels[idx + 3] = 255; // alpha penuh (opaque)
		}
	}

	ctx.putImageData(imageData, 0, 0);

	// Kembalikan canvas
	return canvas;
}

async function binaryToTRgb(binary: number[][]): Promise<TRgb[][]> {
	const height = binary.length;
	const width = binary[0].length;
	// const a = 100;

	const result: TRgb[][] = [];
	for (let y = 0; y < height; y++) {
		const row: TRgb[] = [];
		await delay();
		for (let x = 0; x < width; x++) {
			const value = binary[y][x];
			if (value === 1) {
				// Hitam
				row.push({ r: 0, g: 0, b: 0, a: 255 });
			} else {
				// Putih
				row.push({ r: 255, g: 255, b: 255, a: 255 });
			}
		}
		result.push(row);
	}
	return result;
}



