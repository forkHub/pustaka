///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>

/**
 * Load an image from url 
 * @param url {string} the url of image to load
 * @returns {Basik.GbrObj}
 */
function muatGambar(url: string): Basik.GbrObj {
	return Ip.Muat(url);
}

function muatAnimasi(url: string, fw: number = 32, fh: number = 32) {
	return Ip.MuatAnimasi(url, fw, fh);
}

function stempel(img: Basik.GbrObj | string, x?: number, y?: number) {
	// console.log("stempel, img ", img);

	if (img === undefined) {
		img = "roket";
	}

	if (typeof img == "string") {
		let img2 = Ip.Muat(img);
		img2.temp = true;
		posisi(img2, x, y);
		Basik.scheduler.reg(img2);
		// Ip.Draw(img2);
	}
	else {
		if (x != undefined && y != undefined) {
			posisi(img, x, y);
		}
		Basik.scheduler.reg(img);
	}



	function posisi(img: Basik.GbrObj, x: number, y: number) {
		if (x != undefined) {
			img.t.x = x;
		}

		if (y != undefined) {
			img.t.y = y;
		}
	}
}

/**
 * Check if two images collide. Use box for collision detection. Also Take account the rotation
 * 
 * @param img1 {Basik.GbrObj} the first image
 * @param img2 {Basik.GbrObj} the second image
 * @returns {boolean}
 */
function gambarTabrakan(img1: Basik.GbrObj, img2: Basik.GbrObj): boolean {
	return Ip.tabrakan(img1, img1.t.x, img1.t.y, img2, img2.t.x, img2.t.y);
}

/**
 * Check if an image collides a point
 * @param img {Basik.GbrObj}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function poinDidalamGambar(img: Basik.GbrObj, x: number, y: number): boolean {
	return Ip.dotInsideImage(img, img.t.x, img.t.y, x, y);
}

/**
 * Create a blank image
 * @param width {number} width
 * @param height {number} height
 * @returns {Basik.GbrObj}
 */
function buatGambar(width: number, height: number): Basik.GbrObj {
	return Ip.CreateImage(width, height);
}

/**
 * Check if all images have been loaded
 * @returns {boolean} 
 */
function semuaGambarSelesaiDimuat(): boolean {
	return Ip.AllImageLoaded();
}

/**
 * 
 * @param img 
 */
function hapusGAmbar(img: Basik.GbrObj): void {
	Ip.free(img);
}

function posisiGambar(img: Basik.GbrObj, x = 0, y = 0) {
	img.t.x = x;
	img.t.y = y;
}

function ukuranGambar(img: Basik.GbrObj, p = 32, l = 32) {
	img.panjang = p;
	img.lebar = l;
}

function pusatGambar(img: Basik.GbrObj, x = 0, y = 0) {
	img.pusatX = x;
	img.pusatY = y;
}
